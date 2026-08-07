# Plano de publicacao de integracoes OmniRoute nos repositorios upstream

> **Status da campanha de pesquisa:** `104/104` casos concluídos. Este plano continua sendo o procedimento de execução e publicação. A matriz final, inclusive os casos em que PR é inadequada ou impossível, está em `06-relatorio-final-104-clis-e-estrategia-prs.md`.

**Data:** 2026-08-01
**Escopo:** transformar a fila `CLI-000` a `CLI-103` em contribuicoes upstream verificadas,
publicando PR, issue, guia de configuracao, adaptador ou conclusao de bloqueio conforme o mecanismo
real de cada projeto.
**Documentos-base:** `01-relatorio-pesquisa-clis-omniroute.md`,
`02-prioridade-integracoes-clis.md`, `03-plano-integracao-em-lotes.md` e
`04-tracker-integracoes-clis.md`.

## 1. Resultado esperado

Para cada repositorio pesquisado, a campanha deve produzir exatamente um resultado principal:

1. **PR upstream de integracao nominal:** adiciona provider/preset `omniroute`, configuracao,
   documentacao e testes quando isso combina com a arquitetura do projeto.
2. **PR upstream de compatibilidade generica:** melhora suporte a endpoint customizado sem acoplar
   o projeto ao nome OmniRoute, acompanhado de documentacao comprovando o uso com OmniRoute.
3. **PR somente de documentacao:** registra uma configuracao funcional quando o codigo ja suporta
   OmniRoute e o upstream aceita guias de terceiros.
4. **Issue-first:** solicita decisao de arquitetura ou permissao antes do patch quando a politica do
   repositorio, o desenho de providers ou o tamanho da mudanca exigirem alinhamento.
5. **Configuracao sem PR:** documenta no OmniRoute um fluxo que ja funciona e para o qual uma mudanca
   upstream seria redundante ou rejeitada pela politica do projeto.
6. **Adaptador ACP/MCP/wrapper:** contribui no ponto de extensao correto quando o projeto nao consome
   diretamente APIs de modelos.
7. **MITM, produto fechado ou bloqueado:** registra evidencia e nao fabrica uma contribuicao que o
   upstream nao pode receber.

O objetivo e tentar integrar todos os casos tecnicamente possiveis. O objetivo nao e abrir uma PR em
todo repositorio independentemente da arquitetura, licenca ou politica de contribuicao.

## 2. Regras da campanha

- Trabalhar em lotes de no maximo tres repositorios, com um subagente por repositorio.
- Usar uma worktree isolada por repositorio dentro de `.claude/worktrees/`.
- Nao editar implementacoes no checkout compartilhado.
- Nao usar `git stash` ou `git pop`.
- Fazer pesquisa fresca no commit atual do upstream antes de criar branch ou editar arquivos.
- Ler `README`, `CONTRIBUTING`, templates de issue/PR, `SECURITY`, licenca e instrucoes locais de
  agentes antes da implementacao.
- Procurar issues e PRs abertas/fechadas sobre custom provider, base URL, OpenAI-compatible,
  Anthropic-compatible, Gemini endpoint, proxy, gateway e OmniRoute antes de propor uma mudanca.
- Registrar a base pesquisada por commit SHA ou release. Nao usar apenas `main` como evidencia.
- Executar baseline antes da mudanca e distinguir falhas preexistentes de regressao.
- Nunca expor `OMNIROUTE_API_KEY` ou qualquer outra credencial em comandos publicados, fixtures,
  logs, commits, screenshots, PRs ou issues.
- Nao inserir trailers, assinaturas ou rodapes de IA em commits, PRs ou issues.
- Nao afirmar que uma integracao funciona sem um teste reproduzivel ou uma limitacao explicitamente
  registrada.
- Nao inventar fork, branch, commit, PR, issue, CI ou resposta de mantenedor.
- Atualizar `04-tracker-integracoes-clis.md` ao concluir cada fase material.

## 3. Unidade de trabalho por repositorio

Cada item `CLI-NNN` deve possuir uma task individual. A task e o pacote de contexto entregue ao
subagente e o registro que permite retomar o trabalho sem repetir ou perder evidencias.

### 3.1 Cabecalho obrigatorio da task

```md
# CLI-NNN - <projeto> - integracao OmniRoute upstream

- Repositorio canonico: <URL>
- Prioridade/lote: <P0-P4 / lote>
- Estado no catalogo OmniRoute: <integrated/not-in-catalog/parcial>
- Evidencia inicial: <resumo vindo do relatorio; ainda nao confirmado>
- Worktree: <caminho isolado>
- Branch planejada: <definir somente depois de ler as regras upstream>
- Commit/release pesquisado: —
- Responsavel: <agente>
- Estado: researching
```

### 3.2 Pesquisa obrigatoria dentro da task

O subagente deve responder, com links e caminhos de codigo:

1. Qual e o repositorio canonico, commit/release atual, licenca e nivel de atividade?
2. Contribuicoes de forks externos sao aceitas? Ha CLA, DCO, sign-off ou issue previa obrigatoria?
3. Qual e a arquitetura de providers e qual e o menor ponto de extensao?
4. O cliente usa Chat Completions, Responses, Anthropic Messages, Gemini, ACP, MCP ou protocolo
   proprietario?
