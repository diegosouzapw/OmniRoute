# CLI Integrations (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute fornece uma família de comandos `setup-*` que configuram uma CLI de codificação (Codex, Claude Code, OpenCode, Cline, …) para usar o OmniRoute como seu backend — assim a ferramenta se comunica com **um** único endpoint e o OmniRoute roteia para o provedor correto com fallback automático. Cada comando lê o catálogo de modelos **ao vivo** de um OmniRoute em execução (local ou remoto) e escreve o arquivo de configuração da própria ferramenta na **sua** máquina. A chave de API é referenciada por uma variável de ambiente onde quer que a ferramenta suporte. Comandos que persistem um arquivo de ambiente local da ferramenta são indicados abaixo.

Há também um lançador genérico — `omniroute run <target>` — que inicia `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` ou `gemini` com o ambiente correto injetado, sem escrever nenhuma configuração. Os alvos e seus aliases vêm do manifesto canônico `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), e `omniroute completion` oferece as mesmas palavras-alvo derivadas do manifesto. Os lançadores legados por ferramenta — `omniroute launch` (Claude Code) e `omniroute launch-codex` (Codex) — permanecem disponíveis.

O onboarding de provedores está disponível a partir do mesmo contexto local/remoto. Os comandos API-first abaixo mantêm a autenticação de gerenciamento separada das credenciais do provedor e nunca imprimem uma credencial em saída estruturada:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Para scripts, prefira `--credential-stdin` ou `--credential-env`; `--credential` é mantido para uso local controlado. `providers remove` requer `--yes` em um terminal não interativo, e todos os cinco comandos respeitam o contexto ativo ou as opções globais `--base-url`/`--api-key`.

Os seletores de provedor rejeitam prefixos de ID, nomes ou nomes de provedor ambíguos; use um ID de conexão completo quando várias conexões corresponderem. Os comandos de criação e edição leem a conexão salva de volta, e a remoção verifica se ela não é mais legível. Uma importação ignora um par provedor/nome existente. Entradas importadas não podem sobrescrever o endpoint de gerenciamento, contexto ou credenciais de gerenciamento fornecidos à CLI.

Para a configuração base única e manual das duas integrações mais ricas, consulte os aprofundamentos por ferramenta:

- [Configuração do Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Configuração do Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Modo Remoto](./REMOTE-MODE.md) — controle um OmniRoute remoto (VPS / Tailnet) do seu laptop
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — a extensão OmniCopilot; ela também pode executar esses comandos `setup-*` para você de dentro do editor

---

## Tabela principal

Cada comando respeita o **contexto ativo** (definido com `omniroute connect`;
consulte [Modo Remoto](./REMOTE-MODE.md)) ou os sinalizadores explícitos
`--remote <url> --api-key <key>`. "Local versus remoto" abaixo significa: sem
sinalizadores, o destino é `http://localhost:20128`; com `--remote` (ou um
contexto remoto ativo), o catálogo é obtido desse servidor e a configuração é
gravada localmente.

