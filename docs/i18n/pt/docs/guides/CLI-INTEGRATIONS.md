# CLI-INTEGRATIONS (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "Integrações CLI — aponte qualquer CLI de codificação para o OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Integrações CLI

O OmniRoute fornece uma família de comandos `setup-*` que configuram uma CLI de codificação (Codex, Claude Code, OpenCode, Cline, …) para usar o OmniRoute como seu backend — assim, a ferramenta comunica-se com **um** endpoint e o OmniRoute direciona para o provedor certo com fallback automático. Cada comando lê o catálogo de modelos **ao vivo** de um OmniRoute em execução (local ou remoto) e escreve o próprio arquivo de configuração da ferramenta na **sua** máquina. A chave da API é referenciada por uma variável de ambiente sempre que a ferramenta a suporta. Comandos que persistem um arquivo de ambiente local da ferramenta estão anotados abaixo.

Há também um lançador genérico — `omniroute run <target>` — que inicia `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` ou `gemini` com o ambiente correto injetado, sem escrever nenhuma configuração. Os alvos e seus aliases vêm do manifesto canônico `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), e `omniroute completion` oferece as mesmas palavras-alvo derivadas do manifesto. Os lançadores legados por ferramenta — `omniroute launch` (Claude Code) e `omniroute launch-codex` (Codex) — permanecem disponíveis.

A integração de provedores está disponível a partir do mesmo contexto local/remoto. Os comandos API-first abaixo mantêm a autenticação de gerenciamento separada das credenciais do provedor e nunca imprimem uma credencial na saída estruturada:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Para scripts, prefira `--credential-stdin` ou `--credential-env`; `--credential` é mantido para uso local controlado. `providers remove` requer `--yes` em um terminal não interativo, e todos os cinco comandos respeitam o contexto ativo ou as opções globais `--base-url`/`--api-key`.

Para a configuração base única e escrita à mão das duas integrações mais ricas, consulte as análises detalhadas por ferramenta:

- [Configuração do Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Configuração do Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Modo Remoto](./REMOTE-MODE.md) — controle um OmniRoute remoto (VPS / Tailnet) a partir do seu laptop
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — a extensão OmniCopilot; ela também pode executar esses
  comandos `setup-*` para você a partir dentro do editor

---

## Tabela mestre

Cada comando respeita o **contexto ativo** (definido com `omniroute connect`, veja
[Modo Remoto](./REMOTE-MODE.md)) ou as flags explícitas `--remote <url> --api-key <key>`.
"Local vs remoto" abaixo significa: sem flags, o alvo é `http://localhost:20128`;
com `--remote` (ou um contexto remoto ativo), ele busca o catálogo daquele
servidor e escreve a configuração localmente.

