# CLI Integrations (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute incluye una familia de comandos `setup-*` que configuran una CLI de
programación (Codex, Claude Code, OpenCode, Cline, …) para usar OmniRoute como
backend, de modo que la herramienta se comunica con **un solo** endpoint y
OmniRoute dirige las solicitudes al proveedor adecuado con conmutación por error
automática. Cada comando lee el catálogo de modelos **en vivo** desde una instancia
de OmniRoute en ejecución (local o remota) y escribe el archivo de configuración
propio de la herramienta en **su** máquina. La clave de API se referencia mediante
una variable de entorno siempre que la herramienta lo permita. Los comandos que
conservan un archivo de entorno local de la herramienta se indican a continuación.

También hay un iniciador genérico —`omniroute run <target>`— que ejecuta
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` o `gemini` con las
variables de entorno adecuadas, sin escribir ninguna configuración. Los destinos
y sus alias provienen del manifiesto canónico `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), y `omniroute completion` ofrece las
mismas palabras de destino derivadas del manifiesto. Los iniciadores heredados
específicos de cada herramienta —`omniroute launch` (Claude Code) y
`omniroute launch-codex` (Codex)— siguen estando disponibles.

La incorporación de proveedores está disponible desde el mismo contexto local o
remoto. Los siguientes comandos, diseñados con prioridad para la API, mantienen
la autenticación de gestión separada de las credenciales del proveedor y nunca
muestran una credencial en la salida estructurada:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Para scripts, se recomienda usar `--credential-stdin` o `--credential-env`;
`--credential` se conserva para un uso local controlado. `providers remove`
requiere `--yes` en una terminal no interactiva, y los cinco comandos respetan
el contexto activo o las opciones globales `--base-url`/`--api-key`.

Para la configuración base manual y única de las dos integraciones más completas,
consulte las guías detalladas de cada herramienta:

- [Configuración de Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Configuración de Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Modo remoto](./REMOTE-MODE.md) — controle una instancia remota de OmniRoute (VPS / Tailnet) desde su portátil
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — la extensión OmniCopilot; también puede ejecutar estos
  comandos `setup-*` desde el editor

---

## Tabla principal

Cada comando respeta el **contexto activo** (establecido con `omniroute connect`;
consulte [Modo remoto](./REMOTE-MODE.md)) o las opciones explícitas
`--remote <url> --api-key <key>`. «Local frente a remoto» a continuación
significa lo siguiente: sin opciones, se dirige a `http://localhost:20128`; con
`--remote` (o un contexto remoto activo), obtiene el catálogo de ese servidor y
escribe la configuración localmente.

