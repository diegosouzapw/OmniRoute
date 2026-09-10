# CLI-INTEGRATIONS (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "Integraciones CLI — dirija cualquier CLI de codificación a OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Integraciones CLI

OmniRoute incluye una familia de comandos `setup-*` que configuran un CLI de codificación (Codex, Claude Code, OpenCode, Cline, …) para usar OmniRoute como su backend — así que la herramienta se comunica con **un** endpoint y OmniRoute dirige a el proveedor correcto con retroceso automático. Cada comando lee el catálogo de modelos **en vivo** de un OmniRoute en ejecución (local o remoto) y escribe el archivo de configuración de la herramienta en **tu** máquina. La clave API se referencia mediante una variable de entorno donde la herramienta lo soporte. Los comandos que persisten un archivo de entorno local de la herramienta se anotan a continuación.

También hay un lanzador genérico — `omniroute run <target>` — que inicia `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` o `gemini` con el entorno correcto inyectado, sin escribir ninguna configuración en absoluto. Los objetivos y sus alias provienen del manifiesto canónico `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), y `omniroute completion` ofrece las mismas palabras de objetivo derivadas del manifiesto. Los lanzadores por herramienta heredados — `omniroute launch` (Claude Code) y `omniroute launch-codex` (Codex) — siguen disponibles.

La incorporación de proveedores está disponible desde el mismo contexto local/remoto. Los comandos API-first a continuación mantienen la autenticación de gestión separada de las credenciales del proveedor y nunca imprimen una credencial en la salida estructurada:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Para scripts, se prefiere `--credential-stdin` o `--credential-env`; `--credential` se conserva para uso local controlado. `providers remove` requiere `--yes` en un terminal no interactivo, y los cinco comandos honran el contexto activo o las opciones globales `--base-url`/`--api-key`.

Para la configuración base escrita a mano de una sola vez de las dos integraciones más ricas, consulte las profundizaciones por herramienta:

- [Configuración de Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Configuración de Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Modo Remoto](./REMOTE-MODE.md) — controla un OmniRoute remoto (VPS / Tailnet) desde tu laptop
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — la extensión OmniCopilot; también puede ejecutar estos
  comandos `setup-*` por ti desde dentro del editor

---

## Tabla maestra

Cada comando honra el **contexto activo** (establecido con `omniroute connect`, vea
[Modo Remoto](./REMOTE-MODE.md)) o las banderas explícitas `--remote <url> --api-key <key>`. "Local vs remoto" a continuación significa: sin banderas se dirige a `http://localhost:20128`; con `--remote` (o un contexto remoto activo) se obtiene el catálogo de ese servidor y se escribe la configuración localmente.

