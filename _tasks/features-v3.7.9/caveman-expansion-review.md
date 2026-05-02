# Caveman Expansion Review - OmniRoute

Data da auditoria: 2026-05-02

Escopo: revisão ponta a ponta da implementação Caveman/Compression do OmniRoute contra:

- Upstream `JuliusBrussee/caveman`, referência local em `_references/_outros/caveman`
- Upstream remoto `https://github.com/JuliusBrussee/caveman`
- Relatório anterior em `/home/diegosouzapw/.gemini/antigravity/brain/6d2bd7d3-9684-4d40-97f0-43c4b41d0aee/artifacts/caveman_code_review.md.resolved`
- Plano/tarefas em `_tasks/features-v3.7.9`
- Código vivo no branch local `release/v3.7.8`

## Resumo executivo

A implementação atual é funcional e bem integrada ao pipeline do OmniRoute, mas ainda não entrega
paridade completa com a proposta Caveman original.

O ponto mais importante: o Caveman upstream reduz principalmente tokens de **saida** instruindo o
agente/modelo a responder de forma terse. O OmniRoute hoje implementa majoritariamente compressao
de **entrada** antes de chamar o provider. Isso e util, mas nao e a mesma funcionalidade economica:
sem uma camada opcional de "Caveman response mode" via system instruction/injecao de prompt, a
resposta nova do modelo continua podendo vir verbosa. A compressao atual so reduz historico/user/tool
context enviado ao provider.

Veredito:

- Base arquitetural: correta e mais ampla que o Caveman original para input/context compression.
- Paridade com Caveman core: parcial.
- Paridade com `caveman-compress`: parcial, falta validacao e hardening de preservacao.
- Paridade com `caveman-shrink`: nao implementada no MCP server do OmniRoute.
- Bloqueadores para "Caveman-level compression": existem, principalmente output-mode, regras P0,
  validacao, MCP description shrink e seguranca multimodal em modos agressivos.

## Fontes verificadas

### Upstream

A referencia local esta no mesmo HEAD do upstream remoto:

- Local: `_references/_outros/caveman`, commit `ef6050c5e1848b6880ff47c32ade1a608a64f85e`
- Tag local/remota: `v1.7.0`
- `git ls-remote https://github.com/JuliusBrussee/caveman.git HEAD` retornou o mesmo commit.

O release upstream `v1.7.0`, publicado em 2026-05-01, adicionou pontos importantes para esta
revisao:

- `/caveman-stats`: mede tokens reais em JSONL de sessao, nao apenas estimativa.
- `caveman-shrink`: proxy MCP que comprime `description` em `tools/list`, `prompts/list` e
  `resources/list`, preservando code/URLs/paths/identificadores.
- `cavecrew`: subagents com saida reduzida.
- Hardening: escrita segura de flags, sanitizacao de statusline, whitelist de modos, melhorias em
  `caveman-compress`.
- Skill changes: guard para simbolos em ultra, auto-clarity expandido, Typst/LaTeX protegidos.

Links upstream:

- https://github.com/JuliusBrussee/caveman
- https://github.com/JuliusBrussee/caveman/releases/tag/v1.7.0

### Implementacao OmniRoute revisada

Arquivos principais:

- `open-sse/handlers/chatCore.ts`
- `open-sse/services/compression/caveman.ts`
- `open-sse/services/compression/cavemanRules.ts`
- `open-sse/services/compression/preservation.ts`
- `open-sse/services/compression/strategySelector.ts`
- `open-sse/services/compression/aggressive.ts`
- `open-sse/services/compression/ultra.ts`
- `open-sse/services/compression/lite.ts`
- `open-sse/mcp-server/server.ts`
- `open-sse/mcp-server/tools/compressionTools.ts`
- `src/lib/db/compression.ts`
- `src/lib/db/compressionAnalytics.ts`
- `src/app/api/compression/preview/route.ts`
- `src/app/api/settings/compression/route.ts`
- `src/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab.tsx`

