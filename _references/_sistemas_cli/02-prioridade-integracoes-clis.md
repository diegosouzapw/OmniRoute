# Prioridade de integracoes de CLIs com OmniRoute

> **Status final (2026-08-03):** esta é a priorização inicial que orientou a execução. Todos os `104/104` casos já foram pesquisados. A classificação final está no tracker `04`; a estratégia revisada de contribuição está no relatório `06`.

**Snapshot:** 2026-08-01  
**Objetivo:** ordenar do melhor para o pior todos os projetos tecnicamente candidatos a consumir OmniRoute, sem remover projetos pequenos. A ordem e uma fila de pesquisa/execucao; ela nao e promessa de que todo upstream aceitara um PR.

## Como ler a prioridade

- **P0:** ja esta no catalogo OmniRoute ou tem evidencia muito forte de endpoint customizavel; executar/consolidar primeiro.
- **P1:** forte candidato novo, com provider/base URL evidente e bom retorno para o ecossistema.
- **P2:** tecnicamente promissor, mas requer confirmacao de protocolo, config, maturidade ou licenca.
- **P3:** possivel via ACP/MCP/wrapper/launcher, ou com menor adocao; pesquisar depois dos P0-P2.
- **P4:** cliente fechado, EULA, MITM ou pesquisa exploratoria; manter no inventario, mas nao bloquear os demais.

Os fatores usados foram: evidencia de endpoint arbitrario, adocao/atividade, facilidade de teste, compatibilidade OpenAI/Anthropic/Gemini, maturidade, licenca, chance de PR upstream, valor para usuarios OmniRoute e risco de protocolo.

## A. Catalogo OmniRoute ja existente

Estas entradas ja aparecem no registro local. A prioridade aqui significa consolidar documentacao, smoke tests, detector/configurador e eventual upstream nominal; nao significa recriar uma integracao que ja existe.

| Ordem | Projeto | Repositorio/documentacao | Estado local | Proximo foco |
|---:|---|---|---|---|
| A1 | Claude Code | `anthropics/claude-code` | catalogado; Anthropic base URL | manter compatibilidade Anthropic, streaming e tools |
| A2 | Codex CLI | `openai/codex` | catalogado; OpenAI-compatible | Responses, profiles e `/v1` |
| A3 | OpenCode | `anomalyco/opencode` | catalogado; provider | provider nativo/plugin e model discovery |
| A4 | Cline | `cline/cline` | catalogado; base URL | validar CLI/extension e append de `/v1` |
| A5 | Goose | `aaif-goose/goose` | catalogado; `OPENAI_HOST` | validar schema atual e ACP |
| A6 | Aider | `Aider-AI/aider` | catalogado; `OPENAI_API_BASE` | LiteLLM path, tools e custo |
| A7 | Continue | `continuedev/continue` | catalogado; provider OpenAI | CLI e config YAML atual |
| A8 | Kilo Code | `Kilo-Org/kilocode` | catalogado; custom URL | CLI, extension e auth |
| A9 | Roo Code | `RooCodeInc/Roo-Code` | catalogado; custom URL | CLI/headless e provider |
| A10 | Qwen Code | `QwenLM/qwen-code` | catalogado; `modelProviders` | V4 schema, Responses e env |
| A11 | Open Interpreter | `OpenInterpreter/open-interpreter` | catalogado; `--api_base` | streaming e tool execution |
| A12 | OpenClaw | `openclaw/openclaw` | catalogado; gateway/provider | config atual e segurança |
| A13 | Hermes Agent | `NousResearch/hermes-agent` | catalogado; provider/gateway | endpoint custom e modelos |
| A14 | Hermes | `NousResearch/hermes-agent` | catalogado/dual entry | distinguir CLI e agente |
| A15 | Oh My Pi | `can1357/oh-my-pi` | catalogado; YAML provider | auto-discovery e tool calling |
| A16 | Pi | `badlogic/pi-mono` | catalogado; provider | confirmar repositorio/CLI atual |
| A17 | Crush | `charmbracelet/crush` | catalogado; `base_url` | config TOML/JSON atual |
| A18 | Smelt | `leonardcser/smelt` | catalogado; OpenAI-compatible | headless e subagents |
| A19 | ForgeCode | `antinomyhq/forge` | catalogado; multi-provider | base URL e custom agents |
| A20 | jcode | `1jehuang/jcode` | integrado e proposto upstream | aguardar issue #704; manter README OmniRoute |
| A21 | DeepSeek TUI | `hunterbown/deepseek-tui` | catalogado legado | confirmar sucessor CodeWhale |
| A22 | CodeWhale | `Hmbown/CodeWhale` | catalogado | config primaria e legado |
| A23 | Grok Build | `xai-org/grok-build` | catalogado; `~/.grok/config.toml` | provider OmniRoute e modelos |
| A24 | Cursor Agent CLI | `cursor.com/cli` | catalogado parcial | confirmar limites de endpoint |
| A25 | Factory Droid | `Factory-AI/factory` | catalogado parcial | BYOK e endpoint suportado |
| A26 | GitHub Copilot CLI | `github/copilot-cli` | catalogado | provider base URL atual |
| A27 | Letta CLI | `letta-ai/letta-code` | catalogado | config pi-ai/local mode |
| A28 | Warp AI | `warpdotdev/Warp` | catalogado parcial | somente BYOK/desktop |
| A29 | Agent Deck | `asheshgoplani/agent-deck` | catalogado | agentes filhos e ACP |
| A30 | Antigravity | produto Google | MITM backlog | nao tratar como endpoint direto |
| A31 | Kiro AI | produto AWS | MITM backlog | auth/SSO e MITM |
| A32 | Cursor desktop | produto Anysphere | cloud/MITM | manter separado do Cursor CLI |