| Comando                    | Herramienta                                   | Lo que escribe                                                                                                                                                    | Banderas clave                                                                                                                             | Local vs remoto |
| -------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                              | `~/.codex/<name>.config.toml` — un perfil por modelo de texto compatible (`codex --profile <name>`)                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Ambos           |
| `omniroute setup-claude`   | Claude Code                                   | `~/.claude/profiles/<name>/settings.json` — un perfil por modelo coincidente (`CLAUDE_CONFIG_DIR`)                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Ambos           |
| `omniroute setup-opencode` | OpenCode (compatible con openai)              | `~/.config/opencode/opencode.json` — proveedor `omniroute` con cada modelo del catálogo (`opencode -m omniroute/<model>`)                                         | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Ambos           |
| `omniroute setup-cline`    | Cline                                         | `~/.cline/data/{globalState,secrets}.json` (modo CLI) + imprime la configuración de la extensión de VS Code                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Ambos           |
| `omniroute setup-kilo`     | Kilo Code                                     | `~/.local/share/kilo/auth.json` (CLI) + fusiona `kilocode.*` en `settings.json` de VS Code si está presente                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Ambos           |
| `omniroute setup-continue` | Continue / `cn` CLI                           | `~/.continue/config.yaml` — modelos `provider: openai`, clave a través de `${{ secrets.OMNIROUTE_API_KEY }}`                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Ambos           |
| `omniroute setup-cursor`   | Cursor                                        | Nada — imprime los pasos en la aplicación (la configuración de Cursor es opaca SQLite)                                                                            | `--remote` `--api-key` `--only` `--port`                                                                                                   | Ambos           |
| `omniroute setup-roo`      | Roo Code                                      | `~/.omniroute/roo-settings.json` (documento de importación) + establece `roo-cline.autoImportSettingsPath` si existe un `settings.json` de VS Code                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Ambos           |
| `omniroute setup-crush`    | Crush                                         | `~/.config/crush/crush.json` — proveedor `compatible con openai`, clave a través de `$OMNIROUTE_API_KEY`                                                          | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Ambos           |
| `omniroute setup-goose`    | Goose                                         | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + imprime receta de entorno                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ambos           |
| `omniroute setup-aider`    | Aider                                         | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + imprime receta de entorno                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ambos           |
| `omniroute setup-qwen`     | Qwen Code                                     | `~/.qwen/settings.json` — matriz `modelProviders.openai` V4 + `OMNIROUTE_API_KEY` en `~/.qwen/.env`                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Ambos           |
| `omniroute run <target>`   | Lanzamiento en tiempo de ejecución (genérico) | Nada — inicia `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` con el entorno y argumentos correctos; Qwen y Gemini utilizan un hogar aislado temporal | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Ambos           |
| `omniroute launch`         | Claude Code                                   | Nada — inicia `claude` con `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` inyectados                                                                                 | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Ambos           |
| `omniroute launch-codex`   | OpenAI Codex CLI                              | Nada — inicia `codex` con el proveedor `omniroute` inyectado a través de banderas `-c`                                                                            | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Ambos           |

Notas sobre las banderas (verificadas en la fuente del comando):

- `--remote <url>` — obtiene el catálogo de un OmniRoute remoto (anula `--port`
  y el contexto activo). `--api-key <key>` proporciona la credencial para ese
  servidor (por defecto a la variable de entorno `OMNIROUTE_API_KEY`, o el token del contexto activo).
- `--only <patterns>` — subcadenas separadas por comas; mantiene solo los IDs de modelo que coinciden
  (por ejemplo, `--only glm,kimi`). Disponible en `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — imprime exactamente lo que se escribiría sin tocar el
  sistema de archivos. Disponible en cada comando `setup-*` **excepto** `setup-cursor`
  (que nunca escribe un archivo).
- `--model <id>` — requerido (o seleccionado interactivamente) para las herramientas que no tienen
  auto-descubrimiento de modelos: Cline, Kilo, Roo, Goose, Qwen, Aider. Esas herramientas
  también aceptan `--yes` para ejecuciones no interactivas (que luego requieren `--model`).
  `setup-opencode` toma `--model` para establecer el modelo predeterminado de nivel superior.
- `--model <id>` en `omniroute run` sigue el cableado por objetivo del manifiesto
  (`bin/cli/cli-manifest.mjs`): **aider** recibe `--model openai/<id>` y
  **opencode** `--model omniroute/<id>` (el prefijo se agrega solo cuando el id
  no lo lleva ya); **qwen** y **gemini** reciben el id tal cual;
  **claude** lo obtiene a través de `ANTHROPIC_MODEL`, **goose** a través de `GOOSE_MODEL`, y
  **codex** a través de argumentos `-c model_providers.omniroute.*`. **Qwen es el único objetivo de ejecución
  que requiere obligatoriamente `--model`** — `omniroute run qwen` sin él sale
  `2` con un error explícito.
- `--port <port>` — puerto local de OmniRoute (por defecto `20128`, ignorado cuando se establece `--remote`).
  Presente en todos los `setup-*` y ambos lanzadores.
- Códigos de salida de `omniroute run`: el propio código de salida del CLI hijo se propaga
  tal cual; `2` = argumentos inválidos (objetivo no soportado, falta `--model` requerido, guardia de contenedor); `127` = el binario objetivo no está en `PATH`;
  `130`/`143`/`129` cuando el lanzamiento se termina por `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = otro fallo de lanzamiento en tiempo de ejecución.
