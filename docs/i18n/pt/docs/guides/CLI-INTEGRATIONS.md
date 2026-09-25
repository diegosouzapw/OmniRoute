# CLI Integrations (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute fornece uma família de comandos `setup-*` que configuram uma CLI de codificação (Codex, Claude Code, OpenCode, Cline, …) para usar o OmniRoute como o seu backend — assim a ferramenta comunica com **um** único endpoint e o OmniRoute encaminha para o fornecedor certo com fallback automático. Cada comando lê o catálogo de modelos **em tempo real** de um OmniRoute em execução (local ou remoto) e escreve o ficheiro de configuração da própria ferramenta na **sua** máquina. A chave API é referenciada por uma variável de ambiente sempre que a ferramenta o suporta. Os comandos que persistem um ficheiro de ambiente local da ferramenta são indicados abaixo.

Existe também um lançador genérico — `omniroute run <target>` — que inicia `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` ou `gemini` com o ambiente correto injetado, sem escrever qualquer configuração. Os alvos e os seus aliases vêm do manifesto canónico `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), e `omniroute completion` oferece as mesmas palavras-alvo derivadas do manifesto. Os lançadores legados por ferramenta — `omniroute launch` (Claude Code) e `omniroute launch-codex` (Codex) — permanecem disponíveis.

O onboarding de fornecedores está disponível a partir do mesmo contexto local/remoto. Os comandos API-first abaixo mantêm a autenticação de gestão separada das credenciais do fornecedor e nunca imprimem uma credencial em saída estruturada:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Para scripts, prefira `--credential-stdin` ou `--credential-env`; `--credential` é mantido para uso local controlado. `providers remove` requer `--yes` num terminal não interativo, e todos os cinco comandos respeitam o contexto ativo ou as opções globais `--base-url`/`--api-key`.

Os seletores de fornecedor rejeitam prefixos de ID, nomes ou nomes de fornecedor ambíguos; use um ID de conexão completo quando várias conexões corresponderem. Os comandos de criação e edição leem a conexão guardada de volta, e a remoção verifica se esta já não é legível. Uma importação ignora um par fornecedor/nome existente. As entradas importadas não podem substituir o endpoint de gestão, o contexto ou as credenciais de gestão fornecidas à CLI.

Para a configuração base única e manual das duas integrações mais ricas, consulte os aprofundamentos por ferramenta:

- [Configuração do Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Configuração da CLI do Codex](./CODEX-CLI-CONFIGURATION.md)
- [Modo Remoto](./REMOTE-MODE.md) — opere um OmniRoute remoto (VPS / Tailnet) a partir do seu portátil
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — a extensão OmniCopilot; também pode executar estes comandos `setup-*` para si a partir do editor

---

## Tabela principal

Todos os comandos respeitam o **contexto ativo** (definido com `omniroute connect`; consulte
[Modo remoto](./REMOTE-MODE.md)) ou os parâmetros explícitos `--remote <url> --api-key <key>`.
A expressão "local vs. remoto" abaixo significa: sem parâmetros, o alvo é `http://localhost:20128`;
com `--remote` (ou um contexto remoto ativo), o catálogo é obtido desse
servidor e a configuração é escrita localmente.