| Comando                    | Ferramenta                               | O que grava                                                                                                                                                                     | Flags principais                                                                                                                           | Local vs. remoto |
| -------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                         | `~/.codex/<name>.config.toml` — um perfil por modelo de texto compatível (`codex --profile <name>`)                                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Ambos            |
| `omniroute setup-claude`   | Claude Code                              | `~/.claude/profiles/<name>/settings.json` — um perfil por modelo correspondente (`CLAUDE_CONFIG_DIR`)                                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Ambos            |
| `omniroute setup-opencode` | OpenCode (compatível com OpenAI)         | `~/.config/opencode/opencode.json` — provedor `omniroute` com todos os modelos do catálogo (`opencode -m omniroute/<model>`)                                                    | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Ambos            |
| `omniroute setup-cline`    | Cline                                    | `~/.cline/data/{globalState,secrets}.json` (modo CLI) + exibe as configurações da extensão do VS Code                                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Ambos            |
| `omniroute setup-kilo`     | Kilo Code                                | `~/.local/share/kilo/auth.json` (CLI) + mescla `kilocode.*` no `settings.json` do VS Code, se presente                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Ambos            |
| `omniroute setup-continue` | Continue / CLI `cn`                      | `~/.continue/config.yaml` — modelos com `provider: openai`, chave via `${{ secrets.OMNIROUTE_API_KEY }}`                                                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Ambos            |
| `omniroute setup-cursor`   | Cursor                                   | Nada — exibe as etapas a serem realizadas no aplicativo (a configuração do Cursor é um SQLite opaco)                                                                            | `--remote` `--api-key` `--only` `--port`                                                                                                   | Ambos            |
| `omniroute setup-roo`      | Roo Code                                 | `~/.omniroute/roo-settings.json` (documento de importação) + define `roo-cline.autoImportSettingsPath` se existir um `settings.json` do VS Code                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Ambos            |
| `omniroute setup-crush`    | Crush                                    | `~/.config/crush/crush.json` — provedor `openai-compat`, chave via `$OMNIROUTE_API_KEY`                                                                                         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Ambos            |
| `omniroute setup-goose`    | Goose                                    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + exibe instruções para configurar o ambiente                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ambos            |
| `omniroute setup-aider`    | Aider                                    | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + exibe instruções para configurar o ambiente                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ambos            |
| `omniroute setup-qwen`     | Qwen Code                                | `~/.qwen/settings.json` — array V4 `modelProviders.openai` + `OMNIROUTE_API_KEY` em `~/.qwen/.env`                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Ambos            |
| `omniroute setup-5dive`    | 5dive (frota de agentes)                 | Nada em `$HOME` — grava um **perfil de autenticação** do 5dive (`/var/lib/5dive/auth-profiles/<name>/`) via `5dive agent auth set`; somente root, executado no host da frota    | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Ambos            |
| `omniroute run <target>`   | Execução em tempo de execução (genérica) | Nada — inicia `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` com o ambiente e os argumentos corretos; Qwen e Gemini usam um diretório inicial temporário e isolado | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Ambos            |
| `omniroute launch`         | Claude Code                              | Nada — inicia `claude` com `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` injetados                                                                                                | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Ambos            |
| `omniroute launch-codex`   | OpenAI Codex CLI                         | Nada — inicia `codex` com o provedor `omniroute` injetado por meio de flags `-c`                                                                                                | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Ambos            |

Observações sobre as opções (verificadas no código-fonte do comando):

- `--remote <url>` — busca o catálogo em um OmniRoute remoto (substitui `--port`
  e o contexto ativo). `--api-key <key>` fornece a credencial para esse
  servidor (o padrão é a variável de ambiente `OMNIROUTE_API_KEY` ou o token do contexto ativo).
- `--only <patterns>` — substrings separadas por vírgulas; mantém apenas os IDs de modelos correspondentes
  (por exemplo, `--only glm,kimi`). Disponível em `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — exibe exatamente o que seria gravado sem alterar o
  sistema de arquivos. Disponível em todos os comandos `setup-*`, **exceto** `setup-cursor`
  (que nunca grava um arquivo).
- `--model <id>` — obrigatório (ou selecionado interativamente) para as ferramentas que não têm
  descoberta automática de modelos: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Essas ferramentas
  também aceitam `--yes` para execuções não interativas (o que exige `--model`).
  `setup-opencode` aceita `--model` para definir o modelo padrão de nível superior.
- `--model <id>` em `omniroute run` segue a configuração por destino do manifesto
  (`bin/cli/cli-manifest.mjs`): **aider** recebe `--model openai/<id>` e
  **opencode**, `--model omniroute/<id>` (o prefixo é adicionado apenas quando o ID
  ainda não o contém); **qwen** e **gemini** recebem o ID literalmente;
  **claude** o recebe via `ANTHROPIC_MODEL`, **goose** via `GOOSE_MODEL` e
  **codex** via argumentos `-c model_providers.omniroute.*`. **Qwen é o único destino de execução
  que exige obrigatoriamente `--model`** — `omniroute run qwen` sem essa opção encerra
  com o código `2` e um erro explícito.
- `--port <port>` — porta local do OmniRoute (padrão `20128`, ignorada quando `--remote`
  está definida). Presente em todos os comandos `setup-*` e em ambos os inicializadores.
- Códigos de saída de `omniroute run`: o código de saída da própria CLI filha é propagado
  literalmente; `2` = argumentos inválidos (destino incompatível, ausência do
  `--model` obrigatório, proteção de contêiner); `127` = o binário de destino não está no `PATH`;
  `130`/`143`/`129` quando a inicialização é encerrada por `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = outra falha de inicialização em tempo de execução.