| Comando                    | Ferramenta                                 | O que escreve                                                                                                                                                      | Principais flags                                                                                                                           | Local vs remoto |
| -------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                           | `~/.codex/<name>.config.toml` — um perfil por modelo de texto compatível (`codex --profile <name>`)                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Ambos           |
| `omniroute setup-claude`   | Claude Code                                | `~/.claude/profiles/<name>/settings.json` — um perfil por modelo correspondente (`CLAUDE_CONFIG_DIR`)                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Ambos           |
| `omniroute setup-opencode` | OpenCode (compatível com openai)           | `~/.config/opencode/opencode.json` — provedor `omniroute` com cada modelo do catálogo (`opencode -m omniroute/<model>`)                                            | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Ambos           |
| `omniroute setup-cline`    | Cline                                      | `~/.cline/data/{globalState,secrets}.json` (modo CLI) + imprime configurações da extensão do VS Code                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Ambos           |
| `omniroute setup-kilo`     | Kilo Code                                  | `~/.local/share/kilo/auth.json` (CLI) + mescla `kilocode.*` nas configurações do VS Code `settings.json` se presente                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Ambos           |
| `omniroute setup-continue` | Continue / `cn` CLI                        | `~/.continue/config.yaml` — modelos `provider: openai`, chave via `${{ secrets.OMNIROUTE_API_KEY }}`                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Ambos           |
| `omniroute setup-cursor`   | Cursor                                     | Nada — imprime os passos no aplicativo (a configuração do Cursor é opaca em SQLite)                                                                                | `--remote` `--api-key` `--only` `--port`                                                                                                   | Ambos           |
| `omniroute setup-roo`      | Roo Code                                   | `~/.omniroute/roo-settings.json` (importar doc) + define `roo-cline.autoImportSettingsPath` se um `settings.json` do VS Code existir                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Ambos           |
| `omniroute setup-crush`    | Crush                                      | `~/.config/crush/crush.json` — provedor `openai-compat`, chave via `$OMNIROUTE_API_KEY`                                                                            | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Ambos           |
| `omniroute setup-goose`    | Goose                                      | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + imprime receita de ambiente                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ambos           |
| `omniroute setup-aider`    | Aider                                      | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + imprime receita de ambiente                                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ambos           |
| `omniroute setup-qwen`     | Qwen Code                                  | `~/.qwen/settings.json` — array `modelProviders.openai` V4 + `OMNIROUTE_API_KEY` em `~/.qwen/.env`                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Ambos           |
| `omniroute run <target>`   | Lançamento em tempo de execução (genérico) | Nada — inicia `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` com o ambiente e argumentos corretos; Qwen e Gemini usam um diretório isolado temporário | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Ambos           |
| `omniroute launch`         | Claude Code                                | Nada — inicia `claude` com `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` injetados                                                                                   | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Ambos           |
| `omniroute launch-codex`   | OpenAI Codex CLI                           | Nada — inicia `codex` com o provedor `omniroute` injetado via flags `-c`                                                                                           | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Ambos           |

Notas sobre as flags (verificadas na fonte do comando):

- `--remote <url>` — busca o catálogo de um OmniRoute remoto (substitui `--port`
  e o contexto ativo). `--api-key <key>` fornece a credencial para aquele
  servidor (padrão para a variável de ambiente `OMNIROUTE_API_KEY`, ou o token do contexto ativo).
- `--only <patterns>` — substrings separadas por vírgula; mantém apenas os IDs de modelo que correspondem
  (por exemplo, `--only glm,kimi`). Disponível em `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — imprime exatamente o que seria escrito sem tocar no
  sistema de arquivos. Disponível em todos os comandos `setup-*` **exceto** `setup-cursor`
  (que nunca escreve um arquivo).
- `--model <id>` — necessário (ou escolhido interativamente) para as ferramentas que não têm
  descoberta automática de modelo: Cline, Kilo, Roo, Goose, Qwen, Aider. Essas ferramentas
  também aceitam `--yes` para execuções não interativas (que então requerem `--model`).
  `setup-opencode` aceita `--model` para definir o modelo padrão de nível superior.
- `--model <id>` em `omniroute run` segue a fiação por alvo do manifesto
  (`bin/cli/cli-manifest.mjs`): **aider** recebe `--model openai/<id>` e
  **opencode** `--model omniroute/<id>` (o prefixo é adicionado apenas quando o id
  não o possui); **qwen** e **gemini** recebem o id verbatim;
  **claude** recebe via `ANTHROPIC_MODEL`, **goose** via `GOOSE_MODEL`, e
  **codex** via argumentos `-c model_providers.omniroute.*`. **Qwen é o único alvo de execução
  que requer obrigatoriamente `--model`** — `omniroute run qwen` sem ele sai
  `2` com um erro explícito.
- `--port <port>` — porta local do OmniRoute (padrão `20128`, ignorada quando `--remote`
  está definido). Presente em todos os `setup-*` e ambos os lançadores.
- Códigos de saída de `omniroute run`: o próprio código de saída da CLI filha é propagado
  verbatim; `2` = argumentos inválidos (alvo não suportado, `--model` obrigatório ausente, guardião de contêiner); `127` = o binário alvo não está no `PATH`;
  `130`/`143`/`129` quando o lançamento é encerrado por `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = outra falha de lançamento em tempo de execução.