| Comando                    | Ferramenta                               | O que escreve                                                                                                                                                                                  | Opções principais                                                                                                                          | Local vs. remoto |
| -------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                         | `~/.codex/<name>.config.toml` — um perfil por cada modelo de texto compatível (`codex --profile <name>`)                                                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Ambos            |
| `omniroute setup-claude`   | Claude Code                              | `~/.claude/profiles/<name>/settings.json` — um perfil por cada modelo correspondente (`CLAUDE_CONFIG_DIR`)                                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Ambos            |
| `omniroute setup-opencode` | OpenCode (compatível com OpenAI)         | `~/.config/opencode/opencode.json` — fornecedor `omniroute` com todos os modelos do catálogo (`opencode -m omniroute/<model>`)                                                                 | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Ambos            |
| `omniroute setup-cline`    | Cline                                    | `~/.cline/data/{globalState,secrets}.json` (modo CLI) + apresenta as definições da extensão do VS Code                                                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Ambos            |
| `omniroute setup-kilo`     | Kilo Code                                | `~/.local/share/kilo/auth.json` (CLI) + integra `kilocode.*` no `settings.json` do VS Code, caso exista                                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Ambos            |
| `omniroute setup-continue` | Continue / CLI `cn`                      | `~/.continue/config.yaml` — modelos com `provider: openai`, chave através de `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Ambos            |
| `omniroute setup-cursor`   | Cursor                                   | Nada — apresenta os passos a seguir na aplicação (a configuração do Cursor está numa base de dados SQLite opaca)                                                                               | `--remote` `--api-key` `--only` `--port`                                                                                                   | Ambos            |
| `omniroute setup-roo`      | Roo Code                                 | `~/.omniroute/roo-settings.json` (documento de importação) + define `roo-cline.autoImportSettingsPath` se existir um `settings.json` do VS Code                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Ambos            |
| `omniroute setup-crush`    | Crush                                    | `~/.config/crush/crush.json` — fornecedor `openai-compat`, chave através de `$OMNIROUTE_API_KEY`                                                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Ambos            |
| `omniroute setup-goose`    | Goose                                    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + apresenta instruções para configurar o ambiente                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ambos            |
| `omniroute setup-aider`    | Aider                                    | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + apresenta instruções para configurar o ambiente                                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ambos            |
| `omniroute setup-qwen`     | Qwen Code                                | `~/.qwen/settings.json` — matriz V4 `modelProviders.openai` + `OMNIROUTE_API_KEY` em `~/.qwen/.env`                                                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Ambos            |
| `omniroute setup-5dive`    | 5dive (frota de agentes)                 | Nada em `$HOME` — escreve um **perfil de autenticação** do 5dive (`/var/lib/5dive/auth-profiles/<name>/`) através de `5dive agent auth set`; apenas para root, executado no anfitrião da frota | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Ambos            |
| `omniroute run <target>`   | Execução em tempo de execução (genérica) | Nada — inicia `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` com o ambiente e os argumentos corretos; Qwen e Gemini utilizam um diretório pessoal temporário e isolado            | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Ambos            |
| `omniroute launch`         | Claude Code                              | Nada — inicia `claude` com `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` injetados                                                                                                               | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Ambos            |
| `omniroute launch-codex`   | OpenAI Codex CLI                         | Nada — inicia `codex` com o fornecedor `omniroute` injetado através das opções `-c`                                                                                                            | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Ambos            |

Notas sobre as opções (verificadas no código-fonte do comando):

- `--remote <url>` — obtém o catálogo a partir de uma OmniRoute remota (sobrepõe-se a `--port`
  e ao contexto ativo). `--api-key <key>` fornece a credencial para esse
  servidor (por predefinição, utiliza a variável de ambiente `OMNIROUTE_API_KEY` ou o token do contexto ativo).
- `--only <patterns>` — subcadeias separadas por vírgulas; mantém apenas os IDs de modelos correspondentes
  (por exemplo, `--only glm,kimi`). Disponível em `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — apresenta exatamente o que seria escrito sem alterar o
  sistema de ficheiros. Disponível em todos os comandos `setup-*`, **exceto** `setup-cursor`
  (que nunca escreve num ficheiro).
- `--model <id>` — obrigatório (ou selecionado interativamente) para as ferramentas que não têm
  deteção automática de modelos: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Estas ferramentas
  também aceitam `--yes` para execuções não interativas (o que requer `--model`).
  `setup-opencode` aceita `--model` para definir o modelo predefinido de nível superior.
