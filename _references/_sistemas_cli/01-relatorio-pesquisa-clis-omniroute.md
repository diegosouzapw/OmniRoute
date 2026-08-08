# Relatorio de pesquisa: repositorios de CLI integraveis com OmniRoute

> **Status final (2026-08-03):** este documento preserva o inventário inicial. A pesquisa foi concluída para `104/104` casos. Para resultados por projeto, use `04-tracker-integracoes-clis.md`; para o fechamento executivo e a estratégia de publicação, use `06-relatorio-final-104-clis-e-estrategia-prs.md`.

**Data da pesquisa:** 2026-08-01  
**Escopo:** agentes de codigo de terminal, CLIs de LLM, runtimes de agentes e harnesses que possam consumir um endpoint HTTP compativel com OpenAI, Anthropic ou Gemini, ou que possam ser adaptados por provider/plugin/ACP/MITM.  
**Fonte local principal:** `_tasks/hands-off/2026-08-01_release-v3.8.50_v3.8.50_sess-e1846bc2/handoff.md`  
**Fontes externas principais:** GitHub Search/API, READMEs dos repositorios e a lista publica `bradAGI/awesome-cli-coding-agents` (atualizada em 2026-07-29).

## 1. Resumo executivo

O OmniRoute ja possui uma integracao funcional com o jcode e um catalogo local de ferramentas CLI. O proximo ganho de maior valor e transformar o OmniRoute em um endpoint reconhecido pelos principais agentes de terminal, priorizando configuracao nativa e PR upstream quando o projeto aceitar contribuicoes.

A pesquisa encontrou:

- **33 entradas de ferramentas no registro local `CLI_TOOLS`**, contando o registro extraido de Grok Build em `src/shared/constants/cliToolsGrokBuild.ts`, incluindo Claude Code, Codex CLI, Cline, Kilo, Continue, OpenCode, Aider, jcode, Smelt, Pi, Crush, Goose, Open Interpreter, OpenClaw, Hermes Agent, Letta CLI e outros.
- **Mais de 90 projetos publicos** no inventario externo consultado, entre agentes de codigo, CLIs generalistas, forks, runtimes e orquestradores.
- **Candidatos com evidencia forte de endpoint customizavel:** Gemini CLI, Claw Code, Plandex, MiMo Code, Trae Agent, Kimi CLI, Every Code, Open Codex, VT Code, OpenHands CLI, gptme, Nanocoder, RA.Aid, CoreCoder, Grok CLI, Gitlawb Zero, DeepSeek Reasonix, KlaatCode, CodeMini, DvalinCode, Coro Code, Mini-Kode, Late CLI, Agentty, Aizen, Minacode, YottaCode, aichat, ShellGPT, Mistral Vibe, OpenSquilla, Kode CLI e outros.
- **Candidatos que exigem pesquisa confirmatoria:** projetos com README generico, configuracao recente, repositorio ambiguo, binario fechado ou sem evidencia textual suficiente de `base_url`/provider.
- **Candidatos que podem ser integrados por outros caminhos:** ACP, MCP, wrapper/launcher, provider adapter, proxy MITM ou apenas documentacao; eles nao devem ser classificados automaticamente como OpenAI-compatible.

Conclusao: devemos pesquisar e tentar todos os candidatos tecnicamente viaveis, mas separar claramente `suporte no catalogo OmniRoute`, `configuracao generica`, `adaptacao upstream publicada` e `PR/issue aceita`. O tracker acompanha essas dimensoes separadamente.

## 2. Metodo e limites

### 2.1 Como a busca foi feita

1. Leitura integral do handoff do caso jcode para capturar o padrao de integracao, validacao, publicacao e as restricoes de worktree.
2. Inspecao do catalogo local em `src/shared/constants/cliTools.ts`, da documentacao de CLI e do fluxo de setup em `docs/guides/CLI-INTEGRATIONS.md`.
3. Consulta do GitHub Search/API para resolver o repositorio canonico de cada nome, evitando homonimos.
4. Leitura de README/raw quando disponivel, procurando sinais como `base_url`, `baseURL`, `OPENAI_BASE_URL`, `OPENAI_API_BASE`, `LLM_BASE_URL`, `provider`, `gateway`, `model provider`, `Anthropic` e `Gemini`.
5. Consulta da lista `https://github.com/bradAGI/awesome-cli-coding-agents`, que serve como descoberta ampla, nao como prova de compatibilidade.
6. Classificacao por adocao, manutencao, licenca, evidencia de endpoint, maturidade, potencial de PR e utilidade para o ecossistema OmniRoute.