5. A base URL esperada e raiz, `/v1`, `/v1beta` ou uma URL completa por operacao?
6. O cliente acrescenta algum sufixo automaticamente? Pode duplicar `/v1` ou `/v1beta`?
7. Como a autenticacao e resolvida: variavel de ambiente, arquivo, keyring, OAuth ou header custom?
8. Como os modelos sao definidos ou descobertos? O cliente chama um endpoint de modelos?
9. Streaming, tool calling, reasoning, imagens e cancelamento funcionam pelo caminho escolhido?
10. Ja existe issue, PR, discussao ou documentacao para endpoints customizados ou OmniRoute?
11. Quais comandos oficiais executam install, format, lint, typecheck, build e testes?
12. Qual contribuicao agrega valor real: codigo nominal, compatibilidade generica, docs, issue,
    wrapper, MCP/ACP, somente configuracao ou nenhum patch?

### 3.3 Gate de contribuicao

Antes de editar, preencher uma decisao:

| Decisao | Quando usar | Saida esperada |
|---|---|---|
| `pr-provider` | O upstream possui catalogo/presets de providers | Provider/preset OmniRoute, docs e testes |
| `pr-generic` | Falta uma capacidade generica necessaria, como base URL customizavel | Patch generico, docs e teste com OmniRoute |
| `pr-docs` | O codigo ja funciona e o upstream aceita guias de integracao | Guia minimo e validado |
| `issue-first` | Mudanca arquitetural, politica incerta ou mantenedor exige proposta | Issue com evidencia e desenho do patch |
| `config-only` | Tudo funciona por configuracao e um PR seria redundante | Guia no OmniRoute e smoke test |
| `adapter-acp` | ACP e o ponto real de integracao | Adaptador/registro ACP e testes |
| `adapter-mcp` | MCP e o ponto real de integracao | Config/servidor MCP e testes |
| `wrapper` | O projeto apenas lanca outro agente | Wrapper/env forwarding e teste do filho |
| `needs-mitm` | Endpoint fechado ou fixo | Pesquisa/guia MITM separado; sem PR artificial |
| `blocked` | Licenca, politica, build ou protocolo impedem progresso | Evidencia reproduzivel e proximo desbloqueio |

O gate deve incluir a alternativa rejeitada. Exemplo: `pr-provider` escolhido porque o repositorio
mantem presets nomeados; `pr-docs` rejeitado porque a configuracao exigiria cinco campos internos e
nao seria uma experiencia suportada.

## 4. Ciclo completo da PR

### Fase PR-0 - Preparar o contexto

- Reservar o item no tracker e marcar pesquisa em andamento.
- Confirmar que nenhum outro agente esta trabalhando no mesmo repositorio.
- Resolver o repositorio canonico, fork existente e permissao de contribuicao.
- Criar a task individual com a evidencia inicial marcada como hipotese.
- Criar a worktree isolada somente depois de confirmar o upstream correto.

### Fase PR-1 - Pesquisar upstream e contribuicoes existentes

- Ler integralmente as regras do repositorio aplicaveis aos arquivos que podem mudar.
- Mapear provider registry, configuracao, transporte HTTP, auth, modelo, streaming e ferramentas.
- Pesquisar issues/PRs por termos de compatibilidade e pelo nome OmniRoute.
- Registrar commit/release, caminhos e links de evidencia na task.
- Escolher o gate de contribuicao da secao 3.3.

### Fase PR-2 - Baseline reproduzivel

- Instalar dependencias de acordo com o upstream.
- Rodar format check, lint, typecheck/build e testes relevantes antes do patch.
- Rodar um smoke test do caminho existente, mesmo que ele falhe por falta da integracao.
- Limpar chaves do ambiente nos testes que validem o comportamento sem credenciais.
- Registrar comando, codigo de saida, testes aprovados e falhas preexistentes.
- Se o projeto nao puder ser construido, tentar o ambiente documentado e registrar o bloqueio; nao
  declarar regressao nem compatibilidade com base apenas na leitura do README.

### Fase PR-3 - Desenhar o menor patch aceitavel

A ordem de preferencia e:

1. Reusar a abstracao de provider ja existente.
2. Adicionar metadados/preset antes de criar codigo especial.
3. Reusar cliente OpenAI/Anthropic/Gemini ja presente.
4. Adicionar capacidade generica quando ela beneficiar outros gateways e for coerente com o projeto.
5. Criar executor/adapter dedicado somente quando o protocolo realmente divergir.

O patch normalmente deve cobrir:

- identificador e nome de exibicao `omniroute`, se presets nomeados forem aceitos;
- base URL correta e sem dupla concatenacao de versao;
- chave obtida de ambiente ou storage seguro;
- configuracao/descoberta de modelo;
- headers estritamente necessarios;
- streaming e tool calling preservados;
- mensagens de erro sem expor segredo;
- documentacao curta e executavel;
- testes unitarios/integracao alinhados ao padrao upstream.

Nao adicionar telemetria, dependencia, fluxo de login ou codigo de rede novo quando o provider
generico existente ja resolve o caso.

### Fase PR-4 - Implementar com teste primeiro

- Criar teste que demonstre a ausencia do preset, config ou comportamento requerido.
- Confirmar a falha pelo motivo esperado.
- Implementar o menor patch.
- Fazer o teste passar e executar testes adjacentes.
- Refatorar apenas o necessario para manter o padrao do upstream.
- Formatar somente os arquivos tocados, salvo exigencia contraria do repositorio.

Para PR somente de documentacao, substituir o teste vermelho por uma validacao real dos comandos e
do arquivo de configuracao documentado. Nao sintetizar exemplos que nao foram executados.