- `--model <id>` em `omniroute run` segue a configuração específica por destino do manifesto
  (`bin/cli/cli-manifest.mjs`): **aider** recebe `--model openai/<id>` e
  **opencode** recebe `--model omniroute/<id>` (o prefixo só é adicionado quando o ID
  ainda não o contém); **qwen** e **gemini** recebem o ID literalmente;
  **claude** recebe-o através de `ANTHROPIC_MODEL`, **goose** através de `GOOSE_MODEL` e
  **codex** através de argumentos `-c model_providers.omniroute.*`. **Qwen é o único destino de execução
  que exige obrigatoriamente `--model`** — `omniroute run qwen` sem esta opção termina
  com o código `2` e um erro explícito.
- `--port <port>` — porta local da OmniRoute (predefinição: `20128`; ignorada quando `--remote`
  está definido). Presente em todos os comandos `setup-*` e em ambos os iniciadores.
- Códigos de saída de `omniroute run`: o código de saída do próprio CLI filho é propagado
  literalmente; `2` = argumentos inválidos (destino não suportado, ausência do argumento obrigatório
  `--model`, proteção do contentor); `127` = o binário de destino não está em `PATH`;
  `130`/`143`/`129` quando a execução é terminada por `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = outra falha de execução.
- Os dois iniciadores (`launch`, `launch-codex`) aceitam `--profile <name>` para selecionar
  um perfil criado por `setup-claude` / `setup-codex`, além de argumentos encaminhados para
  o binário `claude` / `codex` subjacente.

O seletor interativo também é partilhado pelas receitas de configuração:

```bash
# Selecione a partir do catálogo ativo de modelos locais ou remotos e configure o destino.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

Atualmente, `configure` delega para as receitas testadas de `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` e `5dive`.
As entradas do catálogo exclusivas para IDE,
MITM e guias continuam a utilizar fluxos explícitos `setup-*`/manuais e
não são apresentadas como destinos executáveis.

> `setup-opencode` é a integração **openai-compatible leve** do OpenCode.
> Existe também uma integração mais completa através de plugin — `omniroute setup opencode` — que
> instala `@omniroute/opencode-plugin`. São comandos diferentes; a tabela
> acima documenta `setup-opencode`.
>
> O plugin é disponibilizado em dois pacotes, um por cada versão principal do OpenCode, porque os dois
> carregadores esperam pontos de entrada diferentes:
> `@omniroute/opencode-plugin` para o OpenCode v1 e
> `@omniroute/opencode-plugin-v2` para o OpenCode v2. O pacote v2 é novo
> (`0.1.0`) e segue um contrato de anfitrião que ainda está em evolução, pelo que lê a
> estrutura que o OpenCode introduz no rascunho do catálogo, em vez de assumir uma. Instale-o
> adicionando uma entrada `plugins` a `opencode.json`; `omniroute setup opencode`
> continua a instalar o pacote v1. As opções e a ordem de procura das credenciais encontram-se no
> README do pacote.

---

## Utilização local

Com o OmniRoute em execução em `localhost:20128`, basta executar o comando de configuração para a sua
ferramenta. O catálogo é obtido a partir do servidor local.

```bash
# Codex: escrever um perfil por cada modelo correspondente em ~/.codex/
omniroute setup-codex
codex --profile glm52            # utilizar um perfil gerado

# Claude Code: escrever perfis por modelo e, em seguida, iniciar um
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: escrever o fornecedor compatível com OpenAI com todos os modelos do catálogo
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # referenciada através de {env:OMNIROUTE_API_KEY}, nunca guardada em disco
opencode -m omniroute/glm/glm-5.2 "..."

# As ferramentas sem deteção automática requerem um modelo explícito:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Pré-visualizar sem escrever nada:
omniroute setup-continue --dry-run
```

Inicie sem escrever qualquer configuração (apenas injeção de variáveis de ambiente):

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

# Caminho explícito do comando: transmitir tudo o que vier depois de --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Utilização remota