### 2.2 O que ainda nao foi afirmado

- Nao foi feita implementacao ou abertura de PR/issue para os candidatos abaixo; o unico caso publicado nesta sessao anterior e o jcode.
- A presenca da palavra `provider` no README nao prova que uma URL arbitraria funciona em runtime.
- Estrelas e datas sao snapshots aproximados obtidos em 2026-08-01 e podem mudar.
- Repositorios fechados ou com EULA entram no inventario para avaliacao de configuracao, mas nao implicam possibilidade de fork ou PR.
- Cada task de integracao precisa repetir a pesquisa no upstream antes de editar codigo.

## 3. Baseline do OmniRoute

### 3.1 Superficie que o OmniRoute oferece

- Endpoint OpenAI em `/v1`.
- Superficie Anthropic na raiz, usada por clientes que esperam `/v1/messages` a partir do `ANTHROPIC_BASE_URL`.
- Superficie Gemini em `/v1beta`.
- Catalogo de modelos consultavel pelos comandos de setup quando o cliente suporta descoberta.
- Chave via `OMNIROUTE_API_KEY` ou chave selecionada no dashboard.
- Traducao entre formatos, streaming SSE, tool calling, fallback, combos, custos e politicas de autenticacao.
- Modos de consumo: configuracao de ambiente, arquivo nativo do cliente, provider customizado, ACP/MCP e MITM.

### 3.2 Catalogo local ja registrado

Fonte: `src/shared/constants/cliTools.ts` e `src/shared/constants/cliToolsGrokBuild.ts`.

**Codigo/CLI:** Claude Code, OpenAI Codex CLI, Factory Droid, OpenClaw, Cursor, Cline, Kilo Code, Continue, Antigravity, GitHub Copilot CLI, OpenCode, Kiro, Qwen Code, Aider, ForgeCode, Cursor Agent CLI, Roo Code, jcode, DeepSeek TUI, CodeWhale, Smelt, Pi, Crush.

**Agentes:** Hermes, Hermes Agent, Goose, Open Interpreter, Oh My Pi, Letta CLI, Warp AI, Agent Deck.

Os documentos do catalogo tambem mantem um backlog MITM para ferramentas sem base URL, como Windsurf, Amp, Amazon Q/Kiro CLI e Cowork. Esses casos devem permanecer separados de uma integracao direta.

### 3.3 Caso jcode (referencia validada)

- Upstream: `https://github.com/1jehuang/jcode`
- Mecanismo: perfil OpenAI-compatible dirigido por metadados; nao foi criado um plugin de runtime.
- Branch: `feat/omniroute-provider`
- Commit: `ee4f904e6`
- PR no fork: `https://github.com/diegosouzapw/jcode/pull/1`
- Issue no upstream: `https://github.com/1jehuang/jcode/issues/704`
- Diff: 6 arquivos, `+56/-3`.
- Validacao: `cargo check --workspace` limpo; 205 testes passaram e uma falha foi preexistente/ambiental.
- Estado: aguardando mantenedor; o upstream nao aceita PR de forks externos, por isso a issue e o artefato oficial.
- Pendencia prometida: adicionar no README do OmniRoute a secao "Tools & repositories that work with OmniRoute".

Licao: o trabalho deve comecar descobrindo o mecanismo real de providers do upstream. Nem todos os clientes precisam de mudanca no OmniRoute; alguns precisam somente de um perfil local, e outros exigirao um adaptador especifico.

## 4. Candidatos prioritarios com evidencia concreta

