# CLI-TOOLS (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "Ferramentas CLI — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Ferramentas CLI — OmniRoute

Última atualização: 2026-08-18

OmniRoute integra-se com três categorias de ferramentas CLI distribuídas por três páginas de painel dedicadas:

| Página          | Rota                    | Conceito                                                                                           | Contagem    |
| --------------- | ----------------------- | -------------------------------------------------------------------------------------------------- | ----------- |
| **Código CLI**  | `/dashboard/cli-code`   | Ferramentas de codificação que você aponta para o OmniRoute (Cliente → CLI → OmniRoute → Provedor) | 26          |
| **Agentes CLI** | `/dashboard/cli-agents` | Agentes autónomos que você aponta para o OmniRoute (mesmo fluxo, escopo mais amplo)                | 8           |
| **Agentes ACP** | `/dashboard/acp-agents` | CLIs que o OmniRoute gera como backend via stdio/ACP (fluxo reverso)                               | ver registo |

As rotas legadas redirecionam via 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Como Funciona

```
Código CLI / Agentes CLI (fluxo de consumo):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (todos apontam para o OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute direciona para o provedor correto)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

Agentes ACP (fluxo de geração reverso):
    Pedido do cliente → OmniRoute → gera CLI via stdio/ACP → resposta
```

**Benefícios:**

- Uma chave API para gerenciar todas as ferramentas
- Acompanhamento de custos em todas as CLIs no painel
- Mudança de modelo sem reconfigurar cada ferramenta
- Funciona localmente e em servidores remotos (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Auto-configurar com `setup-*`

Você não precisa escrever a configuração de cada ferramenta à mão. O OmniRoute fornece um comando `setup-*`
por CLI suportada que lê o catálogo de modelos **ao vivo** de um OmniRoute em execução (local ou remoto) e escreve a configuração da ferramenta na sua máquina:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Cada um aceita `--remote <url> --api-key <key>` (configurar uma ferramenta local contra um
OmniRoute remoto), `--dry-run` (pré-visualização sem escrita), e `--port`. Ferramentas
sem descoberta automática de modelo (Cline, Kilo, Roo, Goose, Aider, Qwen) aceitam
`--model <id>` (e `--yes` para execuções não interativas). Para lançar uma CLI com o
ambiente correto injetado e sem configuração escrita, use o lançador genérico
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen,
gemini — alvos e aliases vêm de `bin/cli/cli-manifest.mjs`); os lançadores legados
por ferramenta `omniroute launch` (Claude Code) e `omniroute launch-codex`
(Codex) permanecem disponíveis. A CLI Gemini é apenas para lançamento: é um alvo de
`omniroute run` mas não tem receita `setup-*`/`configure`.

> **Referência completa:** a tabela mestre — o que cada comando escreve, cada flag,
> local vs remoto, e quais ferramentas querem um sufixo `/v1` — está em
> **[Integrações CLI](../guides/CLI-INTEGRATIONS.md)**.

### Executando estes dentro de um contêiner

Um comando `setup-*` executado dentro do contêiner OmniRoute escreve no
próprio diretório home do contêiner, que nenhuma CLI do host lê e que desaparece com o
contêiner. O OmniRoute detecta isso e sai com `2` com instruções em vez de escrever. Duas maneiras suportadas de avançar — instalar a CLI no host e
`omniroute connect` para o contêiner, ou montar os diretórios de configuração e definir
`CLI_CONFIG_HOME` (o perfil `host` do compose). Cada comando `setup-*`, além de
`omniroute configure` e `omniroute config set`, aceita
`--allow-container-write` quando configurar as próprias CLIs do contêiner é o que você
realmente quis dizer; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` faz o mesmo para
o servidor. Veja
[Guia Docker → Configurando ferramentas CLI do host](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

O **endpoint de aplicação** do painel (`POST /api/cli-tools/apply`) impõe a
mesma proteção: em um contêiner, uma escrita cujo alvo não está montado do
host responde **`422`** com `containerEphemeralTarget: true`, o texto de erro seguro
e — para as ferramentas com uma receita de host (claude, codex, opencode, cline,
kilo, continue) — um `hostSetupCommand` (por exemplo, `omniroute setup-opencode`) para executar
no host em vez disso; nada é escrito. `dryRun: true` continua a funcionar em modo contêiner
e retorna o conteúdo gerado + caminho alvo sem tocar no disco, para que você possa pré-visualizar do painel e aplicar no host. Este comportamento é
intencional e protegido contra regressões por
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — nunca "corrija" um 422
removendo a proteção.

---

## Fonte de Verdade

O catálogo unificado vive em `src/shared/constants/cliTools.ts` como `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Cada entrada tem estes campos (definidos em `src/shared/schemas/cliCatalog.ts`):