| Comando                    | Herramienta                              | Qué escribe                                                                                                                                                                                   | Opciones principales                                                                                                                       | Local o remoto |
| -------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                         | `~/.codex/<name>.config.toml` — un perfil por cada modelo de texto compatible (`codex --profile <name>`)                                                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Ambos          |
| `omniroute setup-claude`   | Claude Code                              | `~/.claude/profiles/<name>/settings.json` — un perfil por cada modelo coincidente (`CLAUDE_CONFIG_DIR`)                                                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Ambos          |
| `omniroute setup-opencode` | OpenCode (compatible con OpenAI)         | `~/.config/opencode/opencode.json` — proveedor `omniroute` con todos los modelos del catálogo (`opencode -m omniroute/<model>`)                                                               | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Ambos          |
| `omniroute setup-cline`    | Cline                                    | `~/.cline/data/{globalState,secrets}.json` (modo CLI) + muestra la configuración de la extensión de VS Code                                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Ambos          |
| `omniroute setup-kilo`     | Kilo Code                                | `~/.local/share/kilo/auth.json` (CLI) + combina `kilocode.*` en `settings.json` de VS Code si está presente                                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Ambos          |
| `omniroute setup-continue` | Continue / CLI `cn`                      | `~/.continue/config.yaml` — modelos con `provider: openai`, clave mediante `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Ambos          |
| `omniroute setup-cursor`   | Cursor                                   | Nada — muestra los pasos que deben realizarse en la aplicación (la configuración de Cursor es una base de datos SQLite opaca)                                                                 | `--remote` `--api-key` `--only` `--port`                                                                                                   | Ambos          |
| `omniroute setup-roo`      | Roo Code                                 | `~/.omniroute/roo-settings.json` (documento de importación) + establece `roo-cline.autoImportSettingsPath` si existe un `settings.json` de VS Code                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Ambos          |
| `omniroute setup-crush`    | Crush                                    | `~/.config/crush/crush.json` — proveedor `openai-compat`, clave mediante `$OMNIROUTE_API_KEY`                                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Ambos          |
| `omniroute setup-goose`    | Goose                                    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + muestra las instrucciones para configurar las variables de entorno                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ambos          |
| `omniroute setup-aider`    | Aider                                    | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + muestra las instrucciones para configurar las variables de entorno                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ambos          |
| `omniroute setup-qwen`     | Qwen Code                                | `~/.qwen/settings.json` — matriz V4 `modelProviders.openai` + `OMNIROUTE_API_KEY` en `~/.qwen/.env`                                                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Ambos          |
| `omniroute setup-5dive`    | 5dive (flota de agentes)                 | Nada en `$HOME` — escribe un **perfil de autenticación** de 5dive (`/var/lib/5dive/auth-profiles/<name>/`) mediante `5dive agent auth set`; requiere root y se ejecuta en el host de la flota | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Ambos          |
| `omniroute run <target>`   | Inicio en tiempo de ejecución (genérico) | Nada — inicia `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` con el entorno y los argumentos correctos; Qwen y Gemini usan un directorio personal temporal aislado               | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Ambos          |
| `omniroute launch`         | Claude Code                              | Nada — inicia `claude` con `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` inyectados                                                                                                             | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Ambos          |
| `omniroute launch-codex`   | OpenAI Codex CLI                         | Nada — inicia `codex` con el proveedor `omniroute` inyectado mediante opciones `-c`                                                                                                           | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Ambos          |

Notas sobre las opciones (verificadas en el código fuente del comando):

- `--remote <url>` — obtiene el catálogo de un OmniRoute remoto (anula `--port`
  y el contexto activo). `--api-key <key>` proporciona la credencial para ese
  servidor (de forma predeterminada, usa la variable de entorno `OMNIROUTE_API_KEY`
  o el token del contexto activo).
- `--only <patterns>` — subcadenas separadas por comas; conserva únicamente los ID
  de modelos que coincidan (p. ej., `--only glm,kimi`). Disponible en `setup-codex`,
  `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — muestra exactamente lo que se escribiría sin modificar el sistema
  de archivos. Disponible en todos los comandos `setup-*` **excepto**
  `setup-cursor` (que nunca escribe ningún archivo).
- `--model <id>` — obligatorio (o seleccionado de forma interactiva) para las
  herramientas que no tienen detección automática de modelos: Cline, Kilo, Roo,
  Goose, Qwen, Aider, 5dive. Esas herramientas también aceptan `--yes` para
  ejecuciones no interactivas (que, en ese caso, requieren `--model`).
  `setup-opencode` acepta `--model` para establecer el modelo predeterminado
  de nivel superior.
- `--model <id>` en `omniroute run` sigue la configuración por destino del manifiesto
  (`bin/cli/cli-manifest.mjs`): **aider** recibe `--model openai/<id>` y
  **opencode**, `--model omniroute/<id>` (el prefijo solo se añade cuando el ID
  aún no lo incluye); **qwen** y **gemini** reciben el ID literalmente;
  **claude** lo recibe mediante `ANTHROPIC_MODEL`, **goose** mediante `GOOSE_MODEL`
  y **codex** mediante argumentos `-c model_providers.omniroute.*`. **Qwen es el
  único destino de ejecución que exige `--model`**: `omniroute run qwen` sin esta
  opción termina con el código `2` y un error explícito.