## O que ja esta bom

### Pipeline integrado no hot path

A compressao modular roda em `chatCore.ts` antes da traducao/envio ao provider:

- Carrega `getCompressionSettings()`.
- Resolve override por combo.
- Seleciona modo via `selectCompressionStrategy()`.
- Aplica `applyCompression()`.
- Registra stats em memoria, analytics SQLite e cache-aware stats.
- Depois ainda existe a compressao reativa `compressContext()` quando o contexto passa do limite.

Isso e uma integracao real, nao apenas codigo morto.

### Modos implementados

O OmniRoute tem cinco modos:

- `off`
- `lite`
- `standard` -> `cavemanCompress()`
- `aggressive` -> tool compression + progressive aging + summarizer + fallback
- `ultra` -> heuristic pruning

O Caveman upstream nao tenta fazer progressive aging, compressao de tool result, cache-aware
strategy ou analytics por provider. Nesses pontos, o OmniRoute vai alem da referencia.

### Configuracao persistida

`src/lib/db/compression.ts` persiste:

- `enabled`
- `defaultMode`
- `autoTriggerTokens`
- `cacheMinutes`
- `preserveSystemPrompt`
- `comboOverrides`
- `cavemanConfig`
- `aggressive`
- `ultra`

A API `/api/settings/compression` valida via Zod e normaliza o DB. O dashboard expoe controles
para modos, roles, skip rules, aggressive e ultra.

### Testes direcionados passam

Com Node 24.15.0 carregado diretamente de `~/.nvm`, estes conjuntos passaram:

```bash
PATH=/home/diegosouzapw/.nvm/versions/node/v24.15.0/bin:$PATH \
node --import tsx/esm --test \
  tests/unit/compression/caveman-rules.test.ts \
  tests/unit/compression/caveman-preservation.test.ts \
  tests/unit/compression/caveman-engine.test.ts \
  tests/unit/compression/caveman-structural.test.ts \
  tests/unit/compression/caveman-dedup.test.ts \
  tests/unit/compression/caveman-hedging.test.ts
```

Resultado: 57 passed, 0 failed.

```bash
PATH=/home/diegosouzapw/.nvm/versions/node/v24.15.0/bin:$PATH \
node --import tsx/esm --test \
  tests/golden-set/compression-quality.test.ts \
  tests/golden-set/compression-savings.test.ts \
  tests/unit/compression/golden-eval.test.ts
```

Resultado: 12 passed, 0 failed. Golden set reportou media de 19.5% de savings e preservacao de
key phrases 100%.

```bash
PATH=/home/diegosouzapw/.nvm/versions/node/v24.15.0/bin:$PATH \
node --import tsx/esm --test \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/compression/compressionMcpTools.test.ts \
  tests/unit/api/compression/compression-api.test.ts \
  tests/unit/compression/types.test.ts
```

Resultado: 44 passed, 0 failed.

## Gaps ja descritos no plano v3.7.9 e confirmados no codigo vivo

### GAP-1 - Falta modo Caveman de saida

Este gap nao esta destacado com forca suficiente no plano atual.

O upstream `caveman/SKILL.md` e essencialmente uma camada de instrucao: "responda terse, drop
articles/filler/pleasantries/hedging, preserve technical substance". Isso reduz output tokens no
ato da geracao.

O OmniRoute hoje:

- Comprime o request antes do provider.
- Nao injeta uma instrucao Caveman opcional no system prompt.
- Nao tem uma configuracao por API key/combo/provider para "responder em Caveman style".
- Nao reduz necessariamente o output novo gerado pelo modelo.

Consequencia: mesmo que `standard` comprima o prompt, a resposta do provider pode vir com "Sure,
I'd be happy to..." e consumir tokens de saida normalmente. Para paridade funcional com Caveman,
precisamos de uma feature separada: `responseCompressionStyle` ou `cavemanOutputMode`.

Recomendacao:

- Criar uma camada de output-style instruction, nao reescrever a resposta pos-geracao.
- Escopar por combo/API key/route para evitar alterar comportamento de clientes que esperam texto
  normal.
- Desativar automaticamente em security warnings, confirmacoes destrutivas e trechos onde
  auto-clarity pede linguagem completa.

### GAP-2 - Regras P0 do Caveman ainda faltam

`open-sse/services/compression/cavemanRules.ts` ainda nao possui:

- `articles`: remove `a/an/the`
- `pleasantries`: remove `sure/certainly/of course/happy to`
- `leader_phrases`: remove `I'll/I will/Let me/You can/We will`
- `redundant_phrasing`: `make sure to -> ensure`, `due to the fact that -> because`, etc.

O relatorio anterior e as tarefas 01, 02, 03 e 11 estao corretos. Esses gaps continuam reais.

Impacto:

- Savings do golden set atual ficam em 19.5% medio.
- O proprio teste se chama "should achieve average token savings >= 20%", mas no arquivo o assert
  real aceita `avgSavings >= 3`. Ou seja: a cobertura deixa passar uma regressao que contradiz o
  nome do teste.

### GAP-3 - `standard` so comprime `user` por default

`DEFAULT_CAVEMAN_CONFIG.compressRoles = ["user"]`.

Isso e conservador, mas significa que historico `assistant` e `system` nao sao comprimidos por
padrao. Se o objetivo e reduzir contexto de sessoes longas, historico de assistant geralmente e
grande fonte de tokens.

Recomendacao:

- Manter `system` preservado por padrao.
- Considerar `compressRoles: ["user", "assistant"]` para perfis agressivos ou combo override.
- Separar "input context compression" de "output response style" para nao misturar semantica.

### GAP-4 - `preservation.ts` ainda e fragil

Problemas confirmados:

- Fenced code usa regex simples: so cobre ``` com tag alfa e newline especifico.
- Nao cobre `~~~`.
- Nao cobre fences com 4+ backticks envolvendo fences internos.
- Placeholder previsivel `[PRESERVED_N]` pode colidir com texto do usuario.
- Nao preserva explicitamente `CONST_CASE`, `process.env`, `Array.from()`, versoes `3.7.9`,
  Typst/LaTeX/math/frontmatter/tabelas/headings.
- `restorePreservedBlocks()` faz `String.replace()` simples e troca a primeira ocorrencia do
  placeholder, mesmo se o usuario tiver escrito aquele literal antes da extracao.

As tarefas 04, 05, 06 e 08 continuam validas.

### GAP-5 - Nao ha validacao pos-compressao

Nao existe `open-sse/services/compression/validation.ts`.

O upstream `caveman-compress/scripts/validate.py` valida:

- headings
- code blocks byte-exact
- URLs
- paths
- bullet sanity
- inline code

No OmniRoute, se a regex de preservacao falhar, o texto comprimido segue para o provider sem
fallback ao original. Isso nao e aceitavel para fechar "100%" em contexto de proxy.

Recomendacao:

- Implementar validacao barata in-memory.
- Em erro: devolver mensagem original, registrar warning em stats e opcionalmente `validationErrors`
  para analytics/preview.

### GAP-6 - `caveman-shrink` nao foi portado para MCP

O upstream v1.7.0 publica `caveman-shrink` como proxy MCP. Ele comprime somente campos
`description` em listagens MCP e deliberadamente nao toca request payload nem tool-call response
bodies.

O OmniRoute e o proprio MCP server, mas `open-sse/mcp-server/server.ts` registra todas as tools com
descricoes originais. Nao existe `descriptionCompressor.ts`, middleware, hook de response ou
compressao em registration-time.

Impacto:

- Todo `tools/list` continua expondo descricoes longas ao cliente/modelo.
- O maior ganho novo do Caveman v1.7.0 para MCP ainda nao existe no OmniRoute.

Recomendacao:

- Criar `open-sse/mcp-server/descriptionCompressor.ts`.
- Comprimir no ponto de listagem/resposta, ou no minimo registrar descricoes comprimidas por config.
- Incluir `tools`, `prompts`, `resources` e `resourceTemplates`.
- Nao tocar tool responses.
- Adicionar setting/env para desligar, porque descricao MCP tambem e parte de UX/debug.

### GAP-7 - Preview existe, mas nao tem diff

`src/app/api/compression/preview/route.ts` retorna:

- `original`
- `compressed`
- token counts
- savings
- `techniquesUsed`
- `durationMs`

Nao retorna:

- removals por regra
- blocos preservados
- warnings de validacao
- diff estruturado
- regras aplicadas por trecho

Task 12 esta correta como melhoria. Status real: endpoint existe, diff nao.

### GAP-8 - Intensity sub-levels nao existem

O upstream tem `lite/full/ultra` dentro do Caveman. No OmniRoute, `lite/standard/aggressive/ultra`
sao estagios de pipeline, nao intensidades Caveman.

Task 09 continua valida:

- `standard + intensity=lite`: remove filler/hedging, mantem artigos.
- `standard + intensity=full`: classic Caveman.
- `standard + intensity=ultra`: abreviacoes de prosa, mas nunca simbolos/codigo.

## Novos gaps encontrados alem do relatorio/plano

### NEW-1 - Modos aggressive/ultra podem corromper multimodal

Este e o gap mais importante que nao apareceu no relatorio anterior.

`standard` evita comprimir multi-part `content` porque reconhece risco de duplicacao. Mas
`aggressive` e `ultra` ainda manipulam arrays:

- `aggressive.ts` extrai texto de arrays, mas `setContent()` substitui qualquer array por
  `[{ type: "text", text: newContent }]`. Isso descarta partes nao textuais, como `image_url`.
- `ultra.ts` junta todos os text parts e depois grava o mesmo texto comprimido em cada part
  textual. Se houver mais de um bloco de texto, pode duplicar/embaralhar conteudo. Ele preserva
  non-text parts, mas a semantica dos text parts pode mudar.

Impacto:

- Risco alto para `/v1/chat/completions` com multimodal.
- Pode remover imagens no modo `aggressive`.
- Pode alterar payload de entrada de forma invisivel antes do provider.

Recomendacao:

- P0 antes de ativar aggressive/ultra como default amplo.
- Para arrays: comprimir cada `{type:"text"}` isoladamente e preservar todos os outros parts
  byte-for-byte.
- Em `aggressive`, nunca transformar array multimodal em array so de texto.
- Adicionar golden tests multimodais para `standard`, `aggressive`, `ultra` e `lite`.

### NEW-2 - `autoTriggerTokens` sempre escolhe `lite`

`getEffectiveMode()` faz:

```ts
if (shouldAutoTrigger(config, estimatedTokens)) return "lite";
```

Isso significa que uma configuracao `enabled=true`, `defaultMode=standard/aggressive/ultra`,
`autoTriggerTokens=N` pode cair para `lite` quando o threshold e atingido, em vez de usar o modo
mais forte esperado.

Talvez isso tenha sido proposital para ser conservador, mas o nome "auto trigger" sugere "ligar
compressao quando passar do threshold", nao "downgrade para lite".

Recomendacao:

- Adicionar `autoTriggerMode?: CompressionMode`, default `lite` para compatibilidade.
- Ou mudar semantica para `return config.defaultMode` se defaultMode != off.
- Documentar no dashboard.

### NEW-3 - `preserveSystemPrompt` esta persistido, mas nao governa o pipeline

O setting existe no DB, API e UI, mas nao e consultado em `strategySelector.applyCompression()`.

Consequencias:

- `lite` sempre deduplica system prompts duplicados.
- `standard` depende apenas de `cavemanConfig.compressRoles`.
- `aggressive` pode processar historico com system messages via aging/summarizer conforme entrada.
- Usuario pode achar que ligou "preservar system prompt", mas a garantia real nao esta centralizada.

Recomendacao:

- Definir contrato exato: preservar byte-for-byte? nao comprimir? nao deduplicar?
- Implementar guard comum antes de todos os modos.
- Testar system prompt em todos os modos.

### NEW-4 - `cavemanConfig.preservePatterns` nao e usado

O campo aparece em:

- types
- DB normalization
- API schema
- dashboard textarea

Mas `cavemanCompress()` nao compila nem aplica `preservePatterns`.

Impacto:

- UI promete uma protecao que nao existe.
- Usuario pode cadastrar regex para preservar conteudo sensivel/critico e ainda assim as regras
  Caveman podem alterar esse texto.

Recomendacao:

- Compilar regex com validacao segura.
- Aplicar antes das regras usando a mesma camada de preserved blocks.
- Retornar erro de validacao na API se pattern for invalido, ou salvar como literal com escaping.

### NEW-5 - MCP compression configure aceita strings invalidas

`open-sse/mcp-server/tools/compressionTools.ts` aceita `strategy?: string` e
`aggressiveness?: string`, e repassa diretamente para `updateCompressionSettings()`.

O schema MCP tambem descreve `strategy: 'none' | 'standard' | 'aggressive' | 'ultra'`, mas:

- `none` nao e um `CompressionMode`; o modo real e `off`.
- `lite` existe no codigo, mas nao aparece na descricao.
- `aggressiveness` sugere `low/medium/high`, mas o handler grava isso em `defaultMode`.

`getCompressionSettings()` acaba ignorando `defaultMode` invalido na leitura e volta para default,
mas o tool response pode reportar estado confuso.

Recomendacao:

- Trocar schema para `z.enum(["off", "lite", "standard", "aggressive", "ultra"])`.
- Remover ou redefinir `aggressiveness`.
- Se quiser manter compat, mapear `none -> off`.
- Testar invalid input.

### NEW-6 - MCP compression status subconta modos nao-standard

`handleCompressionStatus()` calcula:

- `compressedRequests: analyticsSummary.byMode?.standard?.count || 0`
- `avgCompressionRatio: analyticsSummary.byMode?.standard?.avgSavingsPct || 0`

Se o usuario usar `lite`, `aggressive` ou `ultra`, o status retorna valores parciais.

Recomendacao:

- `compressedRequests = totalRequests` ou soma de `byMode`.
- `avgCompressionRatio = analyticsSummary.avgSavingsPct`.
- Incluir breakdown por modo no response.

### NEW-7 - Full `tests/unit/compression/*.test.ts` nao esta verde

Rodando a suite completa:

```bash
PATH=/home/diegosouzapw/.nvm/versions/node/v24.15.0/bin:$PATH \
node --import tsx/esm --test tests/unit/compression/*.test.ts
```

Resultado: 305 tests, 303 pass, 2 fail.

Falhas confirmadas isoladamente:

1. `tests/unit/compression/compressionAnalytics.test.ts`
   - Teste `empty table returns zeroed summary` espera `last24h: []`.
   - Codigo atual retorna 24 buckets zerados, o que parece comportamento deliberado para grafico.
   - Acao provavel: atualizar teste, nao codigo.

2. `tests/unit/compression/lite.test.ts`
   - Teste chama `replaceImageUrls(body, "gpt-3.5-turbo")` e espera placeholder.
   - Codigo atual so usa `supportsVision === false` quando `options` e objeto.
   - Acao: ou restaurar suporte a string/model heuristic, ou atualizar assinatura/teste e remover
     overload string.

Essas falhas nao bloqueiam especificamente Task 01-13, mas bloqueiam dizer que o modulo de
compressao esta 100% verde.

### NEW-8 - Dashboard lista regras Caveman de forma estatica

`CompressionSettingsTab.tsx` tem `ALL_CAVEMAN_RULES` hardcoded.

Quando adicionarmos `articles`, `pleasantries`, `leader_phrases`, `redundant_phrasing` e
intensity, a UI ficara defasada se a lista nao for atualizada manualmente.

Recomendacao:

- Expor endpoint/schema de rules, ou exportar metadados das regras para o frontend.
- No minimo atualizar a lista junto das tarefas P0/P2.

### NEW-9 - Golden-set atual e pequeno e threshold real e baixo

`tests/golden-set/compression-savings.test.ts`:

- Carrega apenas 6 prompts.
- Titulo do teste diz `>=20%`.
- Assert real aceita `avgSavings >= 3` e `medianSavings >= 2`.
- Resultado atual deu 19.5% medio, ou seja, proximo do nome, mas o gate nao protegeria regressao
  severa.

Recomendacao:

- Task 13 deve substituir/expandir isso com 10+ pares realistas e thresholds reais.
- Separar thresholds por modo: `standard/full`, `aggressive`, `ultra`.
- Incluir fixtures do upstream `tests/caveman-compress`.

### NEW-10 - Typst/LaTeX/math/frontmatter nao estao protegidos

O release v1.7.0 adicionou Typst + LaTeX a protected content. O OmniRoute ainda nao tem isso na
preservacao.

Recomendacao:

- Proteger blocos math `$$...$$`, inline math `$...$` com cuidado para nao capturar dinheiro.
- Proteger `\begin{...}...\end{...}`.
- Proteger frontmatter YAML `---` no inicio de markdown.
- Preservar headings e tabelas como estruturas.

### NEW-11 - Falta benchmark "receipts", nao so estimativa chars/4

O upstream v1.7.0 enfatiza receipts reais. O OmniRoute usa estimativa `chars/4` em varios pontos.

Isso serve para decisao rapida, mas nao para relatorio financeiro preciso:

- CJK, codigo e JSON quebram a estimativa.
- Provider tokenizer varia.
- Output savings do futuro response mode nao seria medido.

Recomendacao:

- Manter `chars/4` no hot path.
- Adicionar job/analytics opcional com tokenizers por provider/familia quando disponivel.
- Para "caveman stats", calcular:
  - input original/comprimido
  - output real se usage veio do provider
  - cache-read/cache-write quando provider retornar
  - USD saved por pricing registry

## Reconciliacao com `_tasks/features-v3.7.9`

Status por tarefa, contra codigo vivo:

| Task | Status real | Observacao |
|---|---|---|
| 01 article removal | Still needed | Regra ausente |
| 02 pleasantries | Still needed | So existe gratitude parcial |
| 03 leader removal | Still needed | Regras atuais sao user-only e nao cobrem leaders |
| 04 line-based fence parser | Still needed | Regex simples ainda em uso |
| 05 random sentinels | Still needed | Placeholder previsivel ainda em uso |
| 06 validation layer | Still needed | `validation.ts` ausente |
| 07 recapitalization | Still needed | `cleanupArtifacts()` nao recapitaliza nem limpa pontuacao |
| 08 shrink protected patterns | Still needed | CONST_CASE/dotted/version/Typst-LaTeX ausentes |
| 09 intensity sublevels | Still needed | `CavemanIntensity` ausente |
| 10 MCP descriptions | Still needed | Nenhuma compressao de `description` no MCP |
| 11 redundant phrasing | Still needed | Regra ausente |
| 12 preview diff | Partial | Endpoint existe, diff estruturado ausente |
| 13 golden regression | Partial | Ha golden tests, mas pequenos e thresholds fracos |

Tarefas novas recomendadas:

| New | Prioridade | Tarefa |
|---|---|---|
| 14 | P0 | Caveman output mode via system instruction, por combo/API key, com auto-clarity |
| 15 | P0 | Corrigir multimodal em aggressive/ultra ou desabilitar nesses payloads |
| 16 | P1 | Fazer `preserveSystemPrompt` e `preservePatterns` valerem em todos os modos |
| 17 | P1 | Corrigir MCP compression tools schema/status para modos validos e agregados reais |
| 18 | P1 | Deixar `tests/unit/compression/*.test.ts` verde |
| 19 | P2 | UI dinamica para lista de regras/intensity |
| 20 | P2 | Caveman stats/receipts com uso real e custo salvo |
| 21 | P2 | Proteger Typst/LaTeX/math/frontmatter/headings/tables |
| 22 | P2 | Benchmark comparativo contra upstream fixtures e `caveman-shrink` |

## Plano de execucao recomendado

### Fase 0 - Gate de confianca

1. Corrigir ou atualizar os 2 testes quebrados em `tests/unit/compression/*.test.ts`.
2. Adicionar testes multimodais que provem que aggressive/ultra nao removem imagens nem duplicam
   text parts.
3. Ajustar golden savings threshold para refletir o objetivo real.

### Fase 1 - Paridade Caveman core

1. Task 01: `articles`.
2. Task 02: `pleasantries`.
3. Task 03: `leader_phrases`.
4. Task 11: `redundant_phrasing`.
5. Task 07: recapitalization/cleanup.
6. Atualizar `ALL_CAVEMAN_RULES` no dashboard ou tornar dinamico.

### Fase 2 - Safety de preservacao

1. Task 04: parser line-based para fences.
2. Task 05: sentinels randomicos.
3. Task 08: protected patterns do shrink + Typst/LaTeX/math/frontmatter.
4. Task 06: validacao pos-compressao com fallback ao original.
5. Aplicar `preservePatterns` customizados do usuario.

### Fase 3 - Paridade v1.7.0 MCP

1. Task 10: description compressor para MCP.
2. Corrigir MCP configure/status.
3. Incluir descriptions de memory/skill/compression tools, prompts/resources quando existirem.
4. Garantir que tool-call response bodies nao sejam comprimidos.

### Fase 4 - Paridade funcional de saida

1. Task 14: `cavemanOutputMode`.
2. Injetar instrucao curta em system prompt quando habilitado.
3. Auto-clarity: bypass em seguranca, confirmacoes destrutivas, pedidos de clarificacao.
4. Medir output usage real por provider quando usage vier na resposta.

### Fase 5 - Observabilidade e produto

1. Task 12: preview diff com removals/preserved/warnings.
2. Task 20: stats/receipts.
3. Dashboard com:
   - savings por modo
   - top rules
   - validation fallback count
   - multimodal skip count
   - MCP description savings

## Riscos se implementar como esta no plano sem os novos ajustes

1. Adicionar regras P0 melhora savings, mas nao reduz output novo do modelo.
2. Habilitar aggressive/ultra amplamente pode quebrar multimodal.
3. `preservePatterns` e `preserveSystemPrompt` continuariam prometendo garantias que nao existem.
4. MCP tool status/configure continuaria reportando dados parciais/inconsistentes.
5. Golden tests poderiam passar mesmo abaixo do objetivo real por causa de thresholds fracos.

## Conclusao

O plano v3.7.9 esta correto, mas incompleto para uma evolucao robusta. Ele cobre a maior parte dos
gaps de regras e preservacao, mas precisa ganhar quatro blocos antes de ser considerado "100%":

1. **Output-mode Caveman** para paridade com a proposta original de economia em resposta.
2. **Safety multimodal** em aggressive/ultra.
3. **Contratos de settings reais** para `preserveSystemPrompt`, `preservePatterns` e MCP tools.
4. **Gates de teste/benchmark mais fortes**, incluindo a suite completa de compression verde.

Se a meta for "compactacao baseada no Caveman para OmniRoute", a ordem recomendada e:

1. Corrigir testes e multimodal.
2. Fechar Tasks 01-08 e 11.
3. Implementar MCP shrink integrado.
4. Adicionar output-mode com auto-clarity.
5. Fechar preview diff e golden/receipts.

Com isso, o OmniRoute deixa de ser apenas "compressor de prompt inspirado em Caveman" e passa a
cobrir os tres eixos do upstream: output terse, input/memory compression e MCP description shrink.