| Campo                                           | Tipo                                                         | Descrição                                                          |
| ----------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------ |
| `category`                                      | `"code" \| "agent"`                                          | Em qual página a ferramenta aparece                                |
| `vendor`                                        | `string`                                                     | Origem da ferramenta ("Anthropic", "OSS (P. Gauthier)")            |
| `acpSpawnable`                                  | `boolean`                                                    | Também utilizável como um Agente ACP (distintivo mostrado)         |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Nível de suporte a endpoint personalizado. `"none"` = backlog MITM |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Mecanismo de configuração                                          |
| `id`, `name`, `color`, `description`, `docsUrl` | padrão                                                       | Campos de exibição principais                                      |

Entradas com `baseUrlSupport: "none"` **não são mostradas** nas páginas do painel — estão registadas no backlog MITM para o plano 11 (veja `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Níveis de Capacidade (catalogados × detectáveis × configuráveis × lançáveis)

Nem toda ferramenta catalogada é detectável, configurável ou lançável. Cada nível tem uma
fonte declarativa, e um teste de desvio mantém-nos alinhados:

| Nível            | Significado                                                                        | Declarado em                                                                    |
| ---------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Catalogado**   | Aparece no catálogo do painel (nome, fornecedor, docs, tipo de configuração)       | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                                |
| **Detectável**   | Detecção de binários/configuração, verificações de saúde, caminhos de configuração | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` catálogo em tempo de execução) |
| **Configurável** | Suportado por `omniroute configure <cli>` (receita de configuração existe)         | `bin/cli/cli-manifest.mjs` (`configure: true`)                                  |
| **Lançável**     | Suportado por `omniroute run <target>` (injeção de env/args definida)              | `bin/cli/cli-manifest.mjs` (`run: true`)                                        |