### Fase PR-5 - Validar contra OmniRoute

Escolher a matriz compativel com o cliente:

| Superficie | Base inicial esperada | Validacoes minimas |
|---|---|---|
| OpenAI Chat Completions | confirmar se o cliente espera raiz ou `/v1` | chamada simples, stream, tool call, erro de modelo |
| OpenAI Responses | confirmar regra de concatenacao do cliente | resposta simples, stream/eventos, tool call |
| Anthropic Messages | normalmente base antes de `/v1/messages`; confirmar no codigo | mensagem, stream, tools, headers de versao |
| Gemini | normalmente base antes das operacoes `v1beta`; confirmar no codigo | generateContent, streamGenerateContent, tools |
| ACP | endpoint/transport definido pelo protocolo | discovery, sessao, request e cancelamento |
| MCP | stdio, SSE ou Streamable HTTP conforme suporte | inicializacao, listagem e invocacao de ferramenta |

Registrar no resultado quais linhas da matriz foram executadas, omitidas ou bloqueadas. Um smoke
test simples nao deve ser apresentado como prova de tool calling ou streaming.

### Fase PR-6 - Revisar o diff antes de publicar

O agente responsavel faz uma auto-revisao e o agente principal verifica:

- aderencia a `CONTRIBUTING` e instrucoes locais;
- escopo minimo e ausencia de refactor oportunista;
- testes cobrindo config, URL, auth sem segredo e modelo;
- documentacao consistente com o codigo executado;
- ausencia de arquivos gerados, caches, logs ou credenciais;
- licenca e atribuicao preservadas;
- branch baseada no upstream atual;
- commits pequenos e com mensagem no estilo do projeto;
- ausencia de trailers ou texto de IA;
- `git diff --check` e gates oficiais limpos, ou falhas preexistentes documentadas.

Uma PR nao deve ser publicada enquanto houver alteracao sem explicacao, teste essencial faltando ou
duvida material sobre a politica do upstream.

### Fase PR-7 - Preparar a publicacao

- Confirmar fork e remotes sem sobrescrever branches existentes.
- Atualizar a branch sobre o ponto exigido pelo upstream usando operacao nao destrutiva.
- Enviar a branch ao fork somente depois da revisao.
- Criar PR contra a branch correta do repositorio canonico.
- Se a contribuicao externa estiver bloqueada, abrir issue-first e anexar o commit/patch de
  referencia somente quando isso for permitido.
- Registrar URLs reais no tracker imediatamente apos a publicacao.

Convencoes de branch sugeridas, sujeitas ao padrao de cada upstream:

- `feat/omniroute-provider` para provider/preset nominal;
- `feat/custom-base-url` para capacidade generica;
- `docs/omniroute-setup` para documentacao validada;
- `fix/custom-endpoint-versioning` para correcao de raiz versus `/v1`/`/v1beta`.

### Fase PR-8 - Corpo da PR

Usar o template oficial do repositorio quando existir. Na ausencia de template, adaptar:

```md
## Why

Explain the user problem and the existing extension point. Avoid marketing claims.

## What changed

- Add or enable the smallest provider/configuration path required.
- Document the verified setup.
- Cover URL, authentication and model selection behavior with tests.

## Verification

- `<official upstream command>`
- `<focused test command>`
- `<sanitized OmniRoute smoke test and result>`

## Compatibility notes

- API surface: `<Chat Completions/Responses/Anthropic/Gemini/ACP/MCP>`
- Base URL rule: `<root, /v1, /v1beta or full operation URL>`
- Streaming: `<verified/not applicable/not verified>`
- Tool calling: `<verified/not applicable/not verified>`

## Scope

No unrelated refactors or credential changes.
```

O titulo deve descrever a mudanca, nao a campanha. Exemplos de formato, sujeitos ao estilo do
upstream: `Add OmniRoute provider preset`, `Support configurable OpenAI-compatible base URLs` ou
`Document OmniRoute as a custom endpoint`.

### Fase PR-9 - Issue-first ou fallback

Quando uma PR direta nao for apropriada, a issue deve conter:

- problema reproduzivel e publico afetado;
- ponto de extensao encontrado no codigo;
- proposta minima;
- compatibilidade esperada e protocolo;
- evidencia de teste ou prototipo;
- pergunta objetiva ao mantenedor;
- link para patch de referencia apenas se permitido.

Nao abrir simultaneamente issue e PR sem necessidade. Se o template exigir issue previa, esperar a
decisao ou seguir a politica declarada.

### Fase PR-10 - Acompanhar ate a decisao

Depois da publicacao:

- observar CI e checks obrigatorios;
- responder perguntas tecnicas com evidencia;
- corrigir somente o escopo da contribuicao ou pedidos claros do mantenedor;
- reexecutar testes depois de cada mudanca;
- registrar novos commits, revisoes e estado no tracker;
- marcar `accepted` somente depois de merge/aceite comprovado;
- marcar `rejected` com o motivo fornecido pelo upstream;
- se a PR ficar inativa, registrar `awaiting-maintainer`, sem declarar abandono prematuramente;
- manter o guia/catalogo OmniRoute coerente com o estado real do upstream.

O acompanhamento pode usar a skill `babysit` individualmente para uma PR aberta. Como essa skill
acompanha uma unica PR, nunca agrupar tres PRs em uma mesma execucao dela.

### Fase PR-11 - Fechar a task

Uma task individual termina com:

- pesquisa fresca e gate registrados;
- diff, configuracao ou bloqueio documentado;
- baseline e validacao final comparados;
- branch/commit reais, quando criados;
- PR/issue reais, quando publicados;
- status no catalogo OmniRoute;
- limitacoes e proximo passo;
- linha correspondente no tracker atualizada.

## 5. Estrategia de paralelizacao

### 5.1 Papeis por lote

- **Subagente A:** primeiro repositorio do lote; dono exclusivo da worktree e do diff upstream.
- **Subagente B:** segundo repositorio do lote; dono exclusivo da worktree e do diff upstream.
- **Subagente C:** terceiro repositorio do lote; dono exclusivo da worktree e do diff upstream.
- **Agente principal:** coordena o tracker, revisa gates/diffs, impede duplicacao e autoriza a
  publicacao depois das evidencias.

Todos os agentes devem ser avisados de que nao estao sozinhos no workspace e nao podem reverter ou
sobrescrever mudancas de outros agentes.

### 5.2 Barreira do lote

O lote seguinte pode comecar quando os tres itens atuais tiverem, no minimo:

1. commit/release upstream pesquisado;
2. gate de contribuicao definido;
3. baseline registrado;
4. patch validado, configuracao comprovada ou bloqueio reproduzivel;
5. decisao de publicacao tomada;
6. tracker atualizado.

A espera por resposta de mantenedor nao bloqueia o lote seguinte. Depois de uma PR/issue publicada,
o item passa para acompanhamento e libera o slot de implementacao.

### 5.3 Limite de trabalho em progresso

- No maximo tres pesquisas/implementacoes ativas.
- Publicacoes aguardando mantenedor nao contam como slot de implementacao, mas ficam no tracker.
- No maximo uma task ativa por repositorio, inclusive forks ou variantes do mesmo upstream.
- Se dois itens resolverem o mesmo repositorio, consolidar a pesquisa e decidir se ha uma ou duas
  contribuicoes antes de abrir branches.

## 6. Fila de publicacao

A ordem detalhada continua sendo a do `03-plano-integracao-em-lotes.md`. Esta secao define o objetivo
de publicacao de cada onda; a pesquisa individual pode promover, rebaixar ou mudar o tipo de
contribuicao.

### Onda 0 - referencia e infraestrutura da campanha

- `CLI-000` jcode: acompanhar issue upstream e PR de referencia; concluir a secao prometida no
  README do OmniRoute.
- Preparar o modelo de task individual e aplicar o mesmo tracker a todos os novos repositorios.

### Onda 1 - P0.1 a P0.5

- `CLI-001` Gemini CLI: confirmar se o endpoint Gemini customizado pede apenas docs/config ou um
  preset nominal.
- `CLI-002` Claw Code: confirmar provider OpenAI-compatible e propor preset/docs minimos.
- `CLI-003` Plandex: confirmar o registro de providers customizados e propor provider/preset.
- `CLI-004` MiMo Code: confirmar o adapter OpenAI-compatible e propor configuracao/provider.
- `CLI-005` Trae Agent: confirmar `model_providers` e propor entrada OmniRoute/documentacao.
- `CLI-006` Kimi CLI: escolher uma superficie suportada e evitar um patch que misture tres
  protocolos sem testes.
- `CLI-007` Every Code: reutilizar a arquitetura herdada do Codex quando ainda aplicavel.
- `CLI-008` Open Codex: confirmar upstream canonico e propor provider multi-modelo.
- `CLI-009` VT Code: validar provider customizado, modelo e failover.
- `CLI-010` OpenHands CLI: verificar se `LLM_BASE_URL` torna o caso docs/config-only.
- `CLI-011` gptme: verificar se `OPENAI_BASE_URL` torna o caso docs/config-only.
- `CLI-012` Nanocoder: confirmar compatibilidade de tool calling e decidir preset versus docs.
- `CLI-013` RA.Aid: verificar se `OPENAI_API_BASE` torna o caso docs/config-only.
- `CLI-014` CoreCoder: verificar se `OPENAI_BASE_URL` torna o caso docs/config-only.
- `CLI-015` Grok CLI: confirmar se o endpoint e genericamente configuravel ou preso ao protocolo
  Grok antes de propor patch.

### Onda 2 - P1.1 a P1.9

