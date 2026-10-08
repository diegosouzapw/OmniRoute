# Remote Mode (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Ejecuta la CLI `omniroute` en tu portátil mientras OmniRoute se ejecuta en otro lugar
(un VPS, un servidor doméstico u otro equipo de tu Tailnet). Inicia sesión una vez con
`omniroute connect` y, a partir de ese momento, **todos** los comandos de la CLI se dirigirán a ese servidor
remoto: los mismos comandos y la misma salida, pero ejecutados contra el servidor remoto.

No hay que instalar una segunda herramienta: el modo remoto utiliza la CLI habitual de `omniroute`
junto con **tokens de acceso** con alcance limitado.

```bash
npm install -g omniroute                 # la CLI habitual
omniroute connect 192.168.0.15           # inicia sesión (contraseña → token con alcance)
omniroute models list                    # ← ahora enumera los modelos del servidor REMOTO
omniroute configure codex                # ← crea un perfil local de Codex a partir del catálogo remoto
```

---

## Cómo funciona

```
tu portátil                              OmniRoute remoto (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ CLI de omniroute   │  POST /api/cli/connect  (contraseña → token)       │
│  contexto: vps     │ ───────────────►  │ emite un token de acceso con   │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ alcance; cada ruta de gestión  │
│ escribe configs.   │ ◄───────────────  │ se comprueba según su alcance │
│ LOCALMENTE         │                   └───────────────────────────────┘
└────────────────────┘
```