Aponte qualquer comando de configuração para um OmniRoute remoto com `--remote` + `--api-key`. O
catálogo é obtido a partir do servidor remoto; a configuração é escrita na sua máquina local.

```bash
# OpenCode contra um VPS remoto, mantendo apenas os modelos glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # exportar primeiro OMNIROUTE_API_KEY

# Perfis do Codex a partir de um catálogo remoto
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Iniciar uma CLI diretamente contra o servidor remoto
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Em vez de passar `--remote`/`--api-key` de cada vez, inicie sessão uma vez e permita que o
**contexto ativo** os forneça automaticamente:

```bash
omniroute connect 192.168.0.15        # emite um token com âmbito limitado e guarda o contexto
omniroute setup-codex                 # ← utiliza agora o catálogo remoto
omniroute setup-opencode              # ← igual
omniroute launch                      # ← Claude Code contra o servidor remoto
```

Consulte [Modo remoto](./REMOTE-MODE.md) para obter informações sobre contextos, âmbitos e gestão de tokens.

---

## Frotas de agentes 5dive

O [5dive](https://5dive.ai) executa uma frota de agentes de programação de longa duração, cada um como uma
unidade systemd sob o seu próprio utilizador Unix. Não é propriamente uma CLI de programação, pelo que não há
nada para `omniroute run` iniciar — o `5dive` é um destino **apenas de configuração**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Ambas as formas escrevem um **perfil de autenticação** do 5dive, e cada posto `claude` associado a esse
perfil passa então a comunicar com o OmniRoute. Há três aspetos específicos deste destino:

- **É executado no anfitrião da frota, como root.** Os verbos do 5dive atuam sobre unidades systemd locais
  e um diretório de estado pertencente ao root; não existe modo remoto. A receita volta a executar-se através de
  `sudo` quando ainda não está a ser executada como root (`--no-sudo` desativa esse comportamento e apresenta o
  comando em alternativa).
- **O endpoint tem de utilizar `https://`, exceto se for de loopback.** A chave de API do agente
  é enviada nesse URL em cada pedido, e o 5dive recusa um endpoint externo em texto simples.
  Um endereço de LAN privada não é uma exceção.
- **A seleção de modelo de cada posto tem precedência sobre o perfil.** O perfil inclui
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, mas um posto ainda associado a um identificador de
  modelo padrão falha na primeira interação com _"There's an issue with the selected model"_.
  Passe `--agent <name>` (repetível) para também associar os postos; a receita apresenta o
  comando quando não o fizer.

A chave de API é fornecida ao 5dive através de **stdin** (`--api-key=-`), pelo que nunca aparece na
saída de `ps`.

Apontar o perfil para uma **combinação** do OmniRoute, em vez de para um único modelo, é o que
fornece à frota a ativação pós-falha entre fornecedores: quando o endpoint principal ficou totalmente indisponível a meio de uma interação
na execução registada em
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), o agente concluiu
os passos restantes no endpoint alternativo sem nunca expor a interrupção.

---

## Convenções do URL base (que ferramentas requerem `/v1`)

O OmniRoute disponibiliza a interface OpenAI em `/v1`, a interface Anthropic na raiz
e uma interface Gemini nativa em `/v1beta`. Cada integração está configurada no formato
esperado pela respetiva ferramenta (verificado no código-fonte do comando):

| Integração                                                                 | URL base escrito | `/v1`?                                            |
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

## Manter as dependências nativas ao atualizar: `--include=optional`

Quando atualiza com `omniroute update` (depois de confirmar ou com `--apply`),
o OmniRoute executa a instalação com `--include=optional` incorporado:

```bash
npm install -g omniroute@latest --include=optional
```

