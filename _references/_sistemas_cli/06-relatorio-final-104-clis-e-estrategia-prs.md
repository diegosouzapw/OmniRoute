# Relatório final — campanha de 104 integrações CLI OmniRoute

**Data de fechamento:** 2026-08-03  
**Escopo:** `CLI-000` a `CLI-103`  
**Resultado:** `104/104` pesquisados (`100%`), `0` pendentes de pesquisa.

## Como consultar o resultado individual

O documento autoritativo, com uma linha para cada caso, é o [tracker completo](./04-tracker-integracoes-clis.md). Ele contém para cada ID:

- prioridade;
- projeto e repositório;
- classificação de integração;
- estado de contribuição upstream;
- branch e commit quando existentes;
- URL de PR e/ou issue quando publicados;
- estado no catálogo OmniRoute;
- observações, limitações, testes e próximo passo.

Além do tracker, existem fichas técnicas individuais em `_tasks/cli-integrations/`. A cobertura foi auditada e agora há uma ficha para cada ID `CLI-000`–`CLI-103`; o caso `CLI-000` jcode foi adicionado como ficha de referência nesta revisão.

## Resumo quantitativo

| Grupo operacional | Quantidade | Tratamento |
|---|---:|---|
| Configuração direta ou indireta | 76 | Documentar receita, validar smoke e só abrir PR se houver melhoria upstream real |
| Contribuição upstream (PR/issue/docs/patch) | 17 | Preparar diff mínimo, validar, revisar e publicar conforme política do repositório |
| Patch obrigatório | 4 | Implementar genericamente, com RED→GREEN/TDD e revisão do mantenedor |
| Bloqueados/fechados | 4 | Registrar bloqueio; usar apenas MCP ou canal oficial, sem MITM |
| MCP/wrapper/ACP como caminho principal | 2 | Integrar a camada de ferramentas/orquestração, sem falsificar provider de inferência |
| Outros casos híbridos | 1 | Seguir a combinação específica descrita no tracker |

Os números são derivados do campo `Tipo` do tracker; categorias podem se sobrepor em casos híbridos. Atualmente há **7 PRs reais** e **9 issues reais** registrados no tracker, além de cinco entradas locais marcadas como integradas ao catálogo OmniRoute. Nenhum link foi inventado para os 97 casos sem publicação externa.

## O que foi feito na campanha

1. Inventário inicial e busca extensa de CLIs, runtimes, harnesses e control-planes.
2. Priorização P0–P4 considerando compatibilidade de protocolo, adoção, licença, maturidade e risco.
3. Pesquisa fresca, uma a uma, em worktrees isoladas, em lotes de no máximo três agentes.
4. Uso de Codebase Memory para índices upstream e verificação de cobertura; faixas parciais foram lidas diretamente quando aplicável.
5. Classificação por configuração, patch, PR documental, issue-first, MCP, wrapper ou bloqueio.
6. Registro de comandos, base URL, autenticação, modelos, streaming, tools, reasoning, imagens, MCP/ACP/A2A, testes e limitações.
7. Consolidação de cada lote com commit separado no OmniRoute e no repositório `_tasks`.
8. Atualização final do tracker, plano de integração, plano de publicação e handoff.
9. Nenhuma credencial real, publicação externa ou técnica de interceptação não autorizada foi utilizada.

## Estratégia para abrir PRs em 100% dos casos

“Abrir PR para 100%” deve ser interpretado como **dar um destino upstream apropriado a 100% dos casos**, e não criar 104 PRs artificiais. Há quatro trilhas:

### Trilha A — PR de código ou documentação

Aplicar aos casos `viable-upstream`, `pr-generic`, `pr-docs`, `patch-required` e híbridos que tenham superfície pública e política de contribuição compatível.

Processo por caso:

1. Reconfirmar HEAD, licença, branch default, política de contribuição e duplicatas.
2. Criar worktree/branch baseada na versão local vigente.
3. Executar baseline upstream e registrar falhas preexistentes.
4. Escrever teste RED que demonstre a lacuna.
5. Implementar o menor patch genérico possível — preferir `openai-compatible`, `base_url` ou provider abstrato a um provider nominal OmniRoute.
6. Executar GREEN: testes focados, suite upstream, lint, format, typecheck/build e smoke com fake server ou OmniRoute local usando placeholder.
7. Revisar segurança: nenhuma chave em argv, logs, fixtures, URL ou artefato; erros sanitizados; streaming/tools/cancelamento cobertos.
8. Abrir PR somente se contribuições externas forem aceitas. O corpo deve explicar problema, solução genérica, compatibilidade, testes, limitações e não conter marketing/texto de IA.
9. Se o repositório bloquear fork/PR ou pedir discussão prévia, abrir issue de proposta com o mesmo patch/reprodução, sem enviar PR prematuramente.
10. Atualizar tracker com branch, commit, URL, CI, revisão e resposta do mantenedor; acompanhar até `accepted`, `merged`, `rejected` ou `awaiting-maintainer`.

### Trilha B — Issue-first, discussão ou suporte ao mantenedor

Aplicar quando a arquitetura é adequada, mas há bloqueio de governança, firewall, CLA, fork fechado, dúvida de protocolo ou necessidade de decisão do autor. A issue deve conter:

- caso de uso OmniRoute;
- configuração atualmente possível;
- lacuna reproduzível;
- proposta genérica;
- impacto de segurança;
- testes/fake server;
- disposição para enviar PR após aprovação.

Não abrir uma PR paralela enquanto a política exigir issue-first.

### Trilha C — Config-only documentado

Aplicar aos casos em que o upstream já suporta a integração e uma mudança de código seria redundante. O entregável é:

- ficha individual;
- receita validada;
- smoke test e limitações;
- eventual documentação externa/local do OmniRoute;
- issue somente se houver pedido de documentação ou descoberta de bug real.

Não criar provider nominal ou PR apenas para adicionar a palavra “OmniRoute”.

### Trilha D — MCP, wrapper ou bloqueio seguro

Aplicar a control-planes, produtos fechados e CLIs sem rota de inferência substituível. O resultado pode ser:

- MCP remoto/stdio do OmniRoute;
- wrapper local claramente identificado como wrapper;
- solicitação oficial de custom provider;
- registro de bloqueio e gate legal/ToS.

Nunca mascarar OmniRoute como Claude/Codex, falsificar executável, interceptar TLS ou reutilizar tokens privados para fabricar uma PR upstream.

## Ordem recomendada de execução

1. **Primeiro:** PRs e issues já preparadas ou com alto retorno e baixo risco — jcode, Gemini CLI, Claw Code, Plandex, Trae Agent, Every Code, VT Code e CoreCoder.
2. **Segundo:** patches genéricos com boa superfície OSS — AutoCodeRover, Galley, 5dive e demais casos `pr-generic`/`patch-required`.
3. **Terceiro:** issues aguardando decisão — Open Codex, Kimi CLI, Devon, g3, Free Code, Claude Engineer e casos com `awaiting-maintainer`.
4. **Quarto:** documentação e receitas config-only agrupadas por ecossistema — OpenCode, Codex, LiteLLM, AI SDK, OpenAI-compatible e Anthropic-compatible.
5. **Quinto:** MCP/plugins para produtos fechados — Windsurf, Amp, Kiro, Cowork e Cursor, sempre pela superfície oficial.

Cada rodada deve manter no máximo três agentes ativos. O agente principal revisa o resultado do trio antes de liberar o próximo.

## Critério de encerramento por caso

Um caso só pode ser marcado como finalizado quando possui: pesquisa, classificação, evidência de protocolo, baseline ou limitação reproduzível, receita/patch/bloqueio, validação proporcional, estado de publicação e próximo passo. Para produtos fechados, `blocked-closed` ou `MCP-only` é um resultado válido e preferível a uma PR não autorizada.

## Estado de publicação atual

Os únicos links de publicação comprovados devem continuar sendo os registrados no tracker. O fato de existir uma branch local de pesquisa não significa que exista PR upstream. A matriz de verdade é:

- PR/issue preenchida: publicação real;
- campo `—`: nenhuma publicação externa comprovada;
- `not-applicable`: configuração ou bloqueio sem contribuição upstream;
- `awaiting-maintainer`: contato feito, aguardando decisão;
- `published-pr`/`published-issue`: URL real presente no tracker.

## Próxima fase

A pesquisa está encerrada. A próxima fase é execução controlada da Trilha A/B/C/D, começando pelos casos com maior retorno e menor risco, com revisão central antes de qualquer push, PR, issue ou contato externo.
