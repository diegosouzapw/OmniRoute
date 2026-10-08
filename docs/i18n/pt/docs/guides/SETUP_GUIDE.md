# 📖 Setup Guide — OmniRoute (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Referência completa de configuração do OmniRoute. Para a versão rápida, consulte o [Início Rápido no README](../README.md#-quick-start).

## Índice

- [Métodos de Instalação](#install-methods)
- [Configuração da Ferramenta CLI](#cli-tool-configuration)
- [Configuração de Protocolos (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Configuração de Tempos Limite](#timeout-configuration)
- [Modo de Portas Separadas](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Desinstalação](#uninstalling)

---

## Métodos de Instalação

### npm (recomendado)

```bash
npm install -g omniroute
omniroute
```

O painel é aberto em `http://localhost:20128` e o URL base da API é `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Utilizadores do pnpm:** o parâmetro `--allow-build` é necessário para ativar os scripts de compilação nativos do `better-sqlite3` e do `@swc/core`. O comando `pnpm approve-builds -g` não é suportado para instalações globais no pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

O [pacote AUR](https://aur.archlinux.org/packages/omniroute-bin) instala o OmniRoute e disponibiliza um serviço systemd de utilizador.

### A Partir do Código-Fonte

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Nota para Windows:** por predefinição, o OmniRoute utiliza `%APPDATA%\omniroute` quando o diretório legado `%USERPROFILE%\.omniroute` não está presente. Defina `DATA_DIR` para escolher uma localização diferente para o diretório de dados.

> **Nota:** `npm install` gera automaticamente o `.env` a partir de `.env.example` na primeira execução. As instalações seguintes não substituem um `.env` existente, pelo que as personalizações são preservadas. Para voltar a gerar o ficheiro, elimine `.env` antes de executar novamente o comando.

### Docker

Consulte o [Guia do Docker](./DOCKER_GUIDE.md) para obter a configuração completa do Docker, incluindo perfis do Compose e HTTPS com Caddy.

### Aplicação para Ambiente de Trabalho (Electron)

O OmniRoute inclui um wrapper para ambiente de trabalho criado com Electron 41 + electron-builder 26.10. Scripts disponíveis (raiz do espaço de trabalho):

```bash
npm run electron:dev          # Executar a aplicação para ambiente de trabalho com recarregamento automático
npm run electron:build        # Compilar para o sistema operativo atual (detetado automaticamente)
npm run electron:build:win    # Instalador para Windows (NSIS + portátil)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Efetuar um teste rápido à compilação empacotada
```

As versões dos instaladores para ambiente de trabalho são anexadas às versões publicadas no GitHub. Para uma análise aprofundada do Electron (assinatura, ponte IPC, distribuições), consulte [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(criado numa fase posterior)_.

### Servidor sem interface gráfica (CI/automatização)

Para configurações não assistidas (Docker, Kubernetes, CI), utilize:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Em conjunto com variáveis de ambiente (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET`, etc.), isto permite iniciar uma instância do OmniRoute de forma totalmente programável.

### Opções da CLI

| Comando                 | Descrição                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `omniroute`             | Iniciar o servidor (`PORT=20128`, API e painel na mesma porta)                     |
| `omniroute setup`       | Integração guiada pela CLI para configurar a palavra-passe e o primeiro fornecedor |
| `omniroute doctor`      | Executar verificações locais de integridade sem iniciar o servidor                 |
| `omniroute providers`   | Descobrir, listar, validar e testar fornecedores através da CLI                    |
| `omniroute config`      | Configuração da ferramenta CLI — listar, obter, definir e validar configurações    |
| `omniroute status`      | Painel de estado offline — versão, BD, ferramentas e configuração                  |
| `omniroute logs`        | Transmitir registos de utilização a partir da API (suporta `--follow`)             |
| `omniroute update`      | Procurar ou aplicar atualizações do OmniRoute                                      |
| `omniroute provider`    | Gerir ligações a fornecedores — adicionar, listar, remover, testar e predefinir    |
| `omniroute --port 3000` | Definir a porta canónica/da API como 3000                                          |
| `omniroute --mcp`       | Iniciar o servidor MCP (transporte stdio)                                          |
| `omniroute --no-open`   | Não abrir automaticamente o navegador                                              |
| `omniroute --help`      | Mostrar a ajuda                                                                    |

A configuração sem interface gráfica pode ser automatizada através de parâmetros ou variáveis de ambiente:

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

Faça a gestão de fornecedores através de SSH ou scripts sem abrir o painel:

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

### 1) Ligar fornecedores e criar uma chave de API

1. Abra o Dashboard → `Providers` e ligue pelo menos um fornecedor (OAuth ou chave de API).
2. Abra o Dashboard → `Endpoints` e crie uma chave de API.
3. (Opcional) Abra o Dashboard → `Combos` e defina a sua cadeia de contingência.

### 2) Configurar a sua ferramenta de programação

```txt
URL base:  http://localhost:20128/v1
Chave API: [copiar da página Endpoint]
Modelo:    if/qwen3.8-max-preview (ou qualquer prefixo de fornecedor/modelo)
```

Se o seu editor não conseguir enviar `Authorization: Bearer ...`, utilize, em alternativa, a base de compatibilidade com token:

```txt
URL base:        http://localhost:20128/api/v1/vscode/YOUR_KEY/
URL de modelos:  http://localhost:20128/api/v1/vscode/YOUR_KEY/models
URL de chat:     http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL Ollama Tags: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Funciona com Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode e SDKs compatíveis com OpenAI.

#### Configuração automática com `setup-*`

Em vez de colar manualmente o URL base e a chave, permita que o OmniRoute escreva a configuração própria de cada ferramenta a partir do catálogo de modelos em tempo real. Um comando por ferramenta:

```bash
omniroute setup-codex        # Perfis em ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (compatível com OpenAI)
omniroute setup-cline        # Definições da CLI do Cline + extensão do VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # Apresenta os passos a seguir na aplicação Cursor
omniroute setup-roo          # Importação do Roo Code + apontador autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Cada comando aceita `--remote <url> --api-key <key>` para configurar uma ferramenta local para utilizar uma instância **remota** do OmniRoute, bem como `--dry-run` para pré-visualizar. Para iniciar uma CLI com o ambiente correto injetado, sem escrever qualquer configuração, utilize o iniciador genérico `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini); os iniciadores legados específicos de cada ferramenta, `omniroute launch` (Claude Code) e `omniroute launch-codex` (Codex), continuam disponíveis.

Para consultar a tabela completa (o que cada comando escreve, todas as opções, modo local ou remoto e convenções de URL base com `/v1`), consulte **[Integrações CLI](./CLI-INTEGRATIONS.md)**.

Para obter instruções de configuração detalhadas para cada ferramenta (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot e outras), consulte o **[Guia de ferramentas CLI](../reference/CLI-TOOLS.md)** dedicado.

---

## Configuração de protocolos (MCP + A2A)

### Configuração do MCP (Model Context Protocol)

Inicie o transporte MCP no modo stdio:

```bash
omniroute --mcp
```

Fluxo de validação recomendado:

```bash
# 1. Iniciar o servidor MCP
omniroute --mcp

# 2. A partir do seu cliente MCP, chamar:
omniroute_get_health        # Deve devolver o estado de funcionamento do sistema
omniroute_list_combos       # Deve devolver os combos ativos

# 3. Em alternativa, executar o conjunto E2E completo:
npm run test:protocols:e2e
```

#### Configuração do cliente MCP

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Adicione às suas definições de MCP:

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

### Configuração do A2A (protocolo Agent-to-Agent)

Verifique o Agent Card:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Envie uma tarefa:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Apresente-me um breve resumo da quota."}]}}'
```

**Documentação completa do A2A:** [README do servidor A2A](../../src/lib/a2a/README.md) — JSON-RPC 2.0, competências, streaming e ciclo de vida das tarefas.

---

## Configuração de Tempos Limite

### Tempos Limite Básicos

Para a maioria das implementações, apenas necessita destas duas variáveis:

| Variável                 | Predefinição                  | Finalidade                                                                                                                                                                                                         |
| ------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `REQUEST_TIMEOUT_MS`     | `600000`                      | Valor de referência partilhado para o tempo limite de início da resposta do serviço a montante, tempos limite ocultos do Undici, pedidos de impressão digital TLS e tempos limite de pedidos/proxy da ponte da API |
| `STREAM_IDLE_TIMEOUT_MS` | herda de `REQUEST_TIMEOUT_MS` | Intervalo máximo entre blocos de transmissão antes de o OmniRoute interromper o fluxo SSE                                                                                                                          |

A retrocompatibilidade é preservada: as variáveis existentes `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` e outras variáveis de tempo limite por camada continuam a funcionar e substituem o valor de referência partilhado.

### Notas Específicas dos Fornecedores

Para serviços a montante compatíveis com o Claude Code (`anthropic-compatible-cc-*`), o OmniRoute deriva o cabeçalho `X-Stainless-Timeout` de saída a partir do tempo limite de obtenção resolvido, para que os tempos limite de leitura do lado do fornecedor permaneçam alinhados com a configuração do seu ambiente.

Para proxies inversos de terceiros compatíveis com o Claude Code, o OmniRoute mantém o conjunto predefinido `anthropic-beta` conservador e, quando `Client Cache Control` permanece definido como `Auto`, apenas reencaminha os marcadores `cache_control` fornecidos pelo cliente. Ative a opção por ligação "Ativar a versão beta de redact-thinking" apenas quando o serviço a montante exigir especificamente fluxos de raciocínio ocultado do Claude.

### Substituições Avançadas de Tempos Limite

| Variável                                 | Predefinição                               | Finalidade                                                                                                   |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `FETCH_TIMEOUT_MS`                       | herda de `REQUEST_TIMEOUT_MS`              | Tempo limite de início da resposta do serviço a montante, utilizado até à receção dos cabeçalhos da resposta |
| `FETCH_HEADERS_TIMEOUT_MS`               | herda de `FETCH_TIMEOUT_MS`                | Limite de tempo do Undici para receber os cabeçalhos da resposta do serviço a montante                       |
| `FETCH_BODY_TIMEOUT_MS`                  | herda de `FETCH_TIMEOUT_MS`                | Limite de tempo do Undici entre blocos do corpo da resposta do serviço a montante (`0` desativa-o)           |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Tempo limite de ligação TCP do Undici                                                                        |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Tempo limite de inatividade do socket keep-alive do Undici                                                   |
| `TLS_CLIENT_TIMEOUT_MS`                  | herda de `FETCH_TIMEOUT_MS`                | Tempo limite para pedidos de impressão digital TLS efetuados através de `wreq-js`                            |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | herda de `REQUEST_TIMEOUT_MS` ou `600000`  | Tempo limite para o reencaminhamento do proxy de `/v1` da porta da API para a porta do painel                |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | Tempo limite dos pedidos recebidos no servidor da ponte da API                                               |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | Tempo limite dos cabeçalhos recebidos no servidor da ponte da API                                            |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | Tempo limite de keep-alive no servidor da ponte da API                                                       |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | Tempo limite de inatividade do socket no servidor da ponte da API (`0` desativa-o)                           |

> **Nota:** Para pedidos de transmissão, `FETCH_TIMEOUT_MS` abrange apenas o estabelecimento da ligação / a espera pela primeira resposta do serviço a montante. Quando o fluxo estiver ativo, o OmniRoute apenas o interromperá em caso de bloqueio efetivo (`STREAM_IDLE_TIMEOUT_MS`) ou de inatividade do corpo no Undici (`FETCH_BODY_TIMEOUT_MS`).

### Compatibilidade com Proxies Inversos

Se executar o OmniRoute através do Nginx, Caddy, Cloudflare ou de outro proxy inverso, certifique-se de que os tempos limite do proxy também são superiores aos tempos limite de transmissão/obtenção do OmniRoute.

---

## Modo de Portas Separadas

Execute a API e o Painel em portas separadas para cenários avançados (proxy inverso, redes de contentores):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:    http://localhost:20128/v1
# Painel: http://localhost:20129
```

---

## Modelo para Void Linux (xbps-src)

Os utilizadores do Void Linux podem criar um pacote nativo utilizando o `xbps-src`. Guarde este bloco como `srcpkgs/omniroute/template`:

```bash
# Ficheiro de modelo para 'omniroute'
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

| Comando                  | Ação                                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Remove a aplicação do sistema, mas **mantém a base de dados e as configurações** em `~/.omniroute`. |
| `npm run uninstall:full` | Remove a aplicação E **elimina permanentemente todas as configurações, chaves e bases de dados**.   |

> Para obter instruções detalhadas de desinstalação para todos os métodos, consulte [UNINSTALL.md](./UNINSTALL.md).