- Os dois lançadores (`launch`, `launch-codex`) aceitam `--profile <name>` para selecionar
  um perfil escrito por `setup-claude` / `setup-codex`, além de argumentos pass-through para
  o binário subjacente `claude` / `codex`.

O seletor interativo também é compartilhado pelas receitas de configuração:

```bash
# Escolha a partir do catálogo de modelos local ou remoto ativo e configure o alvo.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` atualmente delega para as receitas testadas para `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, e `kilo`. Entradas de catálogo apenas para IDE,
MITM, e apenas guias permanecem como fluxos explícitos `setup-*`/manuais e não são apresentadas como alvos lançáveis.

> `setup-opencode` é a integração **leve compatível com openai** do OpenCode.
> Há também uma integração de plugin mais rica — `omniroute setup opencode` — que
> instala `@omniroute/opencode-plugin`. Eles são comandos diferentes; a tabela
> acima documenta `setup-opencode`.

---

## Uso local

Com o OmniRoute a correr em `localhost:20128`, basta executar o comando de configuração para a sua ferramenta. O catálogo é buscado no servidor local.

```bash
# Codex: escreve um perfil por modelo correspondente em ~/.codex/
omniroute setup-codex
codex --profile glm52            # usa um perfil gerado

# Claude Code: escreve perfis por modelo, depois inicia um
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: escreve o fornecedor compatível com openai com todos os modelos do catálogo
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # referenciado via {env:OMNIROUTE_API_KEY}, nunca em disco
opencode -m omniroute/glm/glm-5.2 "..."

# Ferramentas sem auto-descoberta precisam de um modelo explícito:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Pré-visualização sem escrever nada:
omniroute setup-continue --dry-run
```

Inicie sem escrever qualquer configuração (apenas injeção de ambiente):

```bash
omniroute launch                 # Claude Code → OmniRoute local
omniroute launch-codex           # Codex CLI → OmniRoute local
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "resposta OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "resposta OK"
omniroute run qwen --model glm/glm-5.2 -- -p "resposta OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "resposta OK"

# Caminho de comando explícito: passe tudo o que vem depois de --
omniroute run claude -- --print-system-prompt "revise este diff"
```

---

## Uso remoto

Aponte qualquer comando de configuração para um OmniRoute remoto com `--remote` + `--api-key`. O catálogo é buscado remotamente; a configuração é escrita na sua máquina local.

```bash
# OpenCode contra um VPS remoto, mantenha apenas os modelos glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # exporte OMNIROUTE_API_KEY primeiro

# Perfis Codex de um catálogo remoto
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Inicie um CLI diretamente contra o remoto
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Em vez de passar `--remote`/`--api-key` todas as vezes, faça login uma vez e deixe o **contexto ativo** fornecê-los automaticamente:

```bash
omniroute connect 192.168.0.15        # gera um token com escopo, armazena o contexto
omniroute setup-codex                 # ← agora usa o catálogo remoto
omniroute setup-opencode              # ← o mesmo
omniroute launch                      # ← Claude Code contra o remoto
```

Veja [Modo Remoto](./REMOTE-MODE.md) para contextos, escopos e gestão de tokens.

---

## Convenções de URL base (quais ferramentas querem `/v1`)

O OmniRoute expõe a superfície OpenAI em `/v1`, a superfície Anthropic na raiz, e uma superfície nativa Gemini em `/v1beta`. Cada integração está ligada à forma que a sua ferramenta espera (verificado na fonte do comando):