As evidencias abaixo sao sinais de README/configuracao observados na pesquisa inicial. A task individual deve abrir o arquivo exato, confirmar a versao atual e executar um smoke test.

| Projeto | Repositorio | Evidencia inicial | Rota provavel |
|---|---|---|---|
| Gemini CLI | `google-gemini/gemini-cli` | `GOOGLE_GEMINI_BASE_URL` | configuracao direta; possivel PR/documentacao |
| Claw Code | `ultraworkers/claw-code` | `OPENAI_BASE_URL`, provider compativel | configuracao direta ou provider |
| Plandex | `plandex-ai/plandex` | providers customizados com `baseUrl` | provider/preset |
| MiMo Code | `XiaomiMiMo/MiMo-Code` | `@ai-sdk/openai-compatible` e `baseURL` | provider customizado |
| Trae Agent | `bytedance/trae-agent` | `model_providers` e `base_url` | provider/config |
| Kimi CLI | `MoonshotAI/kimi-cli` | modos `openai_legacy`, `openai_responses`, `anthropic` e `base_url` | provider nativo/config |
| Every Code | `just-every/code` | fork Codex com providers OpenAI/Claude/Gemini | perfil/provider |
| Open Codex | `ymichael/open-codex` | multi-provider e OpenAI-compatible | fork/provider |
| VT Code | `vinhnx/vtcode` | `custom_providers[].base_url`, failover | provider customizado |
| OpenHands CLI | `OpenHands/OpenHands-CLI` | `LLM_BASE_URL` | configuracao direta |
| gptme | `gptme/gptme` | `OPENAI_BASE_URL` e providers | configuracao direta |
| Nanocoder | `Nano-Collective/nanocoder` | qualquer API OpenAI-compatible | configuracao direta |
| RA.Aid | `ai-christianson/RA.Aid` | `OPENAI_API_BASE` | configuracao direta |
| CoreCoder | `he-yufeng/CoreCoder` | `OPENAI_BASE_URL` | configuracao direta |
| Grok CLI | `superagent-ai/grok-cli` | `GROK_BASE_URL`/`baseURL` | configuracao direta |
| Gitlawb Zero | `Gitlawb/zero` | provider `custom-openai-compatible`, `--base-url` | provider/flag |
| DeepSeek Reasonix | `esengine/DeepSeek-Reasonix` | provider compativel e endpoint | confirmar configuracao |
| KlaatCode | `KlaatAI/klaatcode` | `customModels` OpenAI-compatible | configuracao JSON |
| CodeMini CLI | `havingautism/Codemini-CLI` | `gateway.base_url` | gateway/config |
| Zot | `patriceckhart/zot` | `--base-url` e provider custom em `models.json` | flag/config |
| Pool | `poolsideai/pool` | `POOLSIDE_STANDALONE_BASE_URL`; licenca proprietaria | configuracao, sem PR assumido |
| Octomind | `Muvon/octomind` | `<PROVIDER>_API_URL`/`LOCAL_API_URL` | provider/env |
| Coro Code | `Blushyes/coro-code` | `OPENAI_BASE_URL` | configuracao direta |
| Mini-Kode | `minmaxflow/mini-kode` | `MINIKODE_BASE_URL` | configuracao direta |
| Late CLI | `mlhher/late-cli` | `OPENAI_BASE_URL`/`api-url` | env/flag |
| Agentty | `1ay1/agentty` | modelo agnostico e endpoints compativeis | confirmar arquivo de config |
| Aizen | `aizen-stack/aizen` | CLI Rust OpenAI-compatible; `AIZEN_BASE_URL` | configuracao direta |
| Clif-Code | `DLhugly/Clif-Code` | OpenRouter/OpenAI/Anthropic/Ollama | provider/config |
| Minacode | `hit9/minacode` | provider e compatibilidade no README | confirmar URL |
| YottaCode | `yottadynamics/yottacode` | modelo escolhido, gateway/provider | confirmar config |
| aichat | `sigoden/aichat` | providers OpenAI/Claude/Gemini e compatibilidade | `models.yaml`/provider |
| ShellGPT | `TheR1D/shell_gpt` | `API_BASE_URL` | env/config |
| Mistral Vibe | `mistralai/mistral-vibe` | `base_url`, API base e provider | config/env |
| OpenSquilla | `opensquilla/opensquilla` | 20+ providers e gateway | provider/config |
| Kode CLI | `shareAI-lab/Kode-cli` | provider, endpoint e Anthropic/OpenAI/Gemini | config |
| Crush | `charmbracelet/crush` | `base_url`, provider compativel | ja catalogado no OmniRoute; validar upstream |
| Hermes Agent | `NousResearch/hermes-agent` | endpoint/gateway e 300+ modelos | ja catalogado; validar modo de endpoint |
| OpenClaw | `openclaw/openclaw` | providers, gateway e endpoints | ja catalogado; validar configuracao atual |

