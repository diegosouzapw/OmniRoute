# Plano executavel de integracao de CLIs

> **Status final (2026-08-03):** a fase de pesquisa foi concluída em lotes de até três worktrees/agentes, cobrindo `104/104` casos. Este documento continua válido como processo operacional para implementação/publicação. Consulte `06-relatorio-final-104-clis-e-estrategia-prs.md` para o resultado final.

**Data:** 2026-08-01  
**Objetivo:** pesquisar, integrar, validar e publicar suporte ao OmniRoute em todos os projetos tecnicamente possiveis, mantendo uma fila que permite ate tres subagentes simultaneos.

O ciclo especifico de preparacao, revisao, envio e acompanhamento das contribuicoes upstream esta
em `05-plano-publicacao-prs-upstream.md`.

## 1. Principios operacionais

- Um repositorio por subagente e por worktree.
- No maximo tres tasks de repositorios em execucao ao mesmo tempo.
- Cada task pesquisa o upstream novamente antes de editar; o relatorio inicial e somente contexto.
- O agente principal revisa licenca, arquitetura, smoke test e diff antes do proximo lote.
- Nao usar checkout compartilhado para desenvolvimento e nao usar `git stash`/`git pop`.
- Usar worktrees em `.claude/worktrees/` e branches especificas.
- Nao inventar PR, issue, commit ou aceite de mantenedor.
- Nao adicionar trailers ou rodapes de IA em commits/PRs.

## 2. Fases obrigatorias por projeto

### Fase 0 - Preparacao da task

Criar uma task com nome do projeto, URL canonica, prioridade, evidencia inicial, estado no catalogo OmniRoute e objetivo de integrar. Definir a worktree e o agente responsavel.

### Fase 1 - Pesquisa individual fresca

O agente deve verificar no upstream atual:

- arquitetura de providers e ponto de entrada do CLI;
- arquivo/schema de configuracao e suporte a `base_url`, `baseURL`, `OPENAI_BASE_URL`, `OPENAI_API_BASE`, `LLM_BASE_URL` ou equivalente;
- protocolo real (Chat Completions, Responses, Anthropic Messages, Gemini, ACP, MCP ou outro);
- descoberta de modelos e necessidade de `/v1/models`;
- autenticacao, keyring, OAuth e variaveis de ambiente;
- streaming, tool calling, reasoning e limites conhecidos;
- politica de contribuicao, licenca e se PR de fork externo e aceito;
- atividade, releases, issues/PRs sobre providers customizados ou endpoints locais;
- comandos de build, lint, teste e smoke test;
- possibilidade de fork/PR, issue de proposta, documentacao ou apenas wrapper/MITM.

Registrar commit/release pesquisado e links de evidencia.

### Fase 2 - Gate de viabilidade

Classificar exatamente um caminho inicial:

`viable-direct` (somente configuracao), `viable-upstream` (mudanca no upstream), `viable-acp`, `viable-mcp`, `needs-wrapper`, `needs-mitm`, `config-only`, `blocked` ou `research-more`.

Nao implementar antes de haver uma conclusao de viabilidade e uma razao verificavel.

### Fase 3 - Baseline e TDD

- Executar a suite recomendada pelo upstream antes das mudancas.
- Registrar falhas preexistentes, dependencias ausentes e comandos exatos.
- Limpar `OMNIROUTE_API_KEY` e demais credenciais quando os testes pressupuserem ambiente sem chaves.
- Adicionar primeiro um teste de configuracao, endpoint e selecao de modelo que falhe sem a integracao.

### Fase 4 - Implementacao minima

Implementar apenas o necessario para o caso pesquisado:

- perfil/preset `omniroute` ou provider custom;
- base URL correta (raiz, `/v1` ou `/v1beta` conforme o cliente);
- chave via ambiente ou mecanismo seguro do cliente;
- modelo fixo ou descoberta de modelos;
- selecao/login/report se o CLI tiver esses fluxos;
- documentacao de uso e limites;
- testes de config e chamada.

Se o upstream nao aceitar mudanca, preparar wrapper/launcher ou documentacao local e registrar a limitacao.

### Fase 5 - Validacao funcional

Executar, conforme o protocolo:

- build, lint, typecheck e testes do upstream;
- smoke request com OmniRoute;
- streaming SSE e encerramento por abort;
- tool calling e JSON de argumentos;
- `/v1/models` ou equivalente;
- Chat Completions, Responses, Anthropic Messages e Gemini `generateContent` quando aplicavel;
- fallback/erro, timeout, retry e modelo inexistente;
- teste com chave limpa e teste com `OMNIROUTE_API_KEY` real fora dos logs.

### Fase 6 - Publicacao upstream

