# 📖 Setup Guide — OmniRoute (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Referencia completa de configuración de OmniRoute. Para la versión rápida, consulta el [Inicio rápido en el README](../README.md#-quick-start).

## Tabla de contenidos

- [Métodos de instalación](#install-methods)
- [Configuración de herramientas CLI](#cli-tool-configuration)
- [Configuración de protocolos (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Configuración de tiempos de espera](#timeout-configuration)
- [Modo de puertos separados](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Desinstalación](#uninstalling)

---

## Métodos de instalación

### npm (recomendado)

```bash
npm install -g omniroute
omniroute
```

El panel se abre en `http://localhost:20128` y la URL base de la API es `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Usuarios de pnpm:** la opción `--allow-build` es necesaria para habilitar los scripts de compilación nativos de `better-sqlite3` y `@swc/core`. El comando `pnpm approve-builds -g` no es compatible con las instalaciones globales en pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

El [paquete de AUR](https://aur.archlinux.org/packages/omniroute-bin) instala OmniRoute y proporciona un servicio de usuario de systemd.

### Desde el código fuente

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Nota para Windows:** De forma predeterminada, OmniRoute utiliza `%APPDATA%\omniroute` cuando el directorio heredado `%USERPROFILE%\.omniroute` no está presente. Define `DATA_DIR` para elegir una ubicación diferente para el directorio de datos.

> **Nota:** `npm install` genera automáticamente `.env` a partir de `.env.example` durante la primera ejecución. Las instalaciones posteriores no sobrescribirán un archivo `.env` existente, por lo que se conservarán las personalizaciones. Para volver a generarlo, elimina `.env` antes de ejecutar el comando de nuevo.

### Docker

Consulta la [Guía de Docker](./DOCKER_GUIDE.md) para obtener la configuración completa de Docker, incluidos los perfiles de Compose y HTTPS con Caddy.

### Aplicación de escritorio (Electron)

OmniRoute incluye un contenedor de escritorio creado con Electron 41 + electron-builder 26.10. Scripts disponibles (raíz del espacio de trabajo):

```bash
npm run electron:dev          # Ejecutar la aplicación de escritorio con recarga en caliente
npm run electron:build        # Compilar para el SO actual (detectado automáticamente)
npm run electron:build:win    # Instalador de Windows (NSIS + portable)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Prueba rápida de la compilación empaquetada
```

Las versiones de los instaladores de escritorio se adjuntan a las publicaciones de GitHub. Para obtener información detallada sobre Electron (firma, puente IPC, distribuciones), consulta [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(creado en una fase posterior)_.

### Servidor sin interfaz gráfica (CI/automatización)

Para configuraciones desatendidas (Docker, Kubernetes, CI), utiliza:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

En combinación con variables de entorno (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET`, etc.), esto permite iniciar una instancia de OmniRoute mediante scripts de forma integral.

### Opciones de la CLI

| Comando                 | Descripción                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| `omniroute`             | Inicia el servidor (`PORT=20128`, API y panel en el mismo puerto)                                 |
| `omniroute setup`       | Incorporación guiada por CLI para la contraseña y el primer proveedor                             |
| `omniroute doctor`      | Ejecuta comprobaciones de estado locales sin iniciar el servidor                                  |
| `omniroute providers`   | Descubre, enumera, valida y prueba proveedores desde la CLI                                       |
| `omniroute config`      | Configuración de herramientas CLI: enumera, obtiene, define y valida configuraciones              |
| `omniroute status`      | Panel de estado sin conexión: versión, BD, herramientas y configuración                           |
| `omniroute logs`        | Transmite registros de uso desde la API (admite `--follow`)                                       |
| `omniroute update`      | Busca o aplica actualizaciones de OmniRoute                                                       |
| `omniroute provider`    | Gestiona conexiones de proveedores: añade, enumera, elimina, prueba y establece el predeterminado |
| `omniroute --port 3000` | Establece el puerto canónico/de la API en 3000                                                    |
| `omniroute --mcp`       | Inicia el servidor MCP (transporte stdio)                                                         |
| `omniroute --no-open`   | No abre automáticamente el navegador                                                              |
| `omniroute --help`      | Muestra la ayuda                                                                                  |

La configuración sin interfaz gráfica puede automatizarse mediante opciones o variables de entorno:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Ejecuta diagnósticos locales sin abrir el panel:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Gestiona proveedores desde SSH o mediante scripts sin abrir el panel:

```bash
omniroute providers available
omniroute providers available --search openai
omniroute providers available --category api-key
omniroute providers list
omniroute providers test <id-or-name>
omniroute providers test-all
omniroute providers validate
```

---

## Configuración de la herramienta CLI

### 1) Conectar proveedores y crear una clave de API

1. Abre Dashboard → `Providers` y conecta al menos un proveedor (OAuth o clave de API).
2. Abre Dashboard → `Endpoints` y crea una clave de API.
3. (Opcional) Abre Dashboard → `Combos` y configura tu cadena de respaldo.

### 2) Configurar tu herramienta de programación

```txt
URL base:     http://localhost:20128/v1
Clave de API: [copiar de la página Endpoint]
Modelo:       if/qwen3.8-max-preview (o cualquier prefijo de proveedor/modelo)
```

Si tu editor no puede enviar `Authorization: Bearer ...`, utiliza en su lugar la base de compatibilidad con token:

```txt
URL base:           http://localhost:20128/api/v1/vscode/YOUR_KEY/
URL de modelos:     http://localhost:20128/api/v1/vscode/YOUR_KEY/models
URL de chat:        http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL de etiquetas de Ollama: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Funciona con Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode y SDK compatibles con OpenAI.

#### Configuración automática con `setup-*`

En lugar de pegar manualmente la URL base y la clave, permite que OmniRoute escriba la configuración propia de cada herramienta a partir del catálogo de modelos activo. Un comando por herramienta:

```bash
omniroute setup-codex        # Perfiles de ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (compatible con OpenAI)
omniroute setup-cline        # Cline CLI + configuración de la extensión de VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # Muestra los pasos dentro de la aplicación Cursor
omniroute setup-roo          # Importación de Roo Code + puntero autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Cada uno acepta `--remote <url> --api-key <key>` para configurar una herramienta local con un OmniRoute **remoto**, además de `--dry-run` para obtener una vista previa. Para iniciar una CLI con el entorno adecuado inyectado y sin escribir ninguna configuración, utiliza el iniciador genérico `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini); los iniciadores heredados específicos de cada herramienta, `omniroute launch` (Claude Code) y `omniroute launch-codex` (Codex), siguen estando disponibles.

Para consultar la tabla completa (qué escribe cada comando, todas las opciones, local frente a remoto y convenciones de `/v1` para la URL base), consulta **[Integraciones de CLI](./CLI-INTEGRATIONS.md)**.

Para obtener información detallada sobre la configuración de cada herramienta (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot y más), consulta la guía dedicada **[Guía de herramientas CLI](../reference/CLI-TOOLS.md)**.

---

## Configuración de protocolos (MCP + A2A)

### Configuración de MCP (Protocolo de Contexto de Modelo)

Inicia el transporte MCP en modo stdio:

```bash
omniroute --mcp
```

Flujo de validación recomendado:

```bash
# 1. Inicia el servidor MCP
omniroute --mcp

# 2. Desde tu cliente MCP, llama a:
omniroute_get_health        # Debe devolver el estado del sistema
omniroute_list_combos       # Debe devolver los combos activos

# 3. O ejecuta el conjunto completo de pruebas E2E:
npm run test:protocols:e2e
```

#### Configuración del cliente MCP

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Añade lo siguiente a tu configuración de MCP:

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"],
      "env": {}
    }
  }
}
```

**Documentación completa de MCP:** [README del servidor MCP](../../open-sse/mcp-server/README.md) — 110 herramientas, configuraciones de IDE y clientes para Python/TS/Go.

### Configuración de A2A (Protocolo de Agente a Agente)

Verifica la tarjeta del agente:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Envía una tarea:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Dame un breve resumen de la cuota."}]}}'
```

**Documentación completa de A2A:** [README del servidor A2A](../../src/lib/a2a/README.md) — JSON-RPC 2.0, habilidades, streaming y ciclo de vida de las tareas.

---

## Configuración de tiempos de espera

### Tiempos de espera básicos

Para la mayoría de las implementaciones, solo necesita estas dos variables:

| Variable                 | Valor predeterminado           | Propósito                                                                                                                                                                                                                                               |
| ------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                       | Valor de referencia compartido para el tiempo de espera hasta el inicio de la respuesta del servidor de origen, los tiempos de espera internos de Undici, las solicitudes de huellas TLS y los tiempos de espera de solicitudes/proxy del puente de API |
| `STREAM_IDLE_TIMEOUT_MS` | hereda de `REQUEST_TIMEOUT_MS` | Intervalo máximo entre fragmentos de streaming antes de que OmniRoute cancele el flujo SSE                                                                                                                                                              |

Se mantiene la compatibilidad con versiones anteriores: las variables existentes `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` y otras variables de tiempo de espera específicas de cada capa siguen funcionando y sobrescriben el valor de referencia compartido.

### Notas específicas de los proveedores

Para los servidores de origen compatibles con Claude Code (`anthropic-compatible-cc-*`), OmniRoute deriva el encabezado saliente `X-Stainless-Timeout` del tiempo de espera de fetch resuelto, de modo que los tiempos de espera de lectura del lado del proveedor permanezcan alineados con la configuración de su entorno.

Para proxies inversos de terceros compatibles con Claude Code, OmniRoute mantiene un conjunto predeterminado `anthropic-beta` conservador y, cuando `Client Cache Control` se deja en `Auto`, solo reenvía los marcadores `cache_control` proporcionados por el cliente. Active la opción por conexión "Enable redact-thinking beta" únicamente cuando el servidor de origen requiera específicamente flujos de razonamiento redactado de Claude.

### Sobrescrituras avanzadas de tiempos de espera

| Variable                                 | Valor predeterminado                       | Propósito                                                                                                                        |
| ---------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | hereda de `REQUEST_TIMEOUT_MS`             | Tiempo de espera hasta el inicio de la respuesta del servidor de origen, utilizado hasta que llegan los encabezados de respuesta |
| `FETCH_HEADERS_TIMEOUT_MS`               | hereda de `FETCH_TIMEOUT_MS`               | Límite de tiempo de Undici para recibir los encabezados de respuesta del servidor de origen                                      |
| `FETCH_BODY_TIMEOUT_MS`                  | hereda de `FETCH_TIMEOUT_MS`               | Límite de tiempo de Undici entre fragmentos del cuerpo del servidor de origen (`0` lo desactiva)                                 |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Tiempo de espera de Undici para la conexión TCP                                                                                  |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Tiempo de espera de Undici para sockets keep-alive inactivos                                                                     |
| `TLS_CLIENT_TIMEOUT_MS`                  | hereda de `FETCH_TIMEOUT_MS`               | Tiempo de espera para las solicitudes de huellas TLS realizadas mediante `wreq-js`                                               |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | hereda de `REQUEST_TIMEOUT_MS` o `600000`  | Tiempo de espera para el reenvío del proxy `/v1` desde el puerto de la API al puerto del panel                                   |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | Tiempo de espera de las solicitudes entrantes en el servidor del puente de API                                                   |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | Tiempo de espera de los encabezados entrantes en el servidor del puente de API                                                   |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | Tiempo de espera de keep-alive en el servidor del puente de API                                                                  |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | Tiempo de espera por inactividad del socket en el servidor del puente de API (`0` lo desactiva)                                  |

> **Nota:** Para las solicitudes de streaming, `FETCH_TIMEOUT_MS` solo cubre el establecimiento de la conexión y la espera de la primera respuesta del servidor de origen. Una vez que el flujo está activo, OmniRoute solo lo cancelará si se produce un bloqueo real (`STREAM_IDLE_TIMEOUT_MS`) o inactividad del cuerpo de Undici (`FETCH_BODY_TIMEOUT_MS`).

### Compatibilidad con proxies inversos

Si ejecuta OmniRoute detrás de Nginx, Caddy, Cloudflare u otro proxy inverso, asegúrese de que los tiempos de espera del proxy también sean superiores a los tiempos de espera de flujo/fetch de OmniRoute.

---

## Modo de puertos separados

Ejecute la API y el Dashboard en puertos separados para escenarios avanzados (proxy inverso, redes de contenedores):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

---

## Plantilla para Void Linux (xbps-src)

Los usuarios de Void Linux pueden compilar un paquete nativo mediante `xbps-src`. Guarde este bloque como `srcpkgs/omniroute/template`:

```bash
# Archivo de plantilla para 'omniroute'
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# Regenere la suma de comprobación para cada versión con:
#   curl -L -o /tmp/omniroute.tar.gz "https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz" && sha256sum /tmp/omniroute.tar.gz
checksum=PLACEHOLDER_REGENERATE_PER_RELEASE
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	NODE_ENV=development npm ci --ignore-scripts
	npm run build
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	rm -rf .next/standalone/node_modules/@img

	for _mod in pino-abstract-transport split2 process-warning; do
		cp -r "node_modules/$_mod" .next/standalone/node_modules/
	done
}

do_check() {
	npm run test:unit
}

do_install() {
	vmkdir usr/lib/omniroute/.next
	vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

	for _d in \
		.next/standalone/.next/server/app/dashboard \
		.next/standalone/.next/server/app/dashboard/settings \
		.next/standalone/.next/server/app/dashboard/providers; do
		touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
	done

	cat > "${WRKDIR}/omniroute" <<'EOF'
#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
	vlicense LICENSE
}
```

---

## Desinstalación

| Comando                  | Acción                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Elimina la aplicación del sistema, pero **conserva su base de datos y sus configuraciones** en `~/.omniroute`. |
| `npm run uninstall:full` | Elimina la aplicación Y **borra permanentemente todas las configuraciones, claves y bases de datos**.          |

> Para obtener instrucciones detalladas de desinstalación para todos los métodos, consulte [UNINSTALL.md](./UNINSTALL.md).