## 5. Inventario amplo localizado

### 5.1 Agentes de terminal e coding CLIs

Os projetos desta tabela foram encontrados na lista curada ou no GitHub Search. `Pesquisa` indica o proximo gate; nao significa que a integracao ja esta pronta.

| Projeto | Repositorio | Licenca/sinal publico | Situacao inicial |
|---|---|---|---|
| OpenCode | `anomalyco/opencode` | multi-provider, 75+ providers | ja suportado; acompanhar provider/plugin |
| Codex CLI | `openai/codex` | Apache-2.0, provider configuravel | ja suportado |
| OpenHands principal | `All-Hands-AI/OpenHands` | OSS, CLI e web | pesquisar CLI e `LLM_BASE_URL` |
| Pi | `badlogic/pi-mono` | harness multi-provider | ja suportado; confirmar repo atual |
| Open Interpreter | `OpenInterpreter/open-interpreter` | Apache-2.0, `--api_base` | ja suportado |
| Cline | `cline/cline` | Apache-2.0, base URL/gateway | ja suportado |
| Goose | `aaif-goose/goose` | Apache-2.0, providers | ja suportado |
| Aider | `Aider-AI/aider` | Apache-2.0, Anthropic/OpenAI | ja suportado |
| Continue | `continuedev/continue` | Apache-2.0, multi-model | ja suportado |
| Deep Agents Code | `langchain-ai/deepagents` | MIT, tool-calling LLM | pesquisar pacote `deepagents-code` |
| Crush | `charmbracelet/crush` | provider/base URL | ja suportado |
| Kilo Code | `Kilo-Org/kilocode` | MIT, providers | ja suportado |
| Qwen Code | `QwenLM/qwen-code` | Apache-2.0, providers | ja suportado |
| Roo Code | `RooCodeInc/Roo-Code` | Apache-2.0 | ja catalogado; validar CLI |
| Grok Build | `xai-org/grok-build` | Apache-2.0, provider | ja suportado |
| Oh My Pi | `can1357/oh-my-pi` | provider custom em YAML | ja suportado |
| SWE-agent | `SWE-agent/SWE-agent` | MIT | pesquisar backend e base URL |
| Smol Developer | `smol-ai/developer` | embeddable agent | adapter/SDK, nao necessariamente CLI |
| Claude Engineer | `Doriandarko/claude-engineer` | CLI Claude | pesquisar provider |
| Claurst | `Kuberwastaken/claurst` | GPL-3.0, provider | confirmar endpoint e politica de fork |
| Free Code | `paoloanzn/free-code` | fork de Claude Code | pesquisar licenca e endpoint |
| Codebuff | `CodebuffAI/codebuff` | multi-agent CLI | pesquisar provider |
| ForgeCode | `antinomyhq/forge` | 300+ modelos | ja suportado |
| OpenSquilla | `opensquilla/opensquilla` | Apache-2.0, gateway | candidato forte |
| Kode CLI | `shareAI-lab/Kode-cli` | Apache-2.0, endpoint | candidato forte |
| Devon | `entropy-research/Devon` | pair programmer TUI | pesquisar backend |
| AutoCodeRover | `AutoCodeRoverSG/auto-code-rover` | agente de issues | pesquisar configuracao de modelos |
| Letta Code | `letta-ai/letta-code` | Apache-2.0, model-agnostic | pesquisar API base |
| CodeMachine CLI | `moazbuilds/CodeMachine-CLI` | multi-agent local | pesquisar provider |
| Codel | `semanser/codel` | AGPL-3.0, Docker/web UI | confirmar servidor OpenAI e restricoes AGPL |
| Agentless | `OpenAutoCoder/Agentless` | workflow sem loop persistente | pesquisar entrada de modelo |
| Amazon Q Developer CLI | `aws/amazon-q-developer-cli` | Apache-2.0 | provavelmente auth/ecossistema AWS; pesquisar |
| Neovate Code | `neovateai/neovate-code` | MIT, plugin/multi-provider | candidato forte |
| Groq Code CLI | `build-with-groq/groq-code-cli` | multi-model | pesquisar endpoint |
| Dexto | `truffle-ai/dexto` | CLI/web/API, subagentes | pesquisar provider |
| claw-code-agent | `HarnessLab/claw-code-agent` | Python, sem dependencias | confirmar endpoint |
| g3 | `dhanji/g3` | Rust, provider abstraction | confirmar licenca e URL |
| Coro Code | `Blushyes/coro-code` | base URL/OpenAI | candidato |
| Mini-Kode | `minmaxflow/mini-kode` | MIT, referencia educacional | candidato |
| zot | `patriceckhart/zot` | MIT, TUI/JSON/RPC | candidato |
| agentty | `1ay1/agentty` | MIT, ACP e multi-provider | candidato |
| nori-cli | `tilework-tech/nori-cli` | multi-provider sobre Codex | pesquisar base URL |
| cursor-agent clone | `civai-technologies/cursor-agent` | OpenAI/Claude/Ollama | pesquisar maturidade e licenca |
| DvalinCode | `arthurpanhku/dvalincode` | MIT, OpenAI-compatible | candidato |
| OpenHarness | `zhijiewong/openharness` | Apache-2.0, any LLM | candidato |
| Octomind | `Muvon/octomind` | Apache-2.0, 13+ providers | candidato |
| Codex Infinity | `lee101/codex-infinity` | fork Codex | pesquisar endpoint |
| San | `genai-io/san` | Apache-2.0, provider-neutral | pesquisar endpoint |
| Waveloom | `Menfre01/waveloom` | Apache-2.0, DeepSeek-focused | pesquisar provider |
| picocode | `jondot/picocode` | Rust, multi-LLM | pesquisar provider |
| QQCode | `qnguyen3/qqcode` | Rust, skills | pesquisar provider |
| Keen Code | `mochow13/keen-code` | MIT, 9+ providers | pesquisar provider |
| Smelt | `leonardcser/smelt` | MIT, OpenAI-compatible | ja suportado |
| Grinta | `josephsenior/Grinta-Coding-Agent` | MIT, Python | pesquisar provider |
| Zap | `zap-coding-agent/zap-coding-agent` | MIT, MCP, local/OpenAI | pesquisar endpoint |
| Binharic | `CogitatorTech/binharic-cli` | multi-provider | pesquisar endpoint |
| Darce | `AmerSarhan/darce-cli` | MIT, multi-model | pesquisar endpoint |
| CLAII | `agencyswarm/CLAII` | multi-agent/MCP | pesquisar endpoint |