- `--port <port>` — puerto local de OmniRoute (valor predeterminado: `20128`; se
  ignora cuando se establece `--remote`). Está presente en todos los comandos
  `setup-*` y en ambos lanzadores.
- Códigos de salida de `omniroute run`: el código de salida propio de la CLI
  secundaria se propaga literalmente; `2` = argumentos no válidos (destino no
  compatible, falta el argumento obligatorio `--model`, protección de contenedor);
  `127` = el binario de destino no está en `PATH`; `130`/`143`/`129` cuando la
  ejecución finaliza mediante `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = otro fallo al
  iniciar la ejecución.
- Los dos lanzadores (`launch`, `launch-codex`) aceptan `--profile <name>` para
  seleccionar un perfil escrito por `setup-claude` / `setup-codex`, además de
  argumentos transferidos al binario `claude` / `codex` subyacente.

El selector interactivo también se comparte entre las recetas de configuración:

```bash
# Selecciona una opción del catálogo activo de modelos, local o remoto, y configura el destino.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

Actualmente, `configure` delega en las recetas probadas para `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` y `5dive`.
Las entradas de catálogo exclusivas para IDE, MITM y guías siguen siendo flujos
explícitos de `setup-*`/manuales y no se presentan como destinos ejecutables.

> `setup-opencode` es la integración **ligera compatible con openai** de OpenCode.
> También existe una integración mediante plugin con más funciones:
> `omniroute setup opencode`, que instala `@omniroute/opencode-plugin`. Son
> comandos diferentes; la tabla anterior documenta `setup-opencode`.
>
> El plugin se distribuye en dos paquetes, uno para cada versión principal de
> OpenCode, porque los dos cargadores esperan puntos de entrada diferentes:
> `@omniroute/opencode-plugin` para OpenCode v1 y
> `@omniroute/opencode-plugin-v2` para OpenCode v2. El paquete v2 es nuevo
> (`0.1.0`) y sigue un contrato del host que aún está cambiando, por lo que lee
> la estructura que OpenCode incorpora al borrador del catálogo en lugar de
> presuponer una. Para instalarlo, añade una entrada `plugins` a `opencode.json`;
> `omniroute setup opencode` sigue instalando el paquete v1. Las opciones y el
> orden de búsqueda de credenciales se encuentran en el README del paquete.

---

## Uso local

Con OmniRoute ejecutándose en `localhost:20128`, simplemente ejecuta el comando de configuración para tu
herramienta. El catálogo se obtiene del servidor local.

```bash
# Codex: escribe un perfil por cada modelo coincidente en ~/.codex/
omniroute setup-codex
codex --profile glm52            # usa un perfil generado

# Claude Code: escribe perfiles por modelo y luego inicia uno
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: escribe el proveedor compatible con OpenAI con todos los modelos del catálogo
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # se referencia mediante {env:OMNIROUTE_API_KEY}, nunca se guarda en disco
opencode -m omniroute/glm/glm-5.2 "..."

# Las herramientas sin detección automática necesitan un modelo explícito:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Vista previa sin escribir nada:
omniroute setup-continue --dry-run
```

Inicia sin escribir ninguna configuración (solo mediante inyección de variables de entorno):

```bash
omniroute launch                 # Claude Code → OmniRoute local
omniroute launch-codex           # Codex CLI → OmniRoute local
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Ruta de comando explícita: pasa sin modificar todo lo que aparezca después de --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Uso remoto

Dirige cualquier comando de configuración a una instancia remota de OmniRoute con `--remote` + `--api-key`. El
catálogo se obtiene de la instancia remota; la configuración se escribe en tu máquina local.

```bash
# OpenCode contra un VPS remoto, conservando solo los modelos glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # exporta OMNIROUTE_API_KEY primero

# Perfiles de Codex a partir de un catálogo remoto
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Inicia una CLI directamente contra la instancia remota
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

En lugar de pasar `--remote`/`--api-key` cada vez, inicia sesión una sola vez y permite que el
**contexto activo** los proporcione automáticamente:

```bash
omniroute connect 192.168.0.15        # genera un token con alcance limitado y almacena el contexto
omniroute setup-codex                 # ← ahora usa el catálogo remoto
omniroute setup-opencode              # ← igual
omniroute launch                      # ← Claude Code contra la instancia remota
```

Consulta [Modo remoto](./REMOTE-MODE.md) para obtener información sobre contextos, alcances y gestión de tokens.

---

## Flotas de agentes de 5dive

[5dive](https://5dive.ai) ejecuta una flota de agentes de programación de larga duración, cada uno como una
unidad de systemd bajo su propio usuario de Unix. No es en sí una CLI de programación, por lo que no hay
nada que `omniroute run` pueda iniciar: `5dive` es un destino **solo de configuración**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Ambas formas escriben un **perfil de autenticación** de 5dive, y cada puesto de `claude` vinculado a ese
perfil se comunica entonces con OmniRoute. Hay tres aspectos específicos de este destino:

- **Se ejecuta en el host de la flota como root.** Los verbos de 5dive actúan sobre unidades locales de systemd
  y un directorio de estado propiedad de root; no existe un modo remoto. La receta vuelve a ejecutarse mediante
  `sudo` cuando aún no se está ejecutando como root (`--no-sudo` desactiva este comportamiento e imprime el
  comando en su lugar).
- **El endpoint debe usar `https://`, salvo que sea de loopback.** La clave de API del agente
  viaja en esa URL con cada solicitud, y 5dive rechaza un endpoint externo a la máquina que use texto sin cifrar.
  Una dirección de LAN privada no es una excepción.
- **La selección de modelo propia de cada puesto tiene prioridad sobre el perfil.** El perfil incluye
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, pero un puesto que siga fijado a un identificador de modelo
  estándar falla en su primer turno con _"There's an issue with the selected model"_.
  Pasa `--agent <name>` (se puede repetir) para fijar también los puestos; la receta imprime el
  comando cuando no lo haces.

La clave de API se entrega a 5dive mediante **stdin** (`--api-key=-`), por lo que nunca aparece en la
salida de `ps`.

Apuntar el perfil a un **combo** de OmniRoute, en lugar de a un único modelo, es lo que
proporciona a la flota la conmutación por error entre proveedores: cuando el endpoint principal dejó de responder por completo a mitad de un turno
en la ejecución registrada en
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), el agente completó
los pasos restantes con el fallback y nunca expuso la interrupción.

---

## Convenciones de URL base (qué herramientas requieren `/v1`)

OmniRoute expone la interfaz de OpenAI en `/v1`, la interfaz de Anthropic en la raíz
y una interfaz nativa de Gemini en `/v1beta`. Cada integración está configurada con el formato que
espera su herramienta (verificado en el código fuente del comando):