- `CLI-016` Gitlawb Zero: provider custom/flag; preferir docs ou preset pequeno.
- `CLI-017` DeepSeek Reasonix: confirmar repositorio, atividade e endpoint antes de qualquer PR.
- `CLI-018` KlaatCode: integrar via `customModels` ou preset se o catalogo aceitar nomes.
- `CLI-019` CodeMini CLI: validar `gateway.base_url` e sua regra de versao.
- `CLI-020` Zot: validar `--base-url` e `models.json`; docs-first se ja suficiente.
- `CLI-021` Octomind: confirmar variaveis de URL por provider e propor configuracao minima.
- `CLI-022` DvalinCode: confirmar o cliente OpenAI-compatible e testes disponiveis.
- `CLI-023` Coro Code: confirmar `OPENAI_BASE_URL`; docs-first se nao houver lacuna de codigo.
- `CLI-024` Mini-Kode: confirmar `MINIKODE_BASE_URL`; docs-first se nao houver lacuna de codigo.
- `CLI-025` Late CLI: testar ambiente e flag `api-url`; corrigir precedencia apenas se necessario.
- `CLI-026` Agentty: escolher entre provider direto e ACP conforme a arquitetura atual.
- `CLI-027` Aizen: validar `AIZEN_BASE_URL` e propor docs/preset.
- `CLI-028` Clif-Code: selecionar um unico protocolo principal para a primeira contribuicao.
- `CLI-029` Minacode: pesquisa confirmatoria antes de definir o tipo de PR.
- `CLI-030` YottaCode: confirmar gateway/provider e selecao de modelo.
- `CLI-031` aichat: integrar via configuracao de modelos ou provider nominal, conforme a politica.
- `CLI-032` ShellGPT: validar `API_BASE_URL` e decidir docs/config-only.
- `CLI-033` Mistral Vibe: confirmar base URL customizada e separar suporte generico de marca.
- `CLI-034` OpenSquilla: localizar o registro de gateways e propor provider/preset.
- `CLI-035` Kode CLI: escolher OpenAI, Anthropic ou Gemini com base na implementacao mais nativa.
- `CLI-036` Neovate Code: preferir plugin/provider oficial ao patch no core, se existir.
- `CLI-037` Deep Agents Code: contribuir no pacote CLI/provider correto, nao apenas no SDK generico.
- `CLI-038` OpenHands principal: evitar duplicar `CLI-010`; consolidar se ambos apontarem para o
  mesmo mecanismo e upstream.
- `CLI-039` SWE-agent: confirmar backend de modelos e interface publica suportada.
- `CLI-040` AutoCodeRover: confirmar backend e propor config/provider minimo.
- `CLI-041` Claurst: revisar GPL e politica antes de redistribuir qualquer adaptacao.
- `CLI-042` Codebuff: confirmar se o provider e extensivel e se contribuicoes externas sao aceitas.

### Onda 3 - P2.1 a P2.11

- `CLI-043` Devon, `CLI-044` Letta Code e `CLI-045` CodeMachine CLI: pesquisar backend real;
  revisar a entrada local ja existente de Letta antes de nova PR.
- `CLI-046` Groq Code CLI, `CLI-047` Dexto e `CLI-048` claw-code-agent: confirmar endpoints,
  protocolos e maturidade antes do patch.
- `CLI-049` g3, `CLI-050` San e `CLI-051` Waveloom: localizar a abstracao de provider e preferir
  implementacao generica.
- `CLI-052` picocode, `CLI-053` QQCode e `CLI-054` Keen Code: validar configuracao multi-modelo e
  documentar o caminho minimo.
- `CLI-055` Grinta, `CLI-056` Zap e `CLI-057` Binharic: escolher o provider compativel com melhor
  cobertura de streaming/tools.
- `CLI-058` Darce, `CLI-059` CLAII e `CLI-060` nori-cli: separar integracao de modelo de MCP e de
  codigo herdado do Codex.

Resultado P2.6:

- `CLI-058` Darce: `config-only`, sem PR necessária; usar `DARCE_API_BASE` na raiz e `DARCE_MODEL`.
- `CLI-059` CLAII: patch genérico local validado, mas publicação bloqueada pela declaração upstream
  `All Rights Reserved`/ausência de licença OSS; só reconsiderar com autorização jurídica explícita.
- `CLI-060` nori-cli: `config-only` via agente ACP customizado OpenCode; não alterar backend Codex;
  MCP deve ser configurado uma vez, em Nori ou OpenCode, para evitar duplicação de tools.
- `CLI-061` cursor-agent clone, `CLI-062` Free Code e `CLI-063` Claude Engineer: revisar origem,
  licenca e politica do fork antes de publicar.

Lote P2.7 reservado em 2026-08-02, na branch-base local `release/v3.8.50` em
`35405be6020696a7c66158ea7a25f06d61ff88ff`. Os três upstreams foram clonados em worktrees
separadas, indexados e delegados. Nenhuma publicação está autorizada; patches só podem surgir após
prova RED→GREEN e permanecem sem commit até revisão central.

Resultado P2.7:

- `CLI-061` cursor-agent clone: `config-only`; OpenAI usa base com `/v1`, Anthropic usa raiz sem
  `/v1`; tools/tool-result foram comprovados nos dois protocolos. O factory rejeita `auto` puro,
  mas isso não impede uso com modelos reconhecíveis ou classes diretas. Sem PR.
- `CLI-062` Free Code: `config-only` com `ANTHROPIC_BASE_URL` na raiz e `model=auto`; stream,
  tools/tool-result e MCP nativo foram comprovados. O repo canônico agora é `freecodexyz/free-code`,
  mas não há licença e o README atribui o código à Anthropic; publicação bloqueada.
- `CLI-063` Claude Engineer: endpoint/chave funcionam como `config-only` com modelo fixo. A lacuna
  de `ANTHROPIC_MODEL` já está coberta pela PR #250; não criar patch concorrente. Arquivo de licença
  segue ausente apesar da issue #116, portanto publicação permanece bloqueada.
- `CLI-064` Smol Developer, `CLI-065` Agentless e `CLI-066` Amazon Q Developer CLI: decidir entre
  SDK/adaptador, config de modelo ou bloqueio por autenticacao.

Lote P2.8 iniciado em 2026-08-02 na branch-base local `release/v3.8.50`, SHA
`35405be6020696a7c66158ea7a25f06d61ff88ff`, com clones limpos e separados. Smol Developer será
testado primeiro como integração do SDK OpenAI legado; Agentless será avaliado por backend
OpenAI/Anthropic/DeepSeek; Amazon Q Developer CLI será tratado como protocolo AWS próprio, com MCP
avaliado separadamente. Não criar adaptador grande para Amazon Q nem qualquer publicação antes de
issue-first/coordenação exigida por `CONTRIBUTING.md`. Estado inicial: nenhum commit, fork, push,
PR, issue ou Discussion.