### 5.2 Agentes generalistas e ecossistema OpenClaw

Estes podem consumir OmniRoute como backend, mas a task deve confirmar se a interface de configuracao e realmente uma CLI de codigo ou apenas um gateway de agente.

| Projeto | Repositorio | Possivel caminho |
|---|---|---|
| OpenClaw | `openclaw/openclaw` | provider/gateway; ja catalogado |
| nanobot | `HKUDS/nanobot` | provider OpenAI-compatible |
| ZeroClaw | `zeroclaw-labs/zeroclaw` | trait de provider |
| NanoClaw | `gavrielc/nanoclaw` | Anthropic SDK; pesquisar base |
| PicoClaw | `sipeed/picoclaw` | provider/config |
| IronClaw | `nearai/ironclaw` | provider Rust |
| NullClaw | `nullclaw/nullclaw` | 23+ providers |
| Clawith | `dataelement/Clawith` | gateway/teams |
| claw0 | `shareAI-lab/claw0` | tutorial/runtime; pesquisa de viabilidade |
| Moltis | `moltis-org/moltis` | provider Rust |
| GitClaw | `open-gitagent/gitclaw` | agente Git-native; pesquisar |
| LionClaw | `moshthepitt/lionclaw` | CLI local; pesquisar |
| Aizen | `aizen-stack/aizen` | OpenAI-compatible |
| aichat | `sigoden/aichat` | provider/model YAML |
| ShellGPT | `TheR1D/shell_gpt` | `API_BASE_URL` |
| gptme | `gptme/gptme` | `OPENAI_BASE_URL` |