| Integración                                                                | URL base escrita | ¿`/v1`?                                   |
| -------------------------------------------------------------------------- | ---------------- | ----------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | raíz             | No — Cline añade `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | raíz             | No — Goose añade la ruta                  |
| `setup-aider` (`OPENAI_API_BASE`)                                          | raíz             | No — LiteLLM añade `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | con `/v1`        | Sí                                        |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | raíz             | No — Claude Code añade `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | con `/v1`        | Sí                                        |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | con `/v1`        | Sí                                        |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | raíz             | No — el SDK añade `/v1beta/models/…`      |
| `setup-5dive` (`ANTHROPIC_BASE_URL` en el perfil de autenticación)         | raíz             | No — Claude Code añade `/v1/messages`     |

---

## Conservación de las dependencias nativas al actualizar: `--include=optional`

Cuando actualizas con `omniroute update` (después de confirmar o con `--apply`),
OmniRoute ejecuta la instalación con `--include=optional` incorporado:

```bash
npm install -g omniroute@latest --include=optional
```

Esta **no** es una opción que se pase a `omniroute update`; el actualizador siempre
la aplica. Garantiza que las `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client` y la pila SLM de LLMLingua) se conserven tras la actualización, incluso si la
configuración de npm tiene establecido `omit=optional`, lo cual, de otro modo, eliminaría
silenciosamente el controlador nativo de SQLite y la vinculación con el llavero del sistema operativo.
Para previsualizar el comando exacto sin aplicarlo:

```bash
omniroute update --dry-run
# [SIMULACIÓN] Se ejecutaría: npm install -g omniroute@latest --include=optional
```

Otras opciones de `omniroute update` (verificadas en el código fuente): `--check` (sale con código 1 si
está desactualizado), `--apply` (instala sin solicitar confirmación), `--changelog`, `--no-backup`,
`--yes`.

---

## CLI de Google Gemini mediante `omniroute run gemini`

Contrato verificado con `@google/gemini-cli` 0.50.0: la CLI respeta
`GOOGLE_GEMINI_BASE_URL` y envía `POST /v1beta/models/<model>:generateContent`
(y `:streamGenerateContent?alt=sse`) a esa URL, exactamente la interfaz nativa
de Gemini de OmniRoute (`/v1beta`). `omniroute run gemini` lo configura automáticamente:

- `GOOGLE_GEMINI_BASE_URL` → la URL base activa de OmniRoute (raíz, sin `/v1`);
- `GEMINI_API_KEY` → la credencial de OmniRoute resuelta (opción/entorno/contexto);
- un **`GEMINI_CLI_HOME` temporal y aislado**, cuyo `.gemini/settings.json`
  selecciona la autenticación `gemini-api-key`, para que una sesión OAuth de Google almacenada (Code Assist)
  nunca reemplace el inicio dirigido a OmniRoute; se elimina después de salir;
- **higiene del entorno**: se eliminan del entorno del proceso hijo `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` y `GOOGLE_GENAI_USE_GCA` (que redirigirían
  la autenticación a Vertex/Code Assist), y se establece
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` como medida de respaldo adicional; los demás
  destinos de `run` reciben el mismo tratamiento para sus propias variables conflictivas;
- inyección de `--model <id>` desde `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

La protección de confianza del espacio de trabajo de Gemini sigue aplicándose en modo sin interfaz:
pasa tú mismo `--skip-trust` (o marca el directorio como confiable de forma interactiva); el lanzador
deliberadamente no la omite. Este lanzador es distinto del **registro ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), que continúa siendo la integración
del protocolo de agentes para `/dashboard/acp-agents`.

---

## Barrido real de smoke tests (opcional)

Las ejecuciones deterministas de regresión del plan de lanzamiento se realizan en CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Para validar los binarios REALES contra un servidor
OmniRoute REAL, existe un entorno de pruebas opcional en
`tests/integration/upstream-cli-smoke.int.test.ts`. Nunca se ejecuta automáticamente
(cada subprueba se omite salvo que `RUN_CLI_SMOKE=1`), pasa la credencial mediante el NOMBRE
de una variable de entorno (nunca mediante su valor), censura las cadenas con formato de clave
en cualquier salida registrada, omite los objetivos cuyo binario no está instalado y clasifica
los fallos como autenticación / upstream / configuración en lugar de usar un simple booleano:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opcional: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` limita el barrido;
`OMNIROUTE_SMOKE_TIMEOUT_MS` sustituye el tiempo de espera de 120 s por objetivo.

---

## Véase también

- [Configuración de Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — la guía detallada de Claude Code
- [Configuración de Codex CLI](./CODEX-CLI-CONFIGURATION.md) — la configuración base inicial de `[model_providers.omniroute]`
- [Modo remoto](./REMOTE-MODE.md) — contextos, tokens de acceso con ámbito y control de un servidor remoto
- [Referencia de herramientas de CLI](../reference/CLI-TOOLS.md) — el catálogo completo de herramientas compatibles y páginas del panel
- [Guía de configuración](./SETUP_GUIDE.md) — métodos de instalación e incorporación en la primera ejecución