- Os dois inicializadores (`launch`, `launch-codex`) aceitam `--profile <name>` para selecionar
  um perfil gravado por `setup-claude` / `setup-codex`, além de argumentos repassados
  para o binário `claude` / `codex` subjacente.

O seletor interativo também é compartilhado pelas receitas de configuração:

```bash
# Selecione no catálogo ativo de modelos locais ou remotos e configure o destino.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

Atualmente, `configure` delega para as receitas testadas de `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` e `5dive`.
As entradas de catálogo exclusivas para IDE,
MITM e somente de guia continuam sendo fluxos explícitos `setup-*`/manuais e
não são apresentadas como destinos inicializáveis.

> `setup-opencode` é a integração **leve e compatível com OpenAI** do OpenCode.
> Há também uma integração mais completa por plugin — `omniroute setup opencode` — que
> instala `@omniroute/opencode-plugin`. São comandos diferentes; a tabela
> acima documenta `setup-opencode`.
>
> O plugin é disponibilizado em dois pacotes, um para cada versão principal do OpenCode, pois os dois
> carregadores esperam pontos de entrada diferentes:
> `@omniroute/opencode-plugin` para OpenCode v1 e
> `@omniroute/opencode-plugin-v2` para OpenCode v2. O pacote v2 é novo
> (`0.1.0`) e segue um contrato de host que ainda está mudando, portanto ele lê o
> formato que o OpenCode insere no rascunho do catálogo em vez de pressupor um formato. Instale-o
> adicionando uma entrada `plugins` a `opencode.json`; `omniroute setup opencode`
> ainda instala o pacote v1. As opções e a ordem de busca das credenciais estão no
> README do pacote.

---

## Uso local

Com o OmniRoute em execução em `localhost:20128`, basta executar o comando de configuração da sua
ferramenta. O catálogo é obtido do servidor local.

```bash
# Codex: grava um perfil por modelo correspondente em ~/.codex/
omniroute setup-codex
codex --profile glm52            # usa um perfil gerado

# Claude Code: grava perfis por modelo e, em seguida, inicia um deles
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: grava o provedor compatível com OpenAI com todos os modelos do catálogo
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # referenciada via {env:OMNIROUTE_API_KEY}, nunca armazenada em disco
opencode -m omniroute/glm/glm-5.2 "..."

# Ferramentas sem descoberta automática precisam de um modelo explícito:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Visualiza sem gravar nada:
omniroute setup-continue --dry-run
```

Inicie sem gravar nenhuma configuração (somente injeção de variáveis de ambiente):

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

# Caminho explícito do comando: repassa tudo o que vier depois de --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Uso remoto

Direcione qualquer comando de configuração para um OmniRoute remoto com `--remote` + `--api-key`. O
catálogo é obtido do servidor remoto; a configuração é gravada na sua máquina local.

```bash
# OpenCode com uma VPS remota, mantendo apenas modelos glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # primeiro, exporte OMNIROUTE_API_KEY