### 5.3 Orquestradores, wrappers e ferramentas adjacentes

Nao sao todos alvos de um provider OmniRoute. Devem ser avaliados para launcher, ACP, MCP, observabilidade ou configuracao de seus agentes filhos.

| Projeto | Repositorio | Tipo de integracao a investigar |
|---|---|---|
| Agent Deck | `asheshgoplani/agent-deck` | config dos CLIs filhos; ja catalogado |
| VibePod | `VibePod/vibepod-cli` | wrapper Docker e metricas |
| zeroshot | `the-open-engine/zeroshot` | launcher/worktrees |
| Fractal | `plasma-ai/fractal` | orquestrador de CLIs |
| Bernstein | `chernistry/bernstein` | orquestrador/verificador |
| Traycer | `traycerai/traycer` | CLI custom e agentes filhos |
| h5i | `h5i-dev/h5i` | execucao paralela |
| OMK | `dmae97/open-multi-agent-kit` | control plane/provider-neutral |
| kodo | `ikamensh/kodo` | orquestrador |
| ORCH | `oxgeneral/ORCH` | fila de tarefas |
| LoopTroop | `LoopTroop-ai/LoopTroop` | orchestration sobre OpenCode |
| Galley | `shinpr/galley` | worktree/PR handoff |
| Relay | `jcast90/relay` | MCP/orquestracao |
| sage | `youwangd/SageCLI` | runtime-agnostic |
| 5dive | `5dive-ai/5dive` | agentes em servidor |
| agx | `ramarlina/agx` | checkpoints e agentes |
| claude-code-router | `musistudio/claude-code-router` | proxy/roteamento; possivel upstream consumidor |
| cc-router | `finch-xu/cc-router` | proxy Anthropic multi-provider |
| OneCLI | `onecli/onecli` | broker de credenciais, nao agente |
| agent-browser | `vercel-labs/agent-browser` | ferramenta MCP/plugin |
| OpenWork | `different-ai/openwork` | desktop sobre OpenCode |
| Mistral Vibe | `mistralai/mistral-vibe` | provider/base URL |
| Junie CLI | `junie.jetbrains.com` | fechado; configuracao BYOK a confirmar |
| Pool | `poolsideai/pool` | binario/EULA; sem PR presumido |

## 6. Evidencias tecnicas e mapeamento para OmniRoute

### 6.1 Padroes de endpoint encontrados

| Padrao observado | Exemplos | Acao OmniRoute |
|---|---|---|
| `OPENAI_BASE_URL`/`OPENAI_API_BASE` | Claw Code, RA.Aid, CoreCoder, Coro Code | fornecer root ou `/v1` conforme o cliente; testar append de path |
| `base_url`/`baseURL` em provider | Plandex, MiMo Code, Trae Agent, VT Code, KlaatCode | gerar bloco de provider e modelo |
| `LLM_BASE_URL` | OpenHands CLI | configurar surface OpenAI e validar streaming/tool calling |
| `GOOGLE_GEMINI_BASE_URL` | Gemini CLI | usar superficie `/v1beta`/Gemini; confirmar formato esperado |
| `GROK_BASE_URL` | Grok CLI | decidir se o cliente fala xAI ou OpenAI; testar traducoes |
| `--base-url` | Gitlawb Zero, Zot, jcode | launcher ou perfil persistido |
| `API_BASE_URL` | ShellGPT | config/env direta |
| `<PROVIDER>_API_URL`/gateway | Octomind, Pool, OpenSquilla | provider selecionavel; testar cada preset |
| ACP/MCP sem URL direta | Agentty, Kimi CLI, Goose, OpenCode | avaliar se OmniRoute deve ser provider ou backend ACP |
| endpoint nao customizavel | Cursor desktop, Antigravity, Kiro, Windsurf, Amp | somente MITM/guide; nao prometer integracao direta |