Resultado P2.8:

- `CLI-064` Smol Developer: `config-only`; `OPENAI_API_BASE` com `/v1` e `model=auto` passaram no
  CLI, biblioteca e Agent Protocol histórico. Não há lacuna provider-specific e a PR #134 já cobre
  uma expansão LiteLLM. Sem publicação.
- `CLI-065` Agentless: `config-only` pelo backend OpenAI, incluindo embeddings. Anthropic normal
  também funciona; cache/tools exige SDK histórico e DeepSeek possui host fixo, mas essas melhorias
  não são necessárias para integrar o projeto e propostas LiteLLM anteriores foram fechadas. Sem
  publicação.
- `CLI-066` Amazon Q Developer CLI: MCP stdio é a integração direta; o backend de modelo fala AWS
  JSON/EventStream e precisa de wrapper/backend novo. O upstream está em manutenção crítica e exige
  issue-first; não preparar PR nominal ou adaptador surpresa. Sem publicação.

Estado final P2.8: commits `0`, pushes `0`, forks `0`, PRs `0`, issues `0`, Discussions `0`.
Próxima fila: P2.9 (`CLI-067` nanobot, `CLI-068` ZeroClaw, `CLI-069` NanoClaw), usando no máximo
três worktrees/agentes e repetindo a pesquisa individual antes de qualquer patch.

Lote P2.9 iniciado em 2026-08-03 sobre a branch-base local `release/v3.8.50`, SHA
`84b1e5e12f238269e698f400766230f985f4a07b`. O checkout principal já continha uma alteração do
operador em `CLAUDE.md`, preservada fora do escopo. As worktrees foram recriadas e os upstreams
foram clonados nos HEADs `44b7e1bf4` (nanobot), `4770420ab` (ZeroClaw) e `dfac7e0af` (NanoClaw).
Os três índices Codebase Memory moderate estão ready, sem skipped, e a pesquisa foi delegada a um
agente por repositório. Nenhuma publicação está autorizada; o estado inicial continua: commits `0`,
pushes `0`, forks `0`, PRs `0`, issues `0`, Discussions `0`.

- `CLI-067` nanobot, `CLI-068` ZeroClaw e `CLI-069` NanoClaw: validar providers OpenClaw/Anthropic
  e evitar assumir que todos aceitam a mesma base URL.

Resultado P2.9:

- `CLI-067` nanobot: `config-only` pelo provider dinâmico OpenAI-compatible. A base correta inclui
  `/api/v1`; `omniroute/auto` seleciona o provider custom e envia `auto` no wire. Chat, SSE, tools,
  reasoning, usage, imagens, discovery e retry foram validados. Sem publicação upstream.
- `CLI-068` ZeroClaw: `config-only` pela família `custom`, com `uri=/v1`, modelo `auto`, wire Chat e
  `native_tools=true`. Responses é opt-in. Suite de provider, config, fmt e smoke HTTP passaram.
  Sem provider nominal ou publicação upstream.