## B. Novos candidatos em ordem de execucao

| Ordem | Prioridade | Projeto | Repositorio | Evidencia inicial | Rota esperada |
|---:|:---:|---|---|---|---|
| 1 | P0 | Gemini CLI | `google-gemini/gemini-cli` | `GOOGLE_GEMINI_BASE_URL` | config direta/Gemini |
| 2 | P0 | Claw Code | `ultraworkers/claw-code` | `OPENAI_BASE_URL`, provider | OpenAI-compatible |
| 3 | P0 | Plandex | `plandex-ai/plandex` | provider com `baseUrl` | preset/provider |
| 4 | P0 | MiMo Code | `XiaomiMiMo/MiMo-Code` | `@ai-sdk/openai-compatible`, `baseURL` | provider |
| 5 | P0 | Trae Agent | `bytedance/trae-agent` | `model_providers`, `base_url` | provider/config |
| 6 | P0 | Kimi CLI | `MoonshotAI/kimi-cli` | OpenAI legacy/Responses/Anthropic, `base_url` | provider nativo |
| 7 | P0 | Every Code | `just-every/code` | fork Codex, OpenAI/Claude/Gemini | profile/provider |
| 8 | P0 | Open Codex | `ymichael/open-codex` | OpenAI/Gemini/OpenRouter/Ollama | profile/provider |
| 9 | P0 | VT Code | `vinhnx/vtcode` | `custom_providers[].base_url` | provider/failover |
| 10 | P0 | OpenHands CLI | `OpenHands/OpenHands-CLI` | `LLM_BASE_URL` | config direta |
| 11 | P0 | gptme | `gptme/gptme` | `OPENAI_BASE_URL` | config direta |
| 12 | P0 | Nanocoder | `Nano-Collective/nanocoder` | qualquer OpenAI-compatible | config direta |
| 13 | P0 | RA.Aid | `ai-christianson/RA.Aid` | `OPENAI_API_BASE` | config direta |
| 14 | P0 | CoreCoder | `he-yufeng/CoreCoder` | `OPENAI_BASE_URL` | config direta |
| 15 | P1 | Grok CLI | `superagent-ai/grok-cli` | `GROK_BASE_URL`/`baseURL` | config direta |
| 16 | P1 | Gitlawb Zero | `Gitlawb/zero` | `custom-openai-compatible`, `--base-url` | provider/flag |
| 17 | P1 | DeepSeek Reasonix | `esengine/DeepSeek-Reasonix` | endpoint/provider compativel | provider |
| 18 | P1 | KlaatCode | `KlaatAI/klaatcode` | `customModels` OpenAI-compatible | config |
| 19 | P1 | CodeMini CLI | `havingautism/Codemini-CLI` | `gateway.base_url` | gateway |
| 20 | P1 | Zot | `patriceckhart/zot` | `--base-url`, `models.json` | flag/config |
| 21 | P1 | Octomind | `Muvon/octomind` | provider URL envs | provider/env |
| 22 | P1 | DvalinCode | `arthurpanhku/dvalincode` | qualquer OpenAI-compatible | config direta |
| 23 | P1 | Coro Code | `Blushyes/coro-code` | `OPENAI_BASE_URL` | env |
| 24 | P1 | Mini-Kode | `minmaxflow/mini-kode` | `MINIKODE_BASE_URL` | env |
| 25 | P1 | Late CLI | `mlhher/late-cli` | `OPENAI_BASE_URL`, `api-url` | env/flag |
| 26 | P1 | Agentty | `1ay1/agentty` | provider-agnostic, ACP | config/ACP |
| 27 | P1 | Aizen | `aizen-stack/aizen` | Rust OpenAI-compatible, `AIZEN_BASE_URL` | config |
| 28 | P1 | Clif-Code | `DLhugly/Clif-Code` | OpenAI/Anthropic/Ollama | provider |
| 29 | P1 | Minacode | `hit9/minacode` | provider/compatibilidade | confirmar URL |
| 30 | P1 | YottaCode | `yottadynamics/yottacode` | modelo escolhido/gateway | provider |
| 31 | P1 | aichat | `sigoden/aichat` | OpenAI/Claude/Gemini | models YAML |
| 32 | P1 | ShellGPT | `TheR1D/shell_gpt` | `API_BASE_URL` | env |
| 33 | P1 | Mistral Vibe | `mistralai/mistral-vibe` | `base_url`, API base | config |
| 34 | P1 | OpenSquilla | `opensquilla/opensquilla` | gateway, 20+ providers | provider |
| 35 | P1 | Kode CLI | `shareAI-lab/Kode-cli` | endpoint/Anthropic/OpenAI/Gemini | config |
| 36 | P1 | Neovate Code | `neovateai/neovate-code` | plugin/multi-provider | plugin/provider |
| 37 | P1 | Deep Agents Code | `langchain-ai/deepagents` | qualquer tool-calling LLM | provider SDK |
| 38 | P1 | Kode fork/variants | `shareAI-lab/Kode-cli` | multi-provider | confirmar upstream |
| 39 | P1 | OpenHands principal | `All-Hands-AI/OpenHands` | CLI/web; pesquisar LLM base | config/CLI |
| 40 | P1 | SWE-agent | `SWE-agent/SWE-agent` | agente de issues | backend/provider |
| 41 | P1 | AutoCodeRover | `AutoCodeRoverSG/auto-code-rover` | agente de patches | backend/provider |
| 42 | P2 | Claurst | `Kuberwastaken/claurst` | provider/Anthropic | config; licenca GPL |
| 43 | P2 | Codebuff | `CodebuffAI/codebuff` | multi-agent CLI | provider |
| 44 | P2 | Devon | `entropy-research/Devon` | TUI pair programmer | backend |
| 45 | P2 | Letta Code | `letta-ai/letta-code` | model-agnostic | provider |
| 46 | P2 | CodeMachine CLI | `moazbuilds/CodeMachine-CLI` | multi-agent local | provider |
| 47 | P2 | Groq Code CLI | `build-with-groq/groq-code-cli` | multi-model | endpoint |
| 48 | P2 | Dexto | `truffle-ai/dexto` | CLI/web/API | provider |
| 49 | P2 | claw-code-agent | `HarnessLab/claw-code-agent` | endpoint/gateway | provider |
| 50 | P2 | g3 | `dhanji/g3` | Rust provider abstraction | provider |
| 51 | P2 | San | `genai-io/san` | provider-neutral | provider |
| 52 | P2 | Waveloom | `Menfre01/waveloom` | DeepSeek/provider | endpoint |
| 53 | P2 | picocode | `jondot/picocode` | multi-LLM | config |
| 54 | P2 | QQCode | `qnguyen3/qqcode` | skills, Rust | config |
| 55 | P2 | Keen Code | `mochow13/keen-code` | 9+ providers | config |
| 56 | P2 | Grinta | `josephsenior/Grinta-Coding-Agent` | provider-agnostic | config |
| 57 | P2 | Zap | `zap-coding-agent/zap-coding-agent` | Claude/Gemini/OpenAI/LM Studio | provider |
| 58 | P2 | Binharic | `CogitatorTech/binharic-cli` | multi-provider | config |
| 59 | P2 | Darce | `AmerSarhan/darce-cli` | multi-model/streaming | config |
| 60 | P2 | CLAII | `agencyswarm/CLAII` | multi-agent/MCP | provider |
| 61 | P2 | nori-cli | `tilework-tech/nori-cli` | multi-provider sobre Codex | config |
| 62 | P2 | cursor-agent clone | `civai-technologies/cursor-agent` | Claude/OpenAI/Ollama | provider |
| 63 | P2 | Free Code | `paoloanzn/free-code` | fork Claude Code | licenca/config |
| 64 | P2 | Claude Engineer | `Doriandarko/claude-engineer` | CLI Claude | provider |
| 65 | P2 | Smol Developer | `smol-ai/developer` | agent embutivel | SDK/adaptador |
| 66 | P2 | Agentless | `OpenAutoCoder/Agentless` | workflow sem loop | entrada de modelo |
| 67 | P2 | Amazon Q Developer CLI | `aws/amazon-q-developer-cli` | CLI AWS | auth/provider |
| 68 | P2 | nanobot | `HKUDS/nanobot` | OpenClaw rewrite | provider |
| 69 | P2 | ZeroClaw | `zeroclaw-labs/zeroclaw` | providers pluggable | provider |
| 70 | P2 | NanoClaw | `gavrielc/nanoclaw` | Anthropic SDK | base URL |
| 71 | P2 | PicoClaw | `sipeed/picoclaw` | provider/config | provider |
| 72 | P2 | IronClaw | `nearai/ironclaw` | provider Rust | provider |
| 73 | P2 | NullClaw | `nullclaw/nullclaw` | 23+ providers | provider |
| 74 | P2 | Moltis | `moltis-org/moltis` | Rust agent | provider |
| 75 | P2 | GitClaw | `open-gitagent/gitclaw` | Git-native agent | provider |
| 76 | P2 | LionClaw | `moshthepitt/lionclaw` | CLI local | provider |
| 77 | P3 | VibePod | `VibePod/vibepod-cli` | wrapper Docker | launcher |
| 78 | P3 | zeroshot | `the-open-engine/zeroshot` | worktrees/orchestration | launcher |
| 79 | P3 | Fractal | `plasma-ai/fractal` | orquestra CLIs | launcher |
| 80 | P3 | Bernstein | `chernistry/bernstein` | executa/verifica agentes | launcher |
| 81 | P3 | Traycer | `traycerai/traycer` | agentes paralelos | launcher |
| 82 | P3 | h5i | `h5i-dev/h5i` | sandbox e peer review | launcher |
| 83 | P3 | OMK | `dmae97/open-multi-agent-kit` | control plane | ACP/MCP |
| 84 | P3 | kodo | `ikamensh/kodo` | orquestrador | launcher |
| 85 | P3 | ORCH | `oxgeneral/ORCH` | fila de tarefas | launcher |
| 86 | P3 | LoopTroop | `LoopTroop-ai/LoopTroop` | orquestrador OpenCode | launcher |
| 87 | P3 | Galley | `shinpr/galley` | worktree/PR | launcher |
| 88 | P3 | Relay | `jcast90/relay` | MCP/orquestracao | MCP |
| 89 | P3 | SageCLI | `youwangd/SageCLI` | runtime-agnostic | launcher/ACP |
| 90 | P3 | 5dive | `5dive-ai/5dive` | agentes em servidor | launcher |
| 91 | P3 | agx | `ramarlina/agx` | checkpoints | launcher |
| 92 | P3 | claude-code-router | `musistudio/claude-code-router` | proxy multi-provider | integrar como consumidor/proxy |
| 93 | P3 | cc-router | `finch-xu/cc-router` | proxy Anthropic | interoperabilidade |
| 94 | P3 | OneCLI | `onecli/onecli` | broker de credenciais | seguranca/integ. adjacente |
| 95 | P3 | agent-browser | `vercel-labs/agent-browser` | ferramenta para agentes | MCP/plugin |
| 96 | P3 | OpenWork | `different-ai/openwork` | desktop sobre OpenCode | config do agente filho |
| 97 | P4 | Pool | `poolsideai/pool` | `POOLSIDE_STANDALONE_BASE_URL`; EULA | config sem PR presumido |
| 98 | P4 | Junie CLI | `junie.jetbrains.com` | fechado/EAP | BYOK/endpoint a confirmar |
| 99 | P4 | Cursor desktop | `Anysphere` | cloud endpoint | MITM/guide |
| 100 | P4 | Windsurf | produto Codeium | sem base URL geral | MITM |
| 101 | P4 | Amp | `sourcegraph.com/amp` | fechado | MITM/sem PR |
| 102 | P4 | Amazon Q/Kiro CLI | AWS | SSO/ecossistema AWS | MITM/adapter |
| 103 | P4 | Cowork | produto Anthropic | endpoint opaco | MITM |

## C. Regra de promocao/rebaixamento

Um projeto sobe de prioridade quando a pesquisa individual confirma: configuracao documentada, teste local com OmniRoute, licenca permissiva e contribuicao aceita. Desce quando: a URL e fixa, o endpoint e somente SaaS, o README nao corresponde ao codigo, a autenticacao e inseparavel do provedor, ou a licenca/EULA impede redistribuicao. Nenhum projeto e marcado como impossivel sem registrar a evidencia no tracker.