# Perfis do Codex provenientes de um catálogo remoto
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Inicia uma CLI diretamente no servidor remoto
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Em vez de informar `--remote`/`--api-key` todas as vezes, faça login uma vez e deixe o
**contexto ativo** fornecê-los automaticamente:

```bash
omniroute connect 192.168.0.15        # gera um token com escopo e armazena o contexto
omniroute setup-codex                 # ← agora usa o catálogo remoto
omniroute setup-opencode              # ← igual
omniroute launch                      # ← Claude Code no servidor remoto
```

Consulte [Modo remoto](./REMOTE-MODE.md) para saber mais sobre contextos, escopos e gerenciamento de tokens.

---

## Frotas de agentes do 5dive

O [5dive](https://5dive.ai) executa uma frota de agentes de programação de longa duração, cada um como uma
unidade systemd sob seu próprio usuário Unix. Ele não é uma CLI de programação, portanto não há
nada para o `omniroute run` iniciar — o `5dive` é um destino **somente de configuração**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Ambas as formas gravam um **perfil de autenticação** do 5dive, e cada instância do `claude` vinculada a esse
perfil passa então a se comunicar com o OmniRoute. Três aspectos são específicos deste destino:

- **Ele é executado no host da frota, como root.** Os verbos do 5dive atuam em unidades systemd locais
  e em um diretório de estado pertencente ao root; não há modo remoto. A receita executa novamente por meio do
  `sudo` quando ainda não está como root (`--no-sudo` desativa isso e exibe o
  comando em vez de executá-lo).
- **O endpoint deve usar `https://`, a menos que seja loopback.** A chave de API do agente
  é enviada por essa URL em cada solicitação, e o 5dive recusa um endpoint externo sem criptografia.
  Um endereço de LAN privada não é uma exceção.
- **A seleção de modelo de cada instância tem precedência sobre o perfil.** O perfil contém
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, mas uma instância ainda fixada em um identificador de
  modelo padrão falha em sua primeira interação com _"Há um problema com o modelo selecionado"_.
  Informe `--agent <name>` (pode ser repetido) para também fixar o modelo das instâncias; a receita exibe o
  comando quando isso não é feito.

A chave de API é fornecida ao 5dive pela **entrada padrão** (`--api-key=-`), portanto nunca aparece na
saída do `ps`.

Apontar o perfil para um **combo** do OmniRoute, em vez de um único modelo, é o que
oferece à frota o failover de provedor: quando o endpoint primário ficou totalmente indisponível no meio de uma interação
durante a execução registrada em
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), o agente concluiu
as etapas restantes usando o fallback sem jamais expor a indisponibilidade.

---

## Convenções de URL base (quais ferramentas esperam `/v1`)

O OmniRoute expõe a interface da OpenAI em `/v1`, a interface da Anthropic na raiz
e uma interface nativa do Gemini em `/v1beta`. Cada integração é configurada no formato
esperado pela respectiva ferramenta (verificado no código-fonte do comando):

| Integração                                                                 | URL base gravada | `/v1`?                                            |
| -------------------------------------------------------------------------- | ---------------- | ------------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | raiz             | Não — o Cline acrescenta `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | raiz             | Não — o Goose acrescenta o caminho                |
| `setup-aider` (`OPENAI_API_BASE`)                                          | raiz             | Não — o LiteLLM acrescenta `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | com `/v1`        | Sim                                               |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | raiz             | Não — o Claude Code acrescenta `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | com `/v1`        | Sim                                               |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | com `/v1`        | Sim                                               |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | raiz             | Não — o SDK acrescenta `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` no perfil de autenticação)             | raiz             | Não — o Claude Code acrescenta `/v1/messages`     |

---

## Como manter dependências nativas na atualização: `--include=optional`

Ao atualizar com `omniroute update` (após confirmar ou usando `--apply`),
o OmniRoute executa a instalação com `--include=optional` incorporado:

```bash
npm install -g omniroute@latest --include=optional
```

Essa **não** é uma opção que você passa para `omniroute update` — ela é sempre aplicada pelo
atualizador. Isso garante que as `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, a pilha SLM do LLMLingua) sobrevivam à atualização, mesmo que sua configuração do npm
tenha `omit=optional` definido, o que, caso contrário, removeria silenciosamente o driver nativo
do SQLite e a integração com o chaveiro do sistema operacional. Para visualizar o comando exato sem aplicá-lo:

```bash
omniroute update --dry-run
# [SIMULAÇÃO] Executaria: npm install -g omniroute@latest --include=optional
```

Outras opções de `omniroute update` (verificadas no código-fonte): `--check` (encerra com código 1 se
estiver desatualizado), `--apply` (instala sem solicitar confirmação), `--changelog`, `--no-backup`,
`--yes`.

---

## CLI do Google Gemini via `omniroute run gemini`

Contrato verificado com o `@google/gemini-cli` 0.50.0: a CLI respeita
`GOOGLE_GEMINI_BASE_URL` e envia `POST /v1beta/models/<model>:generateContent`
(e `:streamGenerateContent?alt=sse`) para essa URL — exatamente a interface nativa
do Gemini no OmniRoute (`/v1beta`). O `omniroute run gemini` configura isso automaticamente:

- `GOOGLE_GEMINI_BASE_URL` → a URL base ativa do OmniRoute (raiz, sem `/v1`);
- `GEMINI_API_KEY` → a credencial resolvida do OmniRoute (opção/ambiente/contexto);
- um **`GEMINI_CLI_HOME` temporário e isolado** cujo `.gemini/settings.json`
  seleciona a autenticação `gemini-api-key`, para que uma sessão OAuth do Google armazenada (Code Assist)
  nunca substitua a inicialização direcionada ao OmniRoute — removido após o encerramento;
- **higiene do ambiente**: o ambiente do processo filho é limpo de `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` e `GOOGLE_GENAI_USE_GCA` (que redirecionariam
  a autenticação para o Vertex/Code Assist), e `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` é
  definido como uma garantia adicional — os outros destinos de `run` recebem o mesmo
  tratamento para suas próprias variáveis conflitantes;
- injeção de `--model <id>` a partir de `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

A proteção de confiança no espaço de trabalho do Gemini ainda se aplica no modo sem interface — passe
`--skip-trust` (ou confie no diretório interativamente) por conta própria; o inicializador
deliberadamente não a ignora. Esse inicializador é distinto do **registro ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), que continua sendo a integração
do protocolo de agentes para `/dashboard/acp-agents`.

---

## Varredura real de smoke tests (opcional)

As execuções determinísticas de regressão do plano de inicialização ocorrem no CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Para validar os binários REAIS em um servidor
OmniRoute REAL, há um harness opcional em
`tests/integration/upstream-cli-smoke.int.test.ts`. Ele nunca é executado automaticamente
(cada subteste é ignorado, a menos que `RUN_CLI_SMOKE=1`), passa a credencial pelo NOME
da variável de ambiente (nunca pelo valor), remove strings com formato de chave de qualquer saída registrada, ignora
destinos cujo binário não esteja instalado e classifica as falhas como
autenticação / upstream / configuração, em vez de um simples valor booleano:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opcional: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` restringe a varredura;
`OMNIROUTE_SMOKE_TIMEOUT_MS` substitui o tempo limite de 120s por destino.

---

## Veja também

- [Configuração do Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — o guia mais detalhado do Claude Code
- [Configuração do Codex CLI](./CODEX-CLI-CONFIGURATION.md) — a configuração inicial única de `[model_providers.omniroute]`
- [Modo remoto](./REMOTE-MODE.md) — contextos, tokens de acesso com escopo e controle de um servidor remoto
- [Referência das ferramentas de CLI](../reference/CLI-TOOLS.md) — o catálogo completo de ferramentas compatíveis + páginas do painel
- [Guia de configuração](./SETUP_GUIDE.md) — métodos de instalação e integração da primeira execução