- Criar fork somente quando permitido e branch especifica.
- Abrir PR upstream se contribuicoes externas forem aceitas.
- Se PR externo for bloqueado, abrir issue com proposta, patch/referencia e smoke test.
- Se o projeto for fechado/EULA, registrar config manual ou issue de produto; nao criar PR ficticio.
- Atualizar o tracker com URL, commit, estado e resposta do mantenedor.

### Fase 7 - Catalogo e integracao OmniRoute

Quando houver valor para usuarios OmniRoute:

- criar worktree propria do OmniRoute;
- atualizar `src/shared/constants/cliTools.ts` ou `src/shared/constants/cliToolsGrokBuild.ts`;
- atualizar detector em `src/lib/cli-helper/tool-detector.ts` se necessario;
- adicionar gerador/configurador e rota de settings somente se o caso exigir;
- adicionar testes do catalogo, detector, settings, `baseUrlSupport` e `/v1`;
- atualizar `docs/reference/CLI-TOOLS.md`, `docs/guides/CLI-INTEGRATIONS.md` e README quando apropriado;
- atualizar o tracker com a integracao local e evidencias.

### Fase 8 - Fechamento

Registrar commit, branch, PR/issue, testes, limitacoes, status do upstream, status do catalogo OmniRoute e proximo passo. O agente principal faz uma revisao final de seguranca, licenca e factualidade.

## 3. Lotes de ate tres subagentes

O lote e uma unidade operacional. A fila abaixo e ordenada pelo documento `02-prioridade-integracoes-clis.md`; cada linha representa uma task individual.

### Lote 0 - consolidacao do caso de referencia

- `CLI-000` - jcode - manter a issue #704, validar resposta do mantenedor e concluir a secao do README OmniRoute.

### Lote P0.1

- `CLI-001` - Gemini CLI - integrar provider/base URL Gemini.
- `CLI-002` - Claw Code - integrar `OPENAI_BASE_URL`/provider OmniRoute.
- `CLI-003` - Plandex - integrar provider custom com `baseUrl`.

### Lote P0.2

- `CLI-004` - MiMo Code - integrar provider OpenAI-compatible.
- `CLI-005` - Trae Agent - integrar `model_providers` e `base_url`.
- `CLI-006` - Kimi CLI - integrar modos OpenAI/Responses/Anthropic.

### Lote P0.3

- `CLI-007` - Every Code - integrar perfil derivado do Codex.
- `CLI-008` - Open Codex - integrar provider multi-modelo.
- `CLI-009` - VT Code - integrar `custom_providers` e failover.

### Lote P0.4

- `CLI-010` - OpenHands CLI - integrar `LLM_BASE_URL`.
- `CLI-011` - gptme - integrar `OPENAI_BASE_URL`.
- `CLI-012` - Nanocoder - integrar API OpenAI-compatible.

### Lote P0.5

- `CLI-013` - RA.Aid - integrar `OPENAI_API_BASE`.
- `CLI-014` - CoreCoder - integrar `OPENAI_BASE_URL`.
- `CLI-015` - Grok CLI - integrar `GROK_BASE_URL`.

### Lote P1.1

- `CLI-016` - Gitlawb Zero - integrar provider custom e `--base-url`.
- `CLI-017` - DeepSeek Reasonix - confirmar e integrar endpoint.
- `CLI-018` - KlaatCode - integrar `customModels`.

### Lote P1.2

- `CLI-019` - CodeMini CLI - integrar `gateway.base_url`.
- `CLI-020` - Zot - integrar flag/config `--base-url`.
- `CLI-021` - Octomind - integrar provider URL envs.

### Lote P1.3

- `CLI-022` - DvalinCode - integrar OpenAI-compatible.
- `CLI-023` - Coro Code - integrar `OPENAI_BASE_URL`.
- `CLI-024` - Mini-Kode - integrar `MINIKODE_BASE_URL`.

### Lote P1.4

- `CLI-025` - Late CLI - integrar `OPENAI_BASE_URL`/`api-url`.
- `CLI-026` - Agentty - integrar provider e/ou ACP.
- `CLI-027` - Aizen - integrar `AIZEN_BASE_URL`.

### Lote P1.5

- `CLI-028` - Clif-Code - integrar providers OpenAI/Anthropic/Ollama.
- `CLI-029` - Minacode - confirmar provider e integrar URL.
- `CLI-030` - YottaCode - integrar gateway/provider.

### Lote P1.6

- `CLI-031` - aichat - integrar models YAML/provider.
- `CLI-032` - ShellGPT - integrar `API_BASE_URL`.
- `CLI-033` - Mistral Vibe - integrar base URL/provider.

### Lote P1.7

- `CLI-034` - OpenSquilla - integrar gateway/provider.
- `CLI-035` - Kode CLI - integrar endpoint multi-provider.
- `CLI-036` - Neovate Code - integrar plugin/provider.

### Lote P1.8

- `CLI-037` - Deep Agents Code - integrar provider do pacote CLI.
- `CLI-038` - OpenHands principal - integrar CLI/config.
- `CLI-039` - SWE-agent - integrar backend/provider.

