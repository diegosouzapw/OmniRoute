# 📖 Setup Guide — OmniRoute (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Referência completa de configuração do OmniRoute. Para a versão rápida, consulte o [Início Rápido no README](../README.md#-quick-start).

## Índice

- [Métodos de instalação](#install-methods)
- [Configuração de ferramentas CLI](#cli-tool-configuration)
- [Configuração de protocolos (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Configuração de tempo limite](#timeout-configuration)
- [Modo de portas separadas](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Desinstalação](#uninstalling)

---

## Métodos de instalação

### npm (recomendado)

```bash
npm install -g omniroute
omniroute
```

O painel é aberto em `http://localhost:20128`, e a URL base da API é `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Usuários do pnpm:** a flag `--allow-build` é necessária para habilitar os scripts de compilação nativos de `better-sqlite3` e `@swc/core`. O comando `pnpm approve-builds -g` não é compatível com instalações globais no pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

O [pacote AUR](https://aur.archlinux.org/packages/omniroute-bin) instala o OmniRoute e fornece um serviço de usuário do systemd.

### A partir do código-fonte

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Observação para Windows:** por padrão, o OmniRoute usa `%APPDATA%\omniroute` quando o diretório legado `%USERPROFILE%\.omniroute` não está presente. Defina `DATA_DIR` para escolher um local diferente para o diretório de dados.

> **Observação:** `npm install` gera automaticamente o `.env` a partir de `.env.example` na primeira execução. Instalações subsequentes não sobrescreverão um `.env` existente, preservando as personalizações. Para gerá-lo novamente, exclua o `.env` antes de executar o comando outra vez.

### Docker

Consulte o [Guia do Docker](./DOCKER_GUIDE.md) para obter a configuração completa do Docker, incluindo perfis do Compose e HTTPS com Caddy.

### Aplicativo para desktop (Electron)

O OmniRoute inclui um wrapper para desktop desenvolvido com Electron 41 + electron-builder 26.10. Scripts disponíveis (na raiz do workspace):

```bash
npm run electron:dev          # Executa o aplicativo para desktop com recarregamento automático
npm run electron:build        # Compila para o sistema operacional atual (detectado automaticamente)
npm run electron:build:win    # Instalador para Windows (NSIS + portátil)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Testa superficialmente a compilação empacotada
```

As versões dos instaladores para desktop são anexadas às Releases do GitHub. Para obter uma análise detalhada do Electron (assinatura, ponte IPC, distribuições), consulte [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(criado em fase posterior)_.

### Servidor sem interface gráfica (CI/automação)

Para configurações não assistidas (Docker, Kubernetes, CI), use:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Combinado com variáveis de ambiente (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` etc.), isso permite iniciar uma instância do OmniRoute de forma totalmente programável.

### Opções da CLI

| Comando                 | Descrição                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `omniroute`             | Inicia o servidor (`PORT=20128`, API e painel na mesma porta)                      |
| `omniroute setup`       | Integração guiada pela CLI para senha e primeiro provedor                          |
| `omniroute doctor`      | Executa verificações locais de integridade sem iniciar o servidor                  |
| `omniroute providers`   | Descobre, lista, valida e testa provedores pela CLI                                |
| `omniroute config`      | Configuração de ferramentas CLI — lista, obtém, define e valida configurações      |
| `omniroute status`      | Painel de status offline — versão, banco de dados, ferramentas e configuração      |
| `omniroute logs`        | Transmite logs de uso da API (compatível com `--follow`)                           |
| `omniroute update`      | Verifica ou aplica atualizações do OmniRoute                                       |
| `omniroute provider`    | Gerencia conexões de provedores — adiciona, lista, remove, testa e define o padrão |
| `omniroute --port 3000` | Define a porta canônica/da API como 3000                                           |
| `omniroute --mcp`       | Inicia o servidor MCP (transporte stdio)                                           |
| `omniroute --no-open`   | Não abre o navegador automaticamente                                               |
| `omniroute --help`      | Exibe a ajuda                                                                      |

A configuração sem interface gráfica pode ser automatizada com flags ou variáveis de ambiente:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Execute diagnósticos locais sem abrir o painel:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Gerencie provedores via SSH ou scripts sem abrir o painel:

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

## Configuração da ferramenta CLI

### 1) Conecte provedores e crie uma chave de API

1. Abra Dashboard → `Providers` e conecte pelo menos um provedor (OAuth ou chave de API).
2. Abra Dashboard → `Endpoints` e crie uma chave de API.
3. (Opcional) Abra Dashboard → `Combos` e defina sua cadeia de fallback.

### 2) Aponte sua ferramenta de programação

```txt
URL base:     http://localhost:20128/v1
Chave de API: [copie da página Endpoint]
Modelo:       if/qwen3.8-max-preview (ou qualquer prefixo de provedor/modelo)
```

Se o seu editor não conseguir enviar `Authorization: Bearer ...`, use como alternativa a base de compatibilidade com token:

```txt
URL base:        http://localhost:20128/api/v1/vscode/YOUR_KEY/
URL dos modelos: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
URL do chat:     http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL de tags do Ollama: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Funciona com Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode e SDKs compatíveis com OpenAI.

#### Configuração automática com `setup-*`

Em vez de colar manualmente a URL base e a chave, permita que o OmniRoute grave a configuração própria de cada ferramenta a partir do catálogo de modelos em execução. Um comando por ferramenta:

```bash
omniroute setup-codex        # perfis em ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (compatível com OpenAI)
omniroute setup-cline        # configurações da CLI do Cline + extensão do VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # exibe as etapas no aplicativo do Cursor
omniroute setup-roo          # importação do Roo Code + ponteiro autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Cada um aceita `--remote <url> --api-key <key>` para configurar uma ferramenta local para usar um OmniRoute **remoto**, além de `--dry-run` para visualizar as alterações. Para iniciar uma CLI com as variáveis de ambiente corretas injetadas e sem gravar nenhuma configuração, use o inicializador genérico `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini); os inicializadores legados específicos de cada ferramenta, `omniroute launch` (Claude Code) e `omniroute launch-codex` (Codex), continuam disponíveis.

Para consultar a tabela completa (o que cada comando grava, todas as opções, local versus remoto e convenções de URL base com `/v1`), consulte **[Integrações de CLI](./CLI-INTEGRATIONS.md)**.

Para obter configurações detalhadas de cada ferramenta (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot e outras), consulte o **[Guia de ferramentas CLI](../reference/CLI-TOOLS.md)** dedicado.

---

## Configuração de protocolos (MCP + A2A)

### Configuração do MCP (Model Context Protocol)

Inicie o transporte MCP no modo stdio:

```bash
omniroute --mcp
```

Fluxo de validação recomendado:

```bash
# 1. Inicie o servidor MCP
omniroute --mcp

# 2. No seu cliente MCP, chame:
omniroute_get_health        # Deve retornar a integridade do sistema
omniroute_list_combos       # Deve retornar os combos ativos

# 3. Ou execute o conjunto E2E completo:
npm run test:protocols:e2e
```

#### Configuração do cliente MCP

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Adicione às suas configurações do MCP:

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

**Documentação completa do MCP:** [README do servidor MCP](../../open-sse/mcp-server/README.md) — 110 ferramentas, configurações de IDE e clientes Python/TS/Go.

### Configuração do A2A (Agent-to-Agent Protocol)

Verifique o Agent Card:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Envie uma tarefa:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Documentação completa do A2A:** [README do servidor A2A](../../src/lib/a2a/README.md) — JSON-RPC 2.0, habilidades, streaming e ciclo de vida das tarefas.

---

## Configuração de timeout

### Timeouts básicos

Para a maioria das implantações, você precisa apenas destas duas variáveis:

| Variável                 | Padrão                        | Finalidade                                                                                                                                                                                 |
| ------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `REQUEST_TIMEOUT_MS`     | `600000`                      | Referência compartilhada para o timeout de início da resposta upstream, timeouts internos do Undici, solicitações de impressão digital TLS e timeouts de solicitação/proxy da ponte de API |
| `STREAM_IDLE_TIMEOUT_MS` | herda de `REQUEST_TIMEOUT_MS` | Intervalo máximo entre partes do streaming antes que o OmniRoute interrompa o fluxo SSE                                                                                                    |

A compatibilidade com versões anteriores é preservada: `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` e outras variáveis de timeout por camada existentes continuam funcionando e substituem a referência compartilhada.

### Observações específicas do provedor

Para upstreams compatíveis com o Claude Code (`anthropic-compatible-cc-*`), o OmniRoute deriva o cabeçalho de saída `X-Stainless-Timeout` do timeout de fetch resolvido, para que os timeouts de leitura no lado do provedor permaneçam alinhados à configuração do seu ambiente.

Para proxies reversos de terceiros compatíveis com o Claude Code, o OmniRoute mantém o conjunto padrão `anthropic-beta` conservador e, quando `Client Cache Control` é mantido como `Auto`, encaminha apenas marcadores `cache_control` fornecidos pelo cliente. Ative a opção "Enable redact-thinking beta" por conexão somente quando o upstream exigir especificamente fluxos de raciocínio do Claude com conteúdo ocultado.

### Substituições avançadas de timeout

| Variável                                 | Padrão                                     | Finalidade                                                                            |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | herda de `REQUEST_TIMEOUT_MS`              | Timeout de início da resposta upstream usado até a chegada dos cabeçalhos da resposta |
| `FETCH_HEADERS_TIMEOUT_MS`               | herda de `FETCH_TIMEOUT_MS`                | Limite de tempo do Undici para receber os cabeçalhos da resposta upstream             |
| `FETCH_BODY_TIMEOUT_MS`                  | herda de `FETCH_TIMEOUT_MS`                | Limite de tempo do Undici entre partes do corpo upstream (`0` o desativa)             |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Timeout de conexão TCP do Undici                                                      |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Timeout de socket keep-alive ocioso do Undici                                         |
| `TLS_CLIENT_TIMEOUT_MS`                  | herda de `FETCH_TIMEOUT_MS`                | Timeout para solicitações de impressão digital TLS feitas por meio de `wreq-js`       |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | herda de `REQUEST_TIMEOUT_MS` ou `600000`  | Timeout do encaminhamento por proxy de `/v1` da porta da API para a porta do painel   |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | Timeout de solicitações recebidas no servidor da ponte de API                         |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | Timeout de cabeçalhos recebidos no servidor da ponte de API                           |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | Timeout de keep-alive no servidor da ponte de API                                     |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | Timeout de inatividade do socket no servidor da ponte de API (`0` o desativa)         |

> **Observação:** Para solicitações de streaming, `FETCH_TIMEOUT_MS` abrange apenas o estabelecimento da conexão e a espera pela primeira resposta upstream. Depois que o fluxo estiver ativo, o OmniRoute somente o interromperá em caso de paralisação real (`STREAM_IDLE_TIMEOUT_MS`) ou inatividade do corpo no Undici (`FETCH_BODY_TIMEOUT_MS`).

### Compatibilidade com proxy reverso

Se você executar o OmniRoute atrás do Nginx, Caddy, Cloudflare ou outro proxy reverso, certifique-se de que os timeouts do proxy também sejam maiores que os timeouts de fluxo/fetch do OmniRoute.

---

## Modo de Portas Separadas

Execute a API e o Painel em portas separadas para cenários avançados (proxy reverso, rede de contêineres):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:    http://localhost:20128/v1
# Painel: http://localhost:20129
```

---

## Template para Void Linux (xbps-src)

Usuários do Void Linux podem compilar um pacote nativo usando `xbps-src`. Salve este bloco como `srcpkgs/omniroute/template`:

```bash
# Arquivo de template para 'omniroute'
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
# Gere novamente a soma de verificação para cada versão com:
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

## Desinstalação

| Comando                  | Ação                                                                                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Remove o aplicativo do sistema, mas **mantém seu banco de dados e suas configurações** em `~/.omniroute`. |
| `npm run uninstall:full` | Remove o aplicativo E **apaga permanentemente todas as configurações, chaves e bancos de dados**.         |

> Para obter instruções detalhadas de desinstalação para todos os métodos, consulte [UNINSTALL.md](./UNINSTALL.md).