- Los **contextos** almacenan un servidor cada uno (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` cambia el servidor activo; `default` es local.
- Los **tokens de acceso** (`oma_live_…`) autorizan los comandos de gestión. Son
  distintos de las claves de API de inferencia (`sk-…`, utilizadas para `/v1/chat/completions`).
- En el servidor solo se almacena el hash SHA-256 de un token. El texto sin cifrar se muestra
  **una sola vez**, al crearlo.

---

## Conexión

### Con la contraseña de gestión (configuración inicial)

```bash
omniroute connect 192.168.0.15
# Contraseña de gestión para http://192.168.0.15:20128: ********
# ✔ Conectado a http://192.168.0.15:20128 — contexto '192.168.0.15' (alcance: admin)
```

El flujo con contraseña emite de forma predeterminada un token **admin** (si tienes la contraseña,
ya dispones de control total). Reduce el alcance con `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Opciones: `--port <p>` (cuando el host no incluye uno), `--name <ctx>` (nombre del contexto),
`--scope read|write|admin`. Una URL completa se respeta tal cual:
`omniroute connect https://omni.example.com`.

### Con un token generado previamente

Genera un token con alcance limitado en el panel de control (o con `omniroute tokens create`) y
pégalo; no se necesita contraseña:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

La CLI lo valida mediante `GET /api/cli/whoami` y lo guarda como contexto activo.

---

## Alcances

Hay tres niveles jerárquicos (`admin ⊃ write ⊃ read`):

| Alcance | Permite hacer                                                                                   |
| ------- | ----------------------------------------------------------------------------------------------- |
| `read`  | enumerar/inspeccionar — `models list`, `providers status`, `logs`, `usage`, `cost`              |
| `write` | lectura **+** configurar/aplicar — `setup-codex`, `keys add`, `config set`, combinaciones       |
| `admin` | escritura **+** administrar — CRUD de `tokens`, añadir proveedores, servicios, políticas, oauth |

El servidor deduce el alcance requerido por cada ruta a partir del método HTTP
(`GET`→lectura, mutaciones→escritura), además de una lista de permitidos para administradores en el caso de
superficies sensibles (`/api/cli/tokens`, mutaciones de `/api/providers`, `/api/oauth`, `/api/services`, …).
Un token con alcance insuficiente recibe un error `403` con un mensaje claro.

> Las rutas que generan procesos (`/api/services/*`, `/api/mcp/*`, …) siguen siendo
> **exclusivas de loopback**: un token remoto nunca puede acceder a ellas, independientemente de su alcance.

---

## Conectar Antigravity en una instalación remota

Antigravity utiliza la pantalla de consentimiento firstparty/nativeapp de Google. Google solo
proporciona el código de autorización cuando la **redirección de loopback**
(`http://127.0.0.1:<port>/callback`) es **accesible desde el navegador que
aprueba el inicio de sesión**. En una instalación en un VPS remoto, ese loopback reside en el
servidor, no en su equipo, por lo que la pantalla de consentimiento **se queda bloqueada indefinidamente y nunca
emite un código**; la alternativa habitual de «pegar la URL de callback» no tiene nada que
pegar. (Esta es una restricción de Google: el mismo bloqueo ocurre en cualquier proxy
que utilice el cliente de escritorio Antigravity incluido, no solo en OmniRoute).

El panel detecta esto antes de que se quede bloqueado: al abrir **Proveedores → Antigravity →
Conectar** desde una dirección distinta de localhost, sustituye el aviso genérico de «copiar la URL de callback»
por las dos soluciones siguientes, cada una con su host y puerto ya rellenados.
(Una dirección LAN también cuenta: `192.168.x.x` no es localhost en lo que respecta a
este callback).

Hay dos formas compatibles de conectar Antigravity a una instancia remota de OmniRoute.

### Opción A — asistente de inicio de sesión local (recomendada)

Ejecute OAuth en **su propio equipo**, donde `127.0.0.1` sea accesible. El asistente
se comunica directamente con Google, por lo que el consentimiento se completa donde la versión
del panel no puede hacerlo.

**Si ya está conectado** (`omniroute connect <host>`), no hay nada que
copiar: el asistente entrega la credencial a esa instalación por usted:

```bash
# En su máquina LOCAL (requiere Node.js y un navegador):
omniroute connect 192.168.0.15        # una vez: genera un token de contexto con ámbito de administrador
npx omniroute login antigravity
#   ↳ abre el consentimiento de Google, captura el callback en un puerto de loopback local,
#     lo intercambia y envía mediante POST la credencial al contexto activo:
#
#   Antigravity conectado en http://192.168.0.15:20128 (conexión abc123).
#   No hay nada que pegar; puede cerrar esta terminal.
```

El envío se realiza automáticamente siempre que el contexto activo apunte a otra
máquina. Fuércelo en cualquier sentido con `--push` / `--no-push`, o seleccione un
contexto específico con `--context <name>`.

**Si su equipo no puede acceder al VPS** (por un cortafuegos, sin SSH o desde un equipo aislado), el
asistente seguirá funcionando: solo _necesita_ comunicarse con Google. Use `--no-push` o simplemente deje que
falle el envío: en ese caso, imprimirá el blob en lugar de descartar una
autorización que ya ha completado.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

A continuación, en el panel **remoto**: **Proveedores → Antigravity → Conectar**, pegue
el blob `omniroute-cred-v1.…` en el campo del **Paso 2** (acepta tanto una
URL de callback como un blob de credenciales). OmniRoute lo decodifica, ejecuta la incorporación de Cloud Code
en el servidor y conserva la conexión.

> El blob contiene un token de actualización; trátelo como una contraseña. Mediante el envío directo,
> se transmite una sola vez a través de la conexión autenticada de su contexto; mediante el pegado,
> se transmite a través de la conexión de su panel. En ambos casos, se almacena cifrado en reposo, y un
> envío correcto nunca lo imprime en su terminal.

Opciones: `--no-browser` (imprime la URL en lugar de abrirla automáticamente), `--port <n>`
(fija el puerto de loopback), `--timeout <ms>`, `--push` / `--no-push` (anula la
entrega automática), `--context <name>` (selecciona un contexto específico).

### Opción B — túnel de reenvío local SSH

Si tiene acceso SSH al VPS, reenvíe el puerto del panel para que el
callback de loopback se resuelva de vuelta al servidor a través del túnel:

```bash
# En su máquina LOCAL:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# después, abra http://localhost:20128 en su navegador LOCAL y conecte Antigravity
# de la forma habitual; la redirección a 127.0.0.1:20128/callback ahora llega al VPS mediante SSH.
```

Como accede al panel a través de `localhost:20128`, el consentimiento de Google
se completa y el callback se entrega al servidor mediante el mismo túnel,
sin necesidad de un blob. Mantenga el túnel abierto hasta que la conexión aparezca como activa.

A diferencia de los proveedores con loopback fijo que se indican a continuación, **un solo reenvío es suficiente**
en este caso: el callback de Antigravity utiliza el propio puerto del panel, por lo que no hay un segundo
puerto específico del proveedor que deba incluirse en el túnel.

> Una alternativa completamente headless (sin asistente ni túnel) consiste en configurar sus **propias**
> credenciales web de Google OAuth y una URL base pública; consulte las variables de entorno
> OAuth del proveedor. Las dos opciones anteriores no requieren ninguna configuración adicional de Google.

---

## Conectar Codex / Grok en una instalación remota (proveedores con loopback fijo)

Codex, xAI (`xai-oauth`) y Grok CLI (`grok-cli`) registran un `redirect_uri` de
loopback **fijo** con su aplicación OAuth de origen. OmniRoute no puede cambiarlo:
el proveedor siempre devuelve el navegador a la misma dirección codificada:

| Proveedor   | Callback fijo al que redirige el proveedor |
| ----------- | ------------------------------------------ |
| `codex`     | `http://localhost:1455/auth/callback`      |
| `xai-oauth` | `http://127.0.0.1:56121/callback`          |
| `grok-cli`  | `http://127.0.0.1:56122/callback`          |

En este caso, `localhost` significa **la máquina que ejecuta el navegador**, mientras
que el servidor de callback PKCE de OmniRoute escucha en el loopback **del servidor**.
Si abre el panel en una dirección LAN como `http://192.168.0.15:20128`, ambos nunca
se encuentran: el código de autorización se entrega al `localhost:1455` de su propio
portátil, donde nada está escuchando, y el proveedor no puede completar el inicio de
sesión sin mostrar ningún error.

El panel detecta esta situación antes de abrir la ventana emergente y muestra el
comando del túnel en lugar de permitir que el inicio de sesión falle silenciosamente
(#8046).

### Solución: redirija **ambos** puertos

```bash
# En la máquina que ejecuta el NAVEGADOR:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# después, vaya a http://localhost:20128 y conecte Codex desde allí
```

Se requieren dos redirecciones; redirigir solo un puerto seguirá fallando:

- **`20128`** (el puerto del panel) hace que el origen sea un localhost real, que es
  lo que permite que OmniRoute inicie el servidor de callback PKCE; un origen LAN
  nunca llega a esa rama.
- **`1455`** (el puerto de callback fijo del proveedor) es adonde se devuelve el
  navegador; debe atravesar el túnel hasta el loopback del servidor.

Sustituya `1455` por `56121`/`56122` al conectar xAI o Grok CLI, y `20128` por
el puerto real de su panel. Mantenga abierto el túnel hasta que la conexión aparezca
como activa.

> **¿No tiene acceso SSH?** Codex y Grok CLI también aceptan un token pegado mediante
> la pestaña **Pegar clave de API** / **Importar auth.json** del cuadro de diálogo de
> conexión. Esa vía no tiene ningún callback de loopback, por lo que funciona desde
> cualquier origen. Codex también acepta un token de acceso simple o un blob de sesión
> `~/.codex/auth.json`.

---

## Gestionar tokens

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ muestra el secreto UNA SOLA VEZ; cópielo ahora
omniroute tokens list                 # enmascarado: id, nombre, ámbito, prefijo, estado, caducidad
omniroute tokens revoke <id|prefix>   # revocar inmediatamente
omniroute tokens scopes               # explicar los tres ámbitos
```

Los comandos `tokens` requieren una credencial de **administrador**. También puede
gestionar los tokens en el panel, en **Configuración → Tokens de acceso** (crear,
revocar, copiar una sola vez).

---

## Configurar una CLI de programación desde el catálogo remoto

`omniroute configure` lee el catálogo de modelos en vivo del **servidor activo** y
escribe una configuración en **su** máquina.

```bash
omniroute configure codex
#   Proveedores: glm, kmc, ollamacloud, opencode-go, …
#   Proveedor: glm
#   ID del modelo: glm/glm-5.2
#   ✔ Se escribió ~/.codex/glm52.config.toml
#   Úselo así:  codex --profile glm52

# no interactivo
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# mantener un modelo usado frecuentemente al principio del selector interactivo
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

El selector conserva únicamente los ID de los modelos (nunca las URL ni las
credenciales) en el archivo local `model-preferences.json`, organizados por contexto
y destino de la CLI. Los favoritos se muestran antes que las selecciones recientes;
use `--unfavorite` para eliminar un modelo seleccionado de la lista de ese
contexto/destino.

El perfil escrito hace referencia a la clave de inferencia mediante una variable de
entorno (`OMNIROUTE_API_KEY`); el secreto nunca se escribe en el disco. Para realizar
la configuración base única de Codex (el bloque `[model_providers.omniroute]`),
consulte [CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Iniciar una CLI contra el servidor remoto (sin escribir ninguna configuración)

`omniroute run <target>` también respeta el contexto activo: la URL base remota y la
credencial del contexto se inyectan únicamente en el proceso iniciado.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → remoto
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Previsualizar exactamente qué se iniciaría (solo NOMBRES de CLAVES de entorno, nunca valores):
omniroute run codex --dry-run --json
```

Destinos: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(fuente única: `bin/cli/cli-manifest.mjs`). Qwen y Gemini se ejecutan con un
directorio personal temporal y aislado que se elimina al salir, por lo que el inicio
nunca modifica —ni filtra datos a— la configuración personal de sus herramientas.

### Comandos de configuración específicos de cada CLI

Cada CLI compatible cuenta con un comando de configuración que tiene en cuenta el
servidor remoto (todos respetan el contexto activo o
`--remote <url> --api-key <key>`):

| CLI         | Comando                    | Qué escribe                                                                                                                                                                                                            |
| ----------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | Perfiles `~/.codex/<name>.config.toml` (por modelo)                                                                                                                                                                    |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (por modelo)                                                                                                                                                                 |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — el proveedor `omniroute` compatible con OpenAI con todos los modelos del catálogo (ejecuta `opencode -m omniroute/<model>`)                                                       |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (modo CLI) + muestra la configuración de la extensión de VS Code que se debe pegar (compatible con OpenAI, URL base **sin** `/v1`)                                          |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + configuración `kilocode.*` de VS Code — compatible con OpenAI, URL base **con** `/v1`                                                                                          |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + CLI `cn`) — `provider: openai`, `apiBase` **con** `/v1`, clave mediante `${{ secrets.OMNIROUTE_API_KEY }}`                                                              |
| Cursor      | `omniroute setup-cursor`   | muestra los pasos en la aplicación (Configuración → Modelos → Sobrescribir la URL base de OpenAI **con** `/v1` + clave + modelo). La configuración de Cursor es una base de datos SQLite opaca — solo el panel de chat |
| Roo Code    | `omniroute setup-roo`      | escribe un JSON de importación de Roo (`~/.omniroute/roo-settings.json`) + establece `roo-cline.autoImportSettingsPath` + muestra los pasos en la interfaz (compatible con OpenAI, URL base **con** `/v1`)             |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — proveedor `openai-compat`, `base_url` **con** `/v1`, clave mediante `$OMNIROUTE_API_KEY`                                                                                                |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **sin** `/v1` + `GOOSE_MODEL`) + instrucciones para las variables de entorno                                                                    |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **sin** `/v1` + `model: openai/<id>`) + instrucciones para las variables de entorno (`aider --message --yes`)                                                                   |
| Qwen Code   | `omniroute setup-qwen`     | Entrada V4 `modelProviders.openai` en `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` en `~/.qwen/.env`                                                                                                                  |

```bash
# OpenCode (proveedor compatible con OpenAI, todos los modelos del catálogo, VPS remoto)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # conservar solo los modelos coincidentes
opencode -m omniroute/glm/glm-5.2 "..."          # exportar OMNIROUTE_API_KEY primero
```

> OpenCode también cuenta con una integración de **plugin** más completa: `omniroute setup opencode`
> (ahora compatible con conexiones remotas mediante `--remote`) instala `@omniroute/opencode-plugin`.
> `setup-opencode` es la alternativa ligera compatible con OpenAI. Se hace referencia a la clave de API
> mediante `{env:OMNIROUTE_API_KEY}`; nunca se escribe en el disco.
>
> En OpenCode v2, utiliza `@omniroute/opencode-plugin-v2` en su lugar: el mismo catálogo,
> pero con un contrato de carga diferente. Lee la clave desde el propio almacén de credenciales
> de OpenCode cuando la integración está conectada, por lo que una puerta de enlace remota no necesita
> ninguna clave en `opencode.json`.

---

## Gestión de contextos (cambio entre servidores)

Un **contexto** es un servidor guardado (baseUrl + credencial + ámbito). `omniroute connect`
crea uno y lo activa; a partir de entonces, cada comando lo tiene como objetivo. Gestione y
cambie entre ellos con `omniroute contexts`:

```bash
omniroute contexts list            # todos los contextos; el activo está marcado ●
omniroute contexts current         # el servidor activo, estado de autenticación, ámbito
```

```text
  | Name    | Base URL                  | Auth  | Scope | Description
● | vps     | http://100.67.86.91:20128 | token | admin | OmniRoute remoto (…)
  | default | http://localhost:20128    | ✗     |       |
```

**Cambiar de servidor** — cada comando subsiguiente sigue el contexto activo:

```bash
omniroute contexts use vps         # → todos los comandos ahora apuntan al VPS remoto
omniroute tokens list              #   (se ejecuta contra el VPS)

omniroute contexts use default     # → de vuelta a localhost
omniroute tokens list              #   (se ejecuta contra el servidor local)
```

**Añadir un contexto manualmente** (en lugar de `connect`), inspeccionar o renombrar:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "servidor de staging"
omniroute contexts show staging    # detalles completos de un contexto
omniroute contexts rename staging stg
```

**Eliminar un contexto** — solicita confirmación; pase `--yes` para omitirla
(requerido para scripts / shells no interactivos, que de otro modo rechazan de forma segura):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) no se puede eliminar. Eliminar el contexto activo vuelve
> a `default`. Consejo: eliminar un contexto solo elimina la credencial guardada **local** —
> revoque el token en el servidor con `omniroute tokens revoke <id>` para
> realmente eliminar el acceso.

**Exportar / importar** contextos (por ejemplo, para moverlos entre máquinas). Las exportaciones omiten
las credenciales por defecto, incluyendo las credenciales almacenadas por el respaldo de archivo. Use
`--include-secrets` explícitamente cuando se necesite una copia de seguridad portátil que contenga credenciales:

```bash
omniroute contexts export --out contexts.json     # redactado; destino por defecto: stdout
omniroute contexts export --include-secrets --out private-contexts.json
omniroute contexts import contexts.json            # sobrescribir; --merge para mantener los existentes
omniroute contexts migrate --yes                  # mover tokens de texto plano heredados al llavero
```

`--include-secrets` resuelve las referencias del llavero antes de exportar y falla si alguna
credencial referenciada no puede leerse. `--no-secrets` siempre tiene prioridad.
Los archivos de exportación se escriben atómicamente con el modo `0600`. Trate una exportación
explícita que contenga secretos como material secreto. En sistemas sin cabeza sin un llavero del SO
utilizable, la CLI recurre a `config.json` con el modo `0600` e imprime una
advertencia única; una exportación predeterminada permanece redactada en este modo.

---

## Comprobación rápida de principio a fin

Un ciclo de vida que puedes copiar y pegar para verificar una configuración remota desde cero: conectarse, crear un
token con ámbito limitado, dirigir un comando, volver al contexto anterior y desmontar la configuración. Sustituye
`192.168.0.15` por el host o la IP de tu servidor (Tailscale, LAN o una URL pública
`https://…`).

```bash
# 1. Conectarse (contraseña → token de administrador, guardado como un contexto que pasa a estar activo)
omniroute connect 192.168.0.15                 # o bien: --key oma_live_xxxx  (sin contraseña)
omniroute contexts current                     # muestra el servidor remoto y el ámbito

# 2. Usarlo: los comandos de gestión ahora se ejecutan contra el servidor remoto
omniroute tokens create --name laptop --scope read   # crea un token con un ámbito más limitado
omniroute tokens list                                 # lista enmascarada procedente del servidor remoto

# 3. Cambiar de un contexto a otro
omniroute contexts use default                 # → local
omniroute contexts use 192-168-0-15            # → remoto de nuevo (nombre obtenido de `contexts list`)

# 4. Desmontar la configuración. NOTA: `contexts remove` solo elimina la credencial LOCAL;
#    NO revoca el token en el servidor. Revócalo primero en el servidor si quieres
#    anular realmente el acceso.
omniroute tokens revoke <id|prefix>            # anula el acceso en el servidor
omniroute contexts remove 192-168-0-15 --yes   # elimina el contexto local (aunque esté activo → vuelve a default), sin preguntar
```

> `--yes` hace que `contexts remove` no sea interactivo (es obligatorio en scripts/CI; sin
> esta opción, un shell no interactivo rechaza la operación de forma segura en lugar de quedarse bloqueado). Al eliminar el
> contexto **activo**, se vuelve automáticamente a `default`.

---

## Notas de seguridad

- El token en texto plano se muestra una sola vez; solo se conserva el hash SHA-256 (igual que con las claves de API).
- `omniroute connect` reutiliza el bloqueo contra ataques de fuerza bruta del inicio de sesión y el registro de auditoría.
- Es preferible usar HTTPS o una Tailnet para el transporte; de forma predeterminada, un host sin esquema utiliza `http://`
  por comodidad en LAN/Tailscale; para usar TLS, proporciona una URL `https://…` completa.
- El archivo de contexto local recomendado es `~/.omniroute/config.json` (`chmod 600`),
  que contiene únicamente un `credentialRef`; el token se almacena en el llavero del
  sistema operativo (`keytar`) y nunca se imprime en los registros. Las instalaciones sin interfaz gráfica que no dispongan de un
  llavero nativo funcional utilizan el mismo archivo con permisos `0600` como mecanismo alternativo explícito y
  emiten una advertencia una sola vez. Usa `omniroute contexts migrate --yes` después de instalar un
  backend de llavero.

---

## Endpoints de la API (referencia)

| Método | Ruta                  | Autenticación         | Ámbito                                |
| ------ | --------------------- | --------------------- | ------------------------------------- |
| POST   | `/api/cli/connect`    | contraseña de gestión | — (público, protegido por contraseña) |
| GET    | `/api/cli/whoami`     | token de acceso       | lectura                               |
| GET    | `/api/cli/tokens`     | token de acceso       | administración                        |
| POST   | `/api/cli/tokens`     | token de acceso       | administración                        |
| DELETE | `/api/cli/tokens/:id` | token de acceso       | administración                        |

Consulta [openapi.yaml](../openapi.yaml) para ver los esquemas completos.