`bin/cli/cli-manifest.mjs` é o manifesto executável canónico para os comandos CLI
superfícies: `run`, `configure` e os geradores de conclusão de shell derivam suas
listas de alvos, resolução de alias (por exemplo `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
e ligação da flag `--model` a partir dele. O guardião de desvio
`tests/unit/cli/cli-manifest-drift.test.ts` afirma que o manifesto, o catálogo em tempo de execução,
o catálogo da UI e cada superfície consumidora permanecem em sincronia — um alvo adicionado a
uma superfície sem os outros falha o conjunto em vez de desviar silenciosamente.

---

## 1. Catálogo de Código CLI (26 ferramentas)

Todas as ferramentas que aparecem em `/dashboard/cli-code`. Aqueles com `baseUrlSupport: none` estão conectados através de MITM ou um guia manual em vez de uma URL base personalizada:

| id           | nome                             | fornecedor          | suporteBaseUrl | tipoConfig     | acpSpawnable |
| ------------ | -------------------------------- | ------------------- | -------------- | -------------- | ------------ |
| claude       | Claude Code                      | Anthropic           | total          | env            | true         |
| codex        | OpenAI Codex CLI                 | OpenAI              | total          | custom         | true         |
| zcode        | ZCode (Plano de Codificação GLM) | Z.ai                | nenhum         | custom         | false        |
| cline        | Cline                            | OSS (ex-Claude Dev) | total          | custom         | true         |
| kilo         | Kilo Code                        | Kilo-Org            | total          | custom         | false        |
| roo          | Roo Code                         | Roo (OSS)           | total          | guia           | false        |
| continue     | Continue                         | continue.dev        | total          | guia           | false        |
| aider        | Aider                            | OSS (P. Gauthier)   | total          | guia           | true         |
| forge        | ForgeCode                        | Antinomy HQ         | total          | custom         | true         |
| jcode        | jcode                            | 1jehuang (OSS)      | total          | custom         | false        |
| deepseek-tui | DeepSeek TUI                     | Hunter Bown (OSS)   | total          | custom         | false        |
| codewhale    | CodeWhale                        | Hmbown (OSS)        | total          | custom         | false        |
| opencode     | OpenCode                         | Anomaly (ex-SST)    | total          | guia           | true         |
| droid        | Factory Droid                    | Factory AI          | parcial        | guia           | false        |
| copilot      | GitHub Copilot CLI               | GitHub/MS           | total          | custom         | false        |
| cursor-cli   | Cursor CLI                       | Anysphere           | parcial        | guia           | true         |
| smelt        | Smelt                            | leonardcser (OSS)   | total          | custom         | false        |
| pi           | Pi (agente-pi-coding)            | M. Zechner (OSS)    | total          | custom         | false        |
| grok-build   | Grok Build                       | xAI                 | total          | custom         | false        |
| crush        | Crush                            | OSS (Charm)         | total          | custom         | false        |
| qwen         | Qwen Code                        | Alibaba             | total          | guia           | true         |
| cursor       | Cursor                           | Anysphere           | nenhum         | guia           | false        |
| antigravity  | Antigravity                      | Google              | nenhum         | mitm           | false        |
| hermes       | Hermes                           | Nous Research       | nenhum         | guia           | false        |
| kiro         | Kiro AI                          | Amazon              | nenhum         | mitm           | false        |
| custom       | Custom CLI                       | —                   | total          | custom-builder | false        |

Ferramentas com `baseUrlSupport: "parcial"` mostram um emblema "⚠ Base URL parcial" no cartão do painel.

## 2. Catálogo de Agentes CLI (8 ferramentas)

Agentes autónomos que aparecem em `/dashboard/cli-agents`:

| id           | nome             | fornecedor               | suporteBaseUrl | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Hermes Agent     | Nous Research            | total          | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | total          | true         |
| goose        | Goose            | Block / Linux Foundation | total          | true         |
| interpreter  | Open Interpreter | OSS                      | total          | true         |
| warp         | Warp AI          | Warp Inc.                | parcial        | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | total          | false        |
| omp          | Oh My Pi         | OSS                      | total          | true         |
| letta        | Letta CLI        | Letta                    | total          | false        |

---

## 3. Agentes ACP (/dashboard/acp-agents)

Esta página (renomeada de `/dashboard/agents`) mostra CLIs que o OmniRoute pode **spawn** como motores de execução backend via protocolo stdio/ACP. O catálogo é mantido separadamente em `src/lib/acp/registry.ts` e **não** é o mesmo que `CLI_TOOLS`.

---

## 4. Pendência MITM (não mostrada no dashboard)

Os seguintes CLIs não suportam URL base personalizada nativamente e **não estão listados** nas páginas de Código CLI ou Agentes CLI. Eles são candidatos à intercepção MITM no plano 11:

| CLI                 | Razão                                                             |
| ------------------- | ----------------------------------------------------------------- |
| windsurf            | BYOK limitado a selecionar modelos Claude + URL/token corporativo |
| amp                 | Ecossistema fechado (Sourcegraph)                                 |
| amazon-q / kiro-cli | Autenticação AWS SSO, sem URL personalizada                       |
| cowork              | Anthropic Desktop, sem endpoint configurável                      |

Veja `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` para a referência cruzada completa.

---

## 5. API de Detecção em Lote

Toda a deteção de ferramentas é agregada através de um único endpoint:

**`GET /api/cli-tools/all-statuses`**

- Auth: `requireCliToolsAuth(request)` (igual a outras rotas `/api/cli-tools/`)
- Retorna: `Record<toolId, ToolBatchStatus>` (tipo: `src/shared/types/cliBatchStatus.ts`)
- Estratégia: `Promise.all` sobre todas as ferramentas, timeout de 5s por ferramenta
- Cache: em memória LRU indexada pelo `mtime` do arquivo de configuração. Cache invalidado quando o `mtime` muda. Reiniciado na reinicialização do servidor.

Formato da resposta por ferramenta:

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // sanitizado, sem rastos de pilha
}
```

## 6. Manipuladores de Configurações para Novas Ferramentas

Novas ferramentas com `configType: "custom"` têm rotas API de configurações dedicadas:

| Rota                                        | Ferramenta                                                                 |
| ------------------------------------------- | -------------------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                                    |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                                    |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legado)                                     |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primário + sincronização legado `~/.deepseek`) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                                      |
| `POST /api/cli-tools/pi-settings`           | Agente de codificação Pi                                                   |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)                      |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + chave `.env` dedicada)                |