Esta **não** é uma opção que deva passar a `omniroute update` — é sempre aplicada pelo
atualizador. Garante que as `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, a pilha SLM do LLMLingua) permanecem após a atualização, mesmo que a sua
configuração do npm tenha `omit=optional` definido, o que, de outro modo, removeria
silenciosamente o controlador SQLite nativo e a integração com o porta-chaves do
sistema operativo. Para pré-visualizar o comando exato sem o aplicar:

```bash
omniroute update --dry-run
# [EXECUÇÃO DE TESTE] Seria executado: npm install -g omniroute@latest --include=optional
```

Outras opções de `omniroute update` (verificadas no código-fonte): `--check` (termina
com o código 1 se estiver desatualizado), `--apply` (instala sem solicitar confirmação),
`--changelog`, `--no-backup`, `--yes`.

---

## Google Gemini CLI através de `omniroute run gemini`

Contrato verificado com o `@google/gemini-cli` 0.50.0: a CLI respeita
`GOOGLE_GEMINI_BASE_URL` e envia `POST /v1beta/models/<model>:generateContent`
(e `:streamGenerateContent?alt=sse`) para esse URL — exatamente a interface Gemini
nativa do OmniRoute (`/v1beta`). O `omniroute run gemini` configura isto
automaticamente:

- `GOOGLE_GEMINI_BASE_URL` → o URL base ativo do OmniRoute (raiz, sem `/v1`);
- `GEMINI_API_KEY` → a credencial do OmniRoute determinada (opção/ambiente/contexto);
- um **`GEMINI_CLI_HOME` temporário e isolado**, cujo `.gemini/settings.json`
  seleciona a autenticação `gemini-api-key`, para que uma sessão OAuth da Google
  armazenada (Code Assist) nunca substitua o arranque direcionado para o OmniRoute —
  removido após a saída;
- **higiene do ambiente**: o ambiente do processo filho é limpo de `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` e `GOOGLE_GENAI_USE_GCA` (que redirecionariam a
  autenticação para o Vertex/Code Assist), e
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` é definido como salvaguarda adicional —
  os outros destinos de `run` recebem o mesmo tratamento para as respetivas variáveis
  em conflito;
- injeção de `--model <id>` a partir de `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

A proteção de confiança no espaço de trabalho do Gemini continua a aplicar-se no modo
sem interface — passe `--skip-trust` (ou marque o diretório como fidedigno
interativamente); o iniciador não a contorna deliberadamente. Este iniciador é
distinto do **registo ACP** (`src/lib/acp/registry.ts`, `gemini --acp`), que continua
a ser a integração do protocolo de agentes para `/dashboard/acp-agents`.

---

## Verificação real rápida (opcional)

As execuções determinísticas de regressão do plano de inicialização são realizadas em CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Para validar os binários REAIS num servidor
OmniRoute REAL, existe uma infraestrutura opcional em
`tests/integration/upstream-cli-smoke.int.test.ts`. Nunca é executada automaticamente
(cada subteste é ignorado, a menos que `RUN_CLI_SMOKE=1`), transmite a credencial através do NOME
de uma variável de ambiente (nunca através do valor), oculta cadeias com formato de chave em qualquer resultado registado, ignora
alvos cujo binário não esteja instalado e classifica as falhas como
autenticação / upstream / configuração, em vez de usar um simples valor booleano:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opcional: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` restringe a verificação;
`OMNIROUTE_SMOKE_TIMEOUT_MS` substitui o tempo limite de 120 s por alvo.

---

## Consulte também

- [Configuração do Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — o guia mais aprofundado do Claude Code
- [Configuração do Codex CLI](./CODEX-CLI-CONFIGURATION.md) — a configuração base única de `[model_providers.omniroute]`
- [Modo remoto](./REMOTE-MODE.md) — contextos, tokens de acesso com âmbito definido e controlo de um servidor remoto
- [Referência das ferramentas CLI](../reference/CLI-TOOLS.md) — o catálogo completo de ferramentas suportadas + páginas do painel
- [Guia de configuração](./SETUP_GUIDE.md) — métodos de instalação e integração na primeira execução