- `CLI-069` NanoClaw: `config-only` pelo provider Claude existente, apontando a raiz Anthropic do
  OmniRoute sem `/v1/messages` e usando OneCLI para a credencial. Codex e OpenCode têm bloqueios
  upstream reproduzidos (#3155/#1984/#2985) e ficam fora do caminho de produção atual.

Estado final P2.9: commits `0`, pushes `0`, forks `0`, PRs `0`, issues `0`, Discussions `0`.
Progresso da pesquisa: `70/104` (`67,3%`); pendentes: `34/104` (`32,7%`). Próxima fila: P2.10
(`CLI-070` PicoClaw, `CLI-071` IronClaw, `CLI-072` NullClaw).
- `CLI-070` PicoClaw, `CLI-071` IronClaw e `CLI-072` NullClaw: localizar traits/registries e propor
  um provider pequeno com testes.
- `CLI-073` Moltis, `CLI-074` GitClaw e `CLI-075` LionClaw: confirmar atividade, provider e comandos
  de validacao antes da publicacao.

### Onda 4 - P3, integracoes indiretas

- `CLI-076`, `CLI-077`, `CLI-078`, `CLI-079`, `CLI-080` e `CLI-081`: pesquisar forwarding de
  ambiente/configuracao para os agentes filhos;
  publicar wrapper ou docs somente quando houver um ponto de extensao real.
- `CLI-082`, `CLI-083`, `CLI-084`, `CLI-085`, `CLI-086`, `CLI-087`, `CLI-088`, `CLI-089` e
  `CLI-090`: escolher ACP, MCP, launcher ou integracao do agente filho; nao apresentar uma
  integracao de orquestrador como provider de modelo.
- `CLI-091` e `CLI-092`: tratar como interoperabilidade entre proxies; documentar loops, headers,
  auth e riscos antes de propor codigo.
- `CLI-093` e `CLI-094`: integrar como broker/ferramenta MCP somente se isso estiver no escopo dos
  projetos.
- `CLI-095` e `CLI-096`: configurar o agente filho e revisar a entrada existente de Agent Deck.

### Onda 5 - P4, fechados, EULA e MITM

- `CLI-097` Pool: confirmar o que a EULA permite; priorizar configuracao local e nao presumir PR.
- `CLI-098` Junie CLI: pesquisar canal oficial de feedback; sem repositorio publico confirmado, nao
  existe fila de PR.
- `CLI-099` Cursor desktop, `CLI-100` Windsurf, `CLI-101` Amp, `CLI-102` Amazon Q/Kiro CLI e
  `CLI-103` Cowork: tratar como MITM, configuracao de produto ou pedido oficial de feature. So mover
  para PR se um repositorio publico e uma politica de contribuicao forem comprovados.

## 7. Prompt operacional para cada subagente

O agente principal deve adaptar e enviar este prompt para cada item:

```text
Voce e responsavel exclusivamente por CLI-NNN - <projeto> no repositorio <URL>.
Voce nao esta sozinho no workspace: nao reverta, sobrescreva ou reorganize mudancas de outros
agentes. Trabalhe somente na worktree isolada atribuida dentro de .claude/worktrees/ e nunca use
git stash/pop.

Primeiro pesquise o upstream atual. Leia README, CONTRIBUTING, licenca, templates e instrucoes locais.
Registre commit/release, arquitetura de providers, config/base URL, protocolo, auth, modelos,
streaming, tool calling, issues/PRs existentes e comandos oficiais de build/test. A evidencia inicial
do relatorio e uma hipotese, nao uma conclusao.

Antes de editar, classifique o caso como pr-provider, pr-generic, pr-docs, issue-first, config-only,
adapter-acp, adapter-mcp, wrapper, needs-mitm ou blocked, com justificativa. Execute o baseline e
registre falhas preexistentes. Se houver patch, trabalhe com teste primeiro e implemente somente a
menor integracao coerente com o upstream. Confirme raiz versus /v1 versus /v1beta, autenticacao,
modelo, streaming e tool calling conforme aplicavel.

Nao publique nada antes da revisao do agente principal. Entregue: pesquisa com links/caminhos,
gate, baseline, diff, testes, smoke test sanitizado, riscos, branch/commit local se criados e a
atualizacao proposta para 04-tracker-integracoes-clis.md. Nao invente dados e nao exponha chaves.
```

## 8. Checklist de autorizacao para enviar uma PR

O agente principal somente autoriza a publicacao quando todas as respostas forem `sim` ou houver
uma excecao registrada:

- [ ] O repositorio canonico e a branch-alvo foram confirmados.
- [ ] A politica aceita o tipo de contribuicao planejado.
- [ ] Issues/PRs duplicadas foram pesquisadas.
- [ ] O commit/release de base esta registrado.
- [ ] O gate de contribuicao esta justificado.
- [ ] O baseline foi executado e falhas preexistentes estao separadas.
- [ ] O patch e o menor necessario e segue a arquitetura upstream.
- [ ] A base URL e sua regra de versao foram verificadas no codigo e em runtime.
- [ ] Auth/modelos foram testados sem vazar segredo.
- [ ] Streaming/tool calling foram testados ou marcados explicitamente como nao aplicaveis.
- [ ] Testes, lint, format, typecheck/build relevantes foram executados.
- [ ] A documentacao foi executada e corresponde ao codigo.
- [ ] O diff nao contem caches, builds, logs, credenciais ou refactors sem relacao.
- [ ] O titulo e o corpo seguem o template upstream e nao contêm marketing ou texto de IA.
- [ ] O tracker esta pronto para receber branch, commit e URL reais.

## 9. Campos adicionais recomendados no tracker

O tracker atual deve continuar como fonte principal. Durante a execucao, registrar nas observacoes ou
em uma nota individual:

- commit/release pesquisado;
- decisao `pr-provider`, `pr-generic`, `pr-docs`, `issue-first`, `config-only`, adapter, wrapper,
  MITM ou bloqueio;
- protocolo e regra da base URL;
- comandos de baseline e resultado;
- comandos finais e resultado;
- smoke tests realizados;
- arquivos modificados;
- fork, branch e commit;
- PR/issue e estado de CI/review;
- limitacoes e proximo passo.

Campos ainda nao comprovados permanecem `—`.

## 10. Inicio recomendado

O primeiro ciclo de publicacao deve usar o lote P0.1:

1. `CLI-001` - Gemini CLI (`google-gemini/gemini-cli`)
2. `CLI-002` - Claw Code (`ultraworkers/claw-code`)
3. `CLI-003` - Plandex (`plandex-ai/plandex`)

Os tres subagentes fazem pesquisa fresca e implementacao em paralelo, mas nenhuma PR e enviada antes
da revisao individual do agente principal. Ao publicar ou concluir config-only/bloqueio, atualizar o
tracker e liberar os mesmos tres slots para o lote P0.2.

## Lote P2.10 iniciado em 2026-08-03

Base local: `release/v3.8.50` em `84b1e5e12f238269e698f400766230f985f4a07b`. Worktrees isoladas e um agente por upstream foram criadas para `CLI-070` PicoClaw, `CLI-071` IronClaw e `CLI-072` NullClaw. Nenhuma publicação está autorizada; os agentes devem pesquisar o HEAD atual, provar `config-only` ou RED→GREEN e registrar governança, gates, smoke e estado limpo.

Resultado P2.10:

- `CLI-070` PicoClaw: `config-only`, `openai/auto` com base `/api/v1`; Chat/SSE/tools/usage/images/discovery. Go ausente impediu execução local; monitorar #3298, sem PR.
- `CLI-071` IronClaw: `config-only`, `openai_compatible` com `/api/v1` e `auto`; 889 testes do crate LLM, 5 de resolução e fmt passaram. Sem PR; reasoning proprietário segue limitado por #3673.
- `CLI-072` NullClaw: `config-only`, provider custom com Chat Completions recomendado e Responses/Anthropic como alternativas. Zig ausente; CI do mesmo HEAD verde. Sem PR.

Estado final P2.10: commits `0`, pushes `0`, forks `0`, PRs `0`, issues `0`, Discussions `0`.
Pesquisa acumulada: `73/104` (`70,2%`); pendentes: `31/104` (`29,8%`). Próxima fila: P2.11 (`CLI-073` Moltis, `CLI-074` GitClaw, `CLI-075` LionClaw).

Resultado P3.1:

- `CLI-076` VibePod: `config-only` pelo agente Claude Code com raiz Anthropic `/api`; wrapper injeta env no container. Codex sem chave automática permanece não comprovado.
- `CLI-077` zeroshot: `config-only` pelo gateway OpenAI `/api/v1`; 22 testes focados verdes; limitações de streaming JSON, reasoning e MCP registradas.
- `CLI-078` Fractal: `config-only` por Codex Responses em `CODEX_HOME` por node; servidores tmux quentes podem perder `OMNIROUTE_API_KEY`, recomendando fix genérico upstream.

Estado final P3.1: commits `0`, pushes `0`, forks `0`, PRs `0`, issues `0`, Discussions `0`. Pesquisa acumulada: `79/104` (`76,0%`); pendentes: `25/104` (`24,0%`).

Resultado P3.2: Bernstein `config-only` por openai_agents; Traycer `config-only` indireto pelo harness OpenCode; h5i `patch-required` porque auth proxy/egress são fixados em OpenAI. Nenhuma publicação externa. Pesquisa acumulada `82/104` (`78,8%`), pendentes `22/104` (`21,2%`).

Resultado P2.11:

- `CLI-073` Moltis: `config-only`, provider `custom-omniroute`, `/api/v1`, `auto`, Chat/SSE/tools e capacidades multimodais. 401 testes e fmt passaram. Sem publicação.
- `CLI-074` GitClaw/GitAgent: `config-only`, loader OpenAI-compatible com `GITAGENT_MODEL_BASE_URL`, `OPENAI_API_KEY` e `omniroute:auto`. Build, 65 testes e smoke passaram. Sem publicação.
- `CLI-075` LionClaw: `patch-required`/`issue-first`. O runtime Codex confinado não recebe `config.toml`/provider secret; preparar proposta genérica alinhada à [#157](https://github.com/moshthepitt/lionclaw/issues/157), sem PR até revisão do mantenedor.

Estado final P2.11: commits `0`, pushes `0`, forks `0`, PRs `0`, issues `0`, Discussions `0`. Pesquisa acumulada: `76/104` (`73,1%`); pendentes: `28/104` (`26,9%`).
Resultado P3.3: OMK `viable-mcp`; kodo `config-only` indireto; ORCH `needs-wrapper`. Pesquisa acumulada `85/104` (`81,7%`), pendentes `19/104` (`18,3%`). Nenhuma publicação externa.

Resultado P3.4: LoopTroop `config-only` indireto via provider OpenCode; Galley `patch-required` por não possuir transport OpenAI-compatible configurável; Relay `config-only` via provider profile/Codex, condicionado a smoke da Responses API e controles sobre ferramentas nativas. Nenhuma publicação externa. Pesquisa acumulada `88/104` (`84,6%`), pendentes `16/104` (`15,4%`).

Resultado P3.5: SageCLI `config-only` indireto via Codex, com caveat de env plaintext; 5dive `patch-required` por mapas fechados de provider/base; agx `config-only` indireto via Codex e com gates de Responses/sandbox. Pesquisa acumulada `91/104` (`87,5%`), pendentes `13/104` (`12,5%`). Nenhuma publicação externa.

Resultado P3.6: claude-code-router, cc-router e OneCLI são config-only; os dois primeiros oferecem endpoints custom OpenAI-compatible e OneCLI injeta credenciais por proxy MITM. Pesquisa acumulada `94/104` (`90,4%`), pendentes `10/104` (`9,6%`). Nenhuma publicação externa.

Resultado P3.7: agent-browser `config-only` direto por Chat Completions; OpenWork `config-only` via OpenCode custom; Agent Deck `config-only` via CLIs filhos. Pesquisa acumulada `97/104` (`93,3%`), pendentes `7/104` (`6,7%`). Nenhuma publicação externa.

Resultado P4.1: Pool e Junie são `config-only` OpenAI-compatible; Cursor é `config-only` limitado ao BYO chat panel, sem MITM/protocolo privado. Pesquisa acumulada `100/104` (`96,2%`), pendentes `4/104` (`3,8%`). Nenhuma publicação externa.

Resultado P4.2: Windsurf está bloqueado para inferência e permite apenas MCP; Amp depende de confirmação Enterprise; Amazon Q legado requer patch substancial e Kiro atual é MCP-only seguro. Pesquisa acumulada `103/104` (`99,0%`), pendente `1/104` (`1,0%`). Nenhuma publicação externa.

Resultado P4.3: Cowork não permite substituir oficialmente a inferência; Custom Connector MCP remoto é o único caminho suportado e permanece separado do modelo. Pesquisa concluída `104/104` (`100%`), pendentes `0/104` (`0%`). Nenhuma publicação externa nesta fase de pesquisa.