Todas as rotas usam `sanitizeErrorMessage()` para respostas de erro (Regra Rigorosa #12).

---

## 7. Arquitetura das Páginas do Dashboard

### Código CLI (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — componente do servidor
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — grid do cliente
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — página de detalhes da ferramenta
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 cartões de ferramentas especializadas + `ToolDetailClient.tsx`

### Agentes CLI (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — componente do servidor
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — grid do cliente
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — reutiliza `ToolDetailClient`

### Agentes ACP (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — componente do servidor (movido de `agents/`)

### Componentes de UI Compartilhados (`src/shared/components/cli/`)

| Ficheiro                | Propósito                                                         |
| ----------------------- | ----------------------------------------------------------------- |
| `CliToolCard.tsx`       | Cartão de status inteligente (detecção + configuração + endpoint) |
| `CliConceptCard.tsx`    | Cartão de explicação de conceito por página                       |
| `CliComparisonCard.tsx` | Comparação em três colunas entre tipos de CLI                     |
| `BaseUrlSelect.tsx`     | Dropdown de endpoint (Local/Nuvem/Personalizado)                  |
| `ApiKeySelect.tsx`      | Seletor de chave API                                              |
| `ManualConfigModal.tsx` | Modal de snippet de configuração copiável                         |

### Hook Compartilhado (`src/shared/hooks/cli/`)

| Ficheiro                  | Propósito                                                                        |
| ------------------------- | -------------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Busca `/api/cli-tools/all-statuses`, gerencia estado de carregamento/atualização |

## 8. i18n

Novos namespaces adicionados no plano 14 F9:

| Namespace   | Propósito                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------ |
| `cliCommon` | Strings partilhadas (rótulos de cartões, textos de conceito/comparação, rótulos de página de detalhes) |
| `cliCode`   | Strings da página do Código CLI                                                                        |
| `cliAgents` | Strings da página de Agentes CLI                                                                       |
| `acpAgents` | Strings da página de Agentes ACP                                                                       |

Traduções completas em PT-BR e EN estão disponíveis. 39 outros locais recorrem automaticamente ao EN através da fusão a nível de namespace em `src/i18n/request.ts`.

---

## 9. Início Rápido

### Passo 1 — Obter uma Chave de API do OmniRoute

1. Abra `/dashboard/api-manager` → **Criar Chave de API**
2. Dê-lhe um nome (por exemplo, `cli-tools`) e selecione todas as permissões
3. Copie a chave — você precisará dela para cada CLI abaixo

> Sua chave parece: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Passo 2 — Instalar Ferramentas CLI

Todas as ferramentas baseadas em npm requerem Node.js 22.22.2+ ou 24.x:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI (lançável via `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Baseado em Rust

# Agente de codificação Pi
# veja https://github.com/zechnerj/pi-coding-agent para instalação

# jcode
# veja https://github.com/1jehuang/jcode para instalação
```

---

### Passo 3 — Configurar via Painel

1. Vá para `http://localhost:20128/dashboard/cli-code`
2. Encontre sua ferramenta na grelha
3. Clique no cartão para abrir a página de detalhes da ferramenta
4. Selecione sua chave de API e URL base
5. Clique em **Aplicar Configuração** ou copie o trecho de configuração manual

---

### Passo 4 — Definir Variáveis de Ambiente Globais

```bash
# Ponto de Extremidade Universal do OmniRoute
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# O CLI Gemini lê GOOGLE_GEMINI_BASE_URL na RAIZ (seu SDK anexa /v1beta/... automaticamente)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Para um **servidor remoto**, substitua `localhost:20128` pelo IP ou domínio do servidor,
> por exemplo, `http://<your-server-ip>:20128`.

---

### Passo 4 — Configurar Cada Ferramenta

#### Claude Code

```bash
# Crie ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Use a raiz do gateway unificado da Anthropic para o Claude Code. Não anexe `/v1` aqui.

**Teste:** `claude "say hello"`

---

#### OpenAI Codex

O Codex moderno (v0.137+) lê `~/.codex/config.toml` apenas — o antigo
`config.yaml` pertence ao CLI npm legado e é ignorado silenciosamente. A chave da API
permanece na variável de ambiente `OMNIROUTE_API_KEY` (`env_key`), nunca
dentro do arquivo:

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

Referência completa (perfis, `wire_api`, janelas de contexto): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Teste:** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**Teste:** `opencode`

> Use `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> para enviar variantes de pensamento.

---

#### Cline (CLI ou VS Code)

**Modo CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**Modo VS Code:**
Configurações da extensão Cline → Provedor de API: `OpenAI Compatible` → URL Base: `http://localhost:20128/v1`

Ou use o painel do OmniRoute → **CLI Tools → Cline → Aplicar Configuração**.

---

#### KiloCode (CLI ou VS Code)

**Modo CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Configurações do VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Ou use o painel do OmniRoute → **CLI Tools → KiloCode → Aplicar Configuração**.

---

#### Continue (Extensão do VS Code)

Edite `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Reinicie o VS Code após editar.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Use isto quando o VS Code Insiders estiver configurado para modelos de endpoint personalizados e você quiser que o OmniRoute funcione sem um campo de cabeçalho personalizado.

**Localização recomendada:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Exemplo usando o alias tokenizado do OmniRoute:**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**Notas:**

- Substitua `sk-your-omniroute-key` por uma chave de API criada no OmniRoute.
- O campo `url` deve apontar para `/api/v1/vscode/{token}/chat/completions`.
- O campo `modelsUrl` deve apontar para `/api/v1/vscode/{token}/models`.
- Prefira o fluxo normal `/v1` + cabeçalho Bearer quando o cliente suportar cabeçalhos personalizados.
- Tokens incorporados na URL são uma solução de compatibilidade e podem aparecer nos logs do editor ou no histórico do proxy.

---

#### Kiro CLI (Amazon)

```bash
# Faça login na sua conta AWS/Kiro:
kiro-cli login

# O CLI usa sua própria autenticação — o OmniRoute não é necessário como backend para o Kiro CLI em si.
# Use kiro-cli juntamente com o OmniRoute para outras ferramentas.
kiro-cli status
```

Para o aplicativo desktop **Kiro IDE**, use o endpoint MITM exposto pelo OmniRoute
sob `/dashboard/cli-tools → Kiro`.

---

## 10. OmniRoute CLI Interno

O binário `omniroute` fornece comandos para o ciclo de vida do servidor, configuração, diagnósticos e gestão de provedores. Ponto de entrada: `bin/omniroute.mjs`.

```bash
omniroute                              # Iniciar servidor (porta padrão 20128)
omniroute setup                        # Assistente de configuração interativo
omniroute doctor                       # Verificar configuração, DB, portas, runtime
omniroute providers list               # Conexões de provedores configurados
omniroute providers test-all           # Testar todas as conexões ativas
omniroute reset-password               # Redefinir a senha do administrador
omniroute logs                         # Transmitir logs de requisições
omniroute health                       # Saúde detalhada (disjuntores, cache, memória)
omniroute --version                    # Imprimir versão
omniroute --help                       # Mostrar todos os comandos
```

### Configuração e Inicialização

```bash
omniroute setup                        # Assistente de configuração interativo
omniroute setup --non-interactive      # Modo CI/automação (lê variáveis de ambiente + flags)
omniroute setup --password '<value>'   # Definir a senha do administrador diretamente
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Adicionar e testar um provedor de uma só vez
```

Variáveis de ambiente reconhecidas para configuração não interativa:

| Var                 | Propósito                                                              |
| ------------------- | ---------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | Chave API do provedor (vinculada a `--api-key` via Commander `.env()`) |
| `DATA_DIR`          | Substituir o diretório de dados do OmniRoute                           |

Todas as outras entradas não interativas são passadas como flags, não variáveis de ambiente:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(veja as opções `omniroute setup` acima).

### Diagnósticos

```bash
omniroute doctor                       # Verificar configuração, DB, portas, runtime, memória, vivacidade
omniroute doctor --json                # JSON legível por máquina
omniroute doctor --no-liveness         # Ignorar a verificação de saúde HTTP
omniroute doctor --host 0.0.0.0        # Substituir o host de vivacidade
omniroute doctor --liveness-url <url>  # Substituição da URL do endpoint de saúde completo
```

O comando doctor executa estas verificações: `Configuração`, `Banco de Dados`, `Armazenamento/encriptação`,
`Disponibilidade de Portas`, `Runtime do Node`, `Binário nativo` (better-sqlite3),
`Memória`, e `Vivacidade do Servidor`. Ele sai com um código diferente de zero se qualquer verificação falhar.

### Gestão de Provedores

```bash
omniroute providers available                       # Catálogo de provedores do OmniRoute
omniroute providers available --search openai       # Filtrar catálogo por id/nome/alias/categoria
omniroute providers available --category api-key    # Filtrar por categoria (api-key, oauth, free, ...)
omniroute providers available --json                # JSON legível por máquina

omniroute providers list                            # Conexões de provedores configurados
omniroute providers list --json

omniroute providers test <id|name>                  # Testar uma conexão configurada
omniroute providers test-all                        # Testar todas as conexões ativas
omniroute providers validate                        # Validação estrutural apenas local
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Fluxo OAuth existente
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` são API-first e, portanto, funcionam contra
o contexto local ou remoto ativo. A entrada de credenciais deve usar
`--credential-stdin` ou `--credential-env`; `--dry-run --json` relata apenas
a presença/formato redigido. `providers available` lê o catálogo do OmniRoute;
`providers list/test/test-all/validate` mantêm seu comportamento local SQLite e
não requerem que o servidor esteja em execução.

### Recuperação e Redefinição

```bash
omniroute reset-password                # Redefinir a senha do administrador (também: omniroute-reset-password)
omniroute reset-encrypted-columns       # Mostrar aviso + execução simulada para redefinição de credenciais encriptadas
omniroute reset-encrypted-columns --force  # Na verdade, anular credenciais encriptadas no SQLite
```

### Exportação de Credenciais (⚠ manusear com cuidado)

```bash
omniroute auth export                                 # Mostrar aviso + porta de confirmação — sem acesso ao DB
omniroute auth export --force                          # Exportar TODAS as credenciais DESENCRIPTADAS das conexões para stdout como JSON
omniroute auth export --force --id <id>                 # Exportar apenas a conexão correspondente
omniroute auth export --force --format env               # Emitir linhas OMNIROUTE_<PROVIDER>_<FIELD>=<value>
omniroute auth export --force --out creds.json           # Escrever em um arquivo (criado com permissões 0600)
```

`auth export` é **apenas local** (leitura direta do SQLite, sem rota HTTP) e intencionalmente imprime/grava
valores **em texto simples** `apiKey`/`accessToken`/`refreshToken`/`idToken` — essa é a funcionalidade, não um
bug. Nada é lido do banco de dados, e nada é desencriptado, sem `--force`. Um banner de aviso stderr
sempre é impresso antes de qualquer texto simples ser emitido. Requer que `STORAGE_ENCRYPTION_KEY` esteja
definido. Um campo que falha ao desencriptar (chave obsoleta, texto cifrado corrompido) é relatado como
`<field>DecryptFailed: true` em vez de abortar toda a exportação ou vazar o erro subjacente.

### Outros subcomandos

Estes assumem um servidor OmniRoute em execução, a menos que indicado de outra forma:

```bash
omniroute status                       # Status abrangente em tempo de execução
omniroute logs                         # Transmitir logs de requisições (--json, --search, --follow)
omniroute config show                  # Exibir configuração atual

omniroute provider list                # Listar provedores disponíveis (alias de providers list)
omniroute provider add                 # Registrar o OmniRoute como um provedor em uma ferramenta
omniroute keys add | list | remove     # Gerir chaves API
omniroute models [provider]            # Listar modelos (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Captura de configuração + DB
omniroute restore                      # Restaurar de uma captura anterior

omniroute health                       # Saúde detalhada (disjuntores, cache, memória)
omniroute quota                        # Uso de quota do provedor
omniroute cache                        # Status do cache
omniroute cache clear                  # Limpar caches semânticos + de assinatura

omniroute mcp status | restart         # Status do servidor MCP / reiniciar
omniroute a2a status | card            # Status do servidor A2A / cartão do agente

omniroute tunnel list | create | stop  # Gerir túneis (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Inspecionar / definir variáveis de ambiente (temporárias)

omniroute test                         # Teste de conectividade do provedor
omniroute update                       # Verificar atualizações
omniroute completion                   # Gerar conclusão de shell
```

### Flags Comuns

| Flag                | Descrição                                                |
| ------------------- | -------------------------------------------------------- |
| `--no-open`         | Não abrir automaticamente o navegador ao iniciar         |
| `--port <n>`        | Substituir a porta da API (padrão 20128)                 |
| `--mcp`             | Executar como servidor MCP sobre stdio (para IDEs)       |
| `--non-interactive` | Modo CI (sem prompts; lê de env/flags)                   |
| `--json`            | Saída JSON legível por máquina (doctor, providers, etc.) |
| `--help`, `-h`      | Mostrar ajuda específica do comando                      |
| `--version`, `-v`   | Imprimir a versão instalada                              |

## Endpoints da API Disponíveis

| Endpoint                   | Descrição                         | Usar Para                                 |
| -------------------------- | --------------------------------- | ----------------------------------------- |
| `/v1/chat/completions`     | Chat padrão (todos os provedores) | Todas as ferramentas modernas             |
| `/v1/responses`            | API de respostas (formato OpenAI) | Codex, fluxos de trabalho agenticos       |
| `/v1/completions`          | Completações de texto legadas     | Ferramentas mais antigas usando `prompt:` |
| `/v1/embeddings`           | Embeddings de texto               | RAG, pesquisa                             |
| `/v1/images/generations`   | Geração de imagens                | GPT-Image, Flux, etc.                     |
| `/v1/audio/speech`         | Texto para fala                   | ElevenLabs, OpenAI TTS                    |
| `/v1/audio/transcriptions` | Fala para texto                   | Deepgram, AssemblyAI                      |

Exemplos prontos para colar com uma URL OmniRoute tokenizada:

```txt
Exemplo de token: sk-a3ab3c080beaee3a-69f4a4-070d71af

Base padrão OpenAI: http://localhost:20128/v1
Modelos VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
Chat VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
Respostas VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Tags Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Chat Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Resolução de Problemas

| Erro                                           | Causa                                  | Solução                                                          |
| ---------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------- |
| `Connection refused`                           | OmniRoute não está a correr            | `omniroute serve`                                                |
| `401 Unauthorized`                             | Chave API errada                       | Verifique em `/dashboard/api-manager`                            |
| `No combo configured`                          | Nenhuma combinação de roteamento ativa | Configure em `/dashboard/combos`                                 |
| CLI mostra "not installed"                     | Binário não está no PATH               | Verifique `which <command>`                                      |
| O painel mostra "not detected" após instalação | Cache desatualizado                    | Clique em "⟳ Atualizar deteção" no painel                        |
| Link antigo `/dashboard/cli-tools`             | Favorito pré-v3.8.6                    | Redirecionado automaticamente para `/dashboard/cli-code` (308)   |
| Link antigo `/dashboard/agents`                | Favorito pré-v3.8.6                    | Redirecionado automaticamente para `/dashboard/acp-agents` (308) |