- Los dos lanzadores (`launch`, `launch-codex`) aceptan `--profile <name>` para seleccionar
  un perfil escrito por `setup-claude` / `setup-codex`, además de argumentos de paso para
  el binario subyacente `claude` / `codex`.

El selector interactivo también se comparte por las recetas de configuración:

```bash
# Selecciona del catálogo de modelos local o remoto activo y configura el objetivo.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` actualmente delega en las recetas probadas para `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, y `kilo`. Las entradas de catálogo solo para IDE,
MITM, y solo guía permanecen como flujos explícitos `setup-*`/manuales y no se presentan como objetivos lanzables.

> `setup-opencode` es la integración de OpenCode **compatible con openai** y ligera.
> También hay una integración de plugin más rica — `omniroute setup opencode` — que
> instala `@omniroute/opencode-plugin`. Son comandos diferentes; la tabla
> anterior documenta `setup-opencode`.

---

## Uso local

Con OmniRoute ejecutándose en `localhost:20128`, solo ejecuta el comando de configuración para tu herramienta. El catálogo se obtiene del servidor local.

```bash
# Codex: escribe un perfil por modelo coincidente en ~/.codex/
omniroute setup-codex
codex --profile glm52            # usa un perfil generado

# Claude Code: escribe perfiles por modelo, luego lanza uno
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: escribe el proveedor compatible con openai con todos los modelos del catálogo
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # referenciado a través de {env:OMNIROUTE_API_KEY}, nunca en disco
opencode -m omniroute/glm/glm-5.2 "..."

# Herramientas sin auto-descubrimiento necesitan un modelo explícito:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Vista previa sin escribir nada:
omniroute setup-continue --dry-run
```

Lanza sin escribir ninguna configuración en absoluto (solo inyección de env):

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

# Ruta de comando explícita: pasa todo lo que venga después de --
omniroute run claude -- --print-system-prompt "revisa esta diferencia"
```

---

## Uso remoto

Apunta cualquier comando de configuración a un OmniRoute remoto con `--remote` + `--api-key`. El catálogo se obtiene del remoto; la configuración se escribe en tu máquina local.

```bash
# OpenCode contra un VPS remoto, mantener solo modelos glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # exporta OMNIROUTE_API_KEY primero

# Perfiles de Codex desde un catálogo remoto
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Lanza un CLI directamente contra el remoto
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

En lugar de pasar `--remote`/`--api-key` cada vez, inicia sesión una vez y deja que el **contexto activo** los proporcione automáticamente:

```bash
omniroute connect 192.168.0.15        # genera un token con alcance, almacena el contexto
omniroute setup-codex                 # ← ahora usa el catálogo remoto
omniroute setup-opencode              # ← lo mismo
omniroute launch                      # ← Claude Code contra el remoto
```

Consulta [Modo Remoto](./REMOTE-MODE.md) para contextos, alcances y gestión de tokens.

---

## Convenciones de URL base (que las herramientas quieren `/v1`)

OmniRoute expone la superficie de OpenAI en `/v1`, la superficie de Anthropic en la raíz, y una superficie nativa de Gemini en `/v1beta`. Cada integración está conectada a la forma que su herramienta espera (verificado en la fuente del comando):

| Integración                                                                | URL base escrita | `/v1`?                                    |
| -------------------------------------------------------------------------- | ---------------- | ----------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | raíz             | No — Cline añade `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | raíz             | No — Goose añade la ruta                  |
| `setup-aider` (`OPENAI_API_BASE`)                                          | raíz             | No — LiteLLM añade `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | con `/v1`        | Sí                                        |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | raíz             | No — Claude Code añade `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | con `/v1`        | Sí                                        |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | con `/v1`        | Sí                                        |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | raíz             | No — el SDK añade `/v1beta/models/…`      |

---

## Manteniendo las dependencias nativas en la actualización: `--include=optional`