### Lote P1.9

- `CLI-040` - AutoCodeRover - integrar backend/provider.
- `CLI-041` - Claurst - integrar provider, respeitando GPL.
- `CLI-042` - Codebuff - integrar provider.

### Lote P2.1

- `CLI-043` - Devon - integrar backend.
- `CLI-044` - Letta Code - integrar provider.
- `CLI-045` - CodeMachine CLI - integrar provider.

### Lote P2.2

- `CLI-046` - Groq Code CLI - integrar endpoint.
- `CLI-047` - Dexto - integrar provider.
- `CLI-048` - claw-code-agent - integrar endpoint.

### Lote P2.3

- `CLI-049` - g3 - integrar provider Rust.
- `CLI-050` - San - integrar provider-neutral.
- `CLI-051` - Waveloom - integrar provider/endpoint.

### Lote P2.4

- `CLI-052` - picocode - integrar multi-LLM.
- `CLI-053` - QQCode - integrar config.
- `CLI-054` - Keen Code - integrar provider.

### Lote P2.5

- `CLI-055` - Grinta - integrar provider.
- `CLI-056` - Zap - integrar Claude/Gemini/OpenAI.
- `CLI-057` - Binharic - integrar multi-provider.

### Lote P2.6

- `CLI-058` - Darce - integrar multi-modelo.
- `CLI-059` - CLAII - integrar provider/MCP.
- `CLI-060` - nori-cli - integrar provider baseado em Codex.

### Lote P2.7

- `CLI-061` - cursor-agent clone - integrar provider.
- `CLI-062` - Free Code - pesquisar licenca e integrar se viavel.
- `CLI-063` - Claude Engineer - integrar provider.

### Lote P2.8

- `CLI-064` - Smol Developer - integrar SDK/adaptador.
- `CLI-065` - Agentless - integrar entrada de modelo.
- `CLI-066` - Amazon Q Developer CLI - pesquisar auth/provider.

### Lote P2.9

- `CLI-067` - nanobot - integrar provider OpenClaw-compatible.
- `CLI-068` - ZeroClaw - integrar trait de provider.
- `CLI-069` - NanoClaw - confirmar base Anthropic.

### Lote P2.10

- `CLI-070` - PicoClaw - integrar provider/config.
- `CLI-071` - IronClaw - integrar provider Rust.
- `CLI-072` - NullClaw - integrar provider.

### Lote P2.11

- `CLI-073` - Moltis - integrar provider Rust.
- `CLI-074` - GitClaw - integrar provider Git-native.
- `CLI-075` - LionClaw - integrar provider CLI.

### Lote P3.1 - wrappers e orquestradores

- `CLI-076` - VibePod; `CLI-077` - zeroshot; `CLI-078` - Fractal.

### Lote P3.2

- `CLI-079` - Bernstein; `CLI-080` - Traycer; `CLI-081` - h5i.

### Lote P3.3

- `CLI-082` - OMK; `CLI-083` - kodo; `CLI-084` - ORCH.

### Lote P3.4

- `CLI-085` - LoopTroop; `CLI-086` - Galley; `CLI-087` - Relay.

### Lote P3.5

- `CLI-088` - SageCLI; `CLI-089` - 5dive; `CLI-090` - agx.

### Lote P3.6

- `CLI-091` - claude-code-router; `CLI-092` - cc-router; `CLI-093` - OneCLI.

### Lote P3.7

- `CLI-094` - agent-browser; `CLI-095` - OpenWork; `CLI-096` - Agent Deck (revisao de agente filho).

### Lote P4 - fechados/MITM

- `CLI-097` - Pool; `CLI-098` - Junie CLI; `CLI-099` - Cursor desktop.
- `CLI-100` - Windsurf; `CLI-101` - Amp; `CLI-102` - Amazon Q/Kiro CLI; `CLI-103` - Cowork.

## 4. Criterio para iniciar o lote seguinte

O lote seguinte pode iniciar quando os tres agentes do lote atual tiverem: pesquisa upstream anexada, gate de viabilidade preenchido, baseline registrado, resultado de smoke test ou bloqueio reproduzivel, e tracker atualizado. Uma falha de um agente nao deve paralisar os outros dois; o agente principal deve marcar `blocked` ou `research-more` com evidencia e seguir a fila.

## 5. Entregaveis de cada task

1. Nota de pesquisa fresca com commit/release e links.
2. Classificacao de viabilidade.
3. Diff minimo ou conclusao documentada de que nao ha diff necessario.
4. Testes e comandos executados, incluindo falhas preexistentes.
5. PR/issue upstream ou justificativa de config-only/MITM.
6. Entrada no catalogo OmniRoute quando aplicavel.
7. Atualizacao do tracker `04-tracker-integracoes-clis.md`.