| Integração                                                                 | URL base escrita | `/v1`?                                     |
| -------------------------------------------------------------------------- | ---------------- | ------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | raiz             | Não — Cline anexa `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | raiz             | Não — Goose anexa o caminho                |
| `setup-aider` (`OPENAI_API_BASE`)                                          | raiz             | Não — LiteLLM anexa `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | com `/v1`        | Sim                                        |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | raiz             | Não — Claude Code anexa `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | com `/v1`        | Sim                                        |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | com `/v1`        | Sim                                        |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | raiz             | Não — o SDK anexa `/v1beta/models/…`       |

---

## Manter dependências nativas na atualização: `--include=optional`

Quando você atualiza com `omniroute update` (após confirmar, ou com `--apply`),
o OmniRoute executa a instalação com `--include=optional` incorporado:

```bash
npm install -g omniroute@latest --include=optional
```

Este **não** é um parâmetro que você passa para `omniroute update` — ele é sempre aplicado pelo
atualizador. Isso garante que as `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, a pilha LLMLingua SLM) sobrevivam à atualização, mesmo que sua configuração npm
tenha `omit=optional` definido, o que, de outra forma, eliminaria silenciosamente o driver SQLite
nativo e a ligação ao keyring do SO. Para visualizar o comando exato sem aplicar:

```bash
omniroute update --dry-run
# [DRY RUN] Executaria: npm install -g omniroute@latest --include=optional
```

Outros parâmetros de `omniroute update` (verificados no código-fonte): `--check` (sai com 1 se
desatualizado), `--apply` (instala sem solicitar), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI via `omniroute run gemini`

Contrato verificado contra `@google/gemini-cli` 0.50.0: a CLI respeita
`GOOGLE_GEMINI_BASE_URL` e emite `POST /v1beta/models/<model>:generateContent`
(e `:streamGenerateContent?alt=sse`) contra ele — exatamente a superfície nativa
Gemini do OmniRoute (`/v1beta`). `omniroute run gemini` conecta isso automaticamente:

- `GOOGLE_GEMINI_BASE_URL` → a URL base ativa do OmniRoute (raiz, sem `/v1`);
- `GEMINI_API_KEY` → a credencial resolvida do OmniRoute (opção/env/contexto);
- um **`GEMINI_CLI_HOME` isolado temporário** cujo `.gemini/settings.json`
  seleciona a autenticação `gemini-api-key`, de modo que uma sessão OAuth do Google armazenada (Code Assist)
  nunca sobrescreva o lançamento direcionado pelo OmniRoute — removido após a saída;
- **higiene do env**: o ambiente filho é limpo de `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` e `GOOGLE_GENAI_USE_GCA` (que redirecionariam
  a autenticação para Vertex/Code Assist), e `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` é
  definido como uma rede de segurança — os outros alvos de `run` recebem o mesmo
  tratamento para suas próprias variáveis conflitantes;
- injeção de `--model <id>` a partir de `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

O guardião de confiança do espaço de trabalho do Gemini ainda se aplica em modo headless — passe
`--skip-trust` (ou confie no diretório interativamente) você mesmo; o lançador
deliberadamente não o ignora. Este lançador é distinto do **registro ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), que permanece a
integração do protocolo do agente para `/dashboard/acp-agents`.

---

## Varredura real de fumaça (opcional)

Execuções de regressão do plano de lançamento determinístico em CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Para validar os binários REAIS contra um servidor REAL
do OmniRoute, existe um suporte opcional em
`tests/integration/upstream-cli-smoke.int.test.ts`. Ele nunca é executado automaticamente
(cada sub-teste é ignorado a menos que `RUN_CLI_SMOKE=1`), passa a credencial por variável de ambiente
NOME (nunca por valor), redige strings em formato de chave de qualquer saída gravada, ignora
alvos cujo binário não está instalado, e classifica falhas como
auth / upstream / config em vez de um booleano simples:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opcional: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` restringe a varredura;
`OMNIROUTE_SMOKE_TIMEOUT_MS` substitui o tempo limite de 120s por alvo.

---

## Veja também

- [Configuração do Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — o guia mais aprofundado do Claude Code
- [Configuração do Codex CLI](./CODEX-CLI-CONFIGURATION.md) — a configuração base única `[model_providers.omniroute]`
- [Modo Remoto](./REMOTE-MODE.md) — contextos, tokens de acesso com escopo, controlo de um servidor remoto
- [Referência de Ferramentas CLI](../reference/CLI-TOOLS.md) — o catálogo completo de ferramentas suportadas + páginas do painel
- [Guia de Configuração](./SETUP_GUIDE.md) — métodos de instalação e integração inicial