Cuando actualizas con `omniroute update` (después de confirmar, o con `--apply`),
OmniRoute ejecuta la instalación con `--include=optional` incorporado:

```bash
npm install -g omniroute@latest --include=optional
```

Este **no** es un flag que pasas a `omniroute update` — siempre se aplica por el
actualizador. Garantiza que las `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, la pila LLMLingua SLM) sobrevivan a la actualización incluso si tu configuración de npm
tiene `omit=optional` establecido, lo que de otro modo eliminaría silenciosamente el controlador nativo de SQLite
y el enlace del keyring del sistema operativo. Para previsualizar el comando exacto sin aplicar:

```bash
omniroute update --dry-run
# [DRY RUN] Ejecutaría: npm install -g omniroute@latest --include=optional
```

Otros flags de `omniroute update` (verificados en el código fuente): `--check` (salir 1 si
desactualizado), `--apply` (instalar sin preguntar), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI a través de `omniroute run gemini`

Contrato verificado contra `@google/gemini-cli` 0.50.0: la CLI respeta
`GOOGLE_GEMINI_BASE_URL` y emite `POST /v1beta/models/<model>:generateContent`
(y `:streamGenerateContent?alt=sse`) contra él — exactamente la superficie nativa de
Gemini de OmniRoute (`/v1beta`). `omniroute run gemini` lo conecta automáticamente:

- `GOOGLE_GEMINI_BASE_URL` → la URL base activa de OmniRoute (raíz, sin `/v1`);
- `GEMINI_API_KEY` → la credencial resuelta de OmniRoute (opción/env/contexto);
- un **`GEMINI_CLI_HOME` temporal aislado** cuyo `.gemini/settings.json`
  selecciona la autenticación `gemini-api-key`, por lo que una sesión de Google OAuth almacenada (Code Assist)
  nunca anula el lanzamiento dirigido por OmniRoute — eliminado después de salir;
- **higiene del entorno**: el entorno hijo se limpia de `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` y `GOOGLE_GENAI_USE_GCA` (que redirigirían
  la autenticación a Vertex/Code Assist), y se establece `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` como
  un respaldo adicional — los otros objetivos de `run` reciben el mismo
  tratamiento para sus propias variables en conflicto;
- inyección de `--model <id>` desde `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

La guardia de confianza del espacio de trabajo de Gemini aún se aplica en modo sin cabeza — pasa
`--skip-trust` (o confía en el directorio de forma interactiva) tú mismo; el lanzador
deliberadamente no lo omite. Este lanzador es distinto de la **registración ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), que sigue siendo la
integración del protocolo de agente para `/dashboard/acp-agents`.

---

## Barrido de humo real (opcional)

Las ejecuciones de regresión del plan de lanzamiento determinista se realizan en CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Para validar los binarios REALES contra un servidor REAL
de OmniRoute, existe un arnés opcional en
`tests/integration/upstream-cli-smoke.int.test.ts`. Nunca se ejecuta automáticamente
(cada sub-prueba se salta a menos que `RUN_CLI_SMOKE=1`), pasa la credencial por la variable de entorno
NOMBRE (nunca por valor), redacta cadenas con forma de clave de cualquier salida registrada, salta
objetivos cuyo binario no está instalado, y clasifica fallos como
autenticación / upstream / configuración en lugar de un booleano simple:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opcional: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` restringe el barrido;
`OMNIROUTE_SMOKE_TIMEOUT_MS` anula el tiempo de espera de 120s por objetivo.

---

## Ver también

- [Configuración de Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — la guía más profunda de Claude Code
- [Configuración de Codex CLI](./CODEX-CLI-CONFIGURATION.md) — la configuración base de una sola vez `[model_providers.omniroute]`
- [Modo Remoto](./REMOTE-MODE.md) — contextos, tokens de acceso con alcance, controlando un servidor remoto
- [Referencia de Herramientas CLI](../reference/CLI-TOOLS.md) — el catálogo completo de herramientas soportadas + páginas del panel de control
- [Guía de Configuración](./SETUP_GUIDE.md) — métodos de instalación y orientación en el primer uso