### 6.2 Superficies e riscos de protocolo

- **`/v1` duplicado:** alguns clientes recebem a raiz e acrescentam `/v1/chat/completions`; outros exigem a URL final com `/v1`. Cada task deve registrar o resultado real.
- **Chat Completions vs Responses:** forks do Codex e clientes modernos podem usar Responses; testar ambas quando o cliente permitir.
- **Anthropic:** clientes que mandam `/v1/messages` esperam `ANTHROPIC_BASE_URL` sem `/v1` no valor. A traducao Anthropic do OmniRoute deve ser validada com streaming e tool use.
- **Gemini:** Gemini CLI pode esperar uma base Gemini nativa, nao somente OpenAI-compatible; validar `generateContent`, streaming e headers.
- **Tool calling:** o agente pode exigir nomes/ids de ferramenta estaveis, JSON estrito, `tool_choice` ou blocos de pensamento especificos.
- **Descoberta de modelos:** `/v1/models` pode ser obrigatorio, opcional ou inexistente. O setup precisa aceitar `--model` fixo quando a descoberta nao for suportada.
- **Autenticacao:** alguns projetos leem somente env, outros gravam tokens em arquivo/keyring e alguns usam OAuth proprietario. Nunca reutilizar credenciais de um upstream sem verificar escopo.
- **Streaming e retry:** SSE, timeouts, abort signals e re-tentativas podem divergir do cliente. Validar uma chamada longa e uma falha de provider.
- **Licenca:** GPL/AGPL, EULA e repositorios sem SPDX exigem decisao de distribuicao antes de enviar patch.

## 7. Riscos de pesquisa e integracao

1. **Homonomimos e clones:** usar sempre URL canonica, organizacao, release e README do repositorio correto.
2. **Repositorios que mudam rapidamente:** congelar commit/versao no relatorio da task e repetir a consulta no dia da implementacao.
3. **README divergente do codigo:** procurar schema, parser de config, testes e comando de execucao; README sozinho e evidencia Tier 1.
4. **Clientes fechados:** registrar como `needs-mitm` ou `config-only`, nunca como PR upstream.
5. **Forks com historia de origem controversa:** avaliar politica, licenca e aceite de contribuicoes antes de reproduzir componentes.
6. **Segredos no ambiente:** limpar `OMNIROUTE_API_KEY` e chaves de teste quando a suite assume ambiente sem credencial, como ocorreu no jcode.
7. **Mudancas no checkout:** usar worktree em `.claude/worktrees/` por projeto; nao editar o checkout compartilhado do OmniRoute nem usar `git stash`.

## 8. Recomendacao

Executar primeiro os lotes P0/P1 do documento de prioridade. Cada lote pode ter ate tres subagentes, um repositorio por worktree. O agente principal deve revisar a pesquisa, o smoke test e a licenca antes de permitir implementacao. O resultado de cada caso deve atualizar o tracker com commit, PR/issue, validacao e status upstream, sem preencher campos externos por suposicao.

## 9. Referencias

- OmniRoute CLI catalogo: `src/shared/constants/cliTools.ts`
- OmniRoute CLI reference: `docs/reference/CLI-TOOLS.md`
- OmniRoute setup guide: `docs/guides/CLI-INTEGRATIONS.md`
- Handoff jcode: `_tasks/hands-off/2026-08-01_release-v3.8.50_v3.8.50_sess-e1846bc2/handoff.md`
- Inventario curado: `https://github.com/bradAGI/awesome-cli-coding-agents`
- GitHub Search API: `https://api.github.com/search/repositories`
