# OmniRoute MCP Server Documentation (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Servidor Model Context Protocol com 110 ferramentas para operações de encaminhamento, cache, compressão, memória, competências, proxy, pool, Radar e fontes de contexto.
>
> Fonte de referência: `open-sse/mcp-server/server.ts` calcula **110 ferramentas únicas** com `countUniqueMcpTools()`: 45 definições canónicas (incluindo as seis ferramentas do ciclo de vida CCR, o trio agent-skills, `omniroute_radar_catalog` e `omniroute_x_search`), mais memória (3), competências (4), competências do GitHub (3), pool (6), gamificação (8), plugins (8), Notion (6), Obsidian (22), corpus local (3) e duas ferramentas de compressão exclusivas do RTK.

## Instalação

O OmniRoute MCP está integrado. Inicie-o com:

```bash
omniroute --mcp
```

Ou através do transporte open-sse:

```bash
# Transporte HTTP com streaming (porta 20130)
omniroute --dev  # O MCP inicia-se automaticamente no endpoint /mcp
```

Os transportes HTTP (`sse` / `streamable-http`, disponibilizados no mesmo processo pelo servidor do dashboard) estão
desativados por predefinição e anteriormente apenas podiam ser ativados ou desativados na página `/dashboard/mcp`. Desde a v3.8.51,
a CLI oferece as mesmas funcionalidades:

```bash
omniroute mcp status                                  # ativado/online, transporte, número de ferramentas
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # repõe as sessões sse/streamable-http ativas
```

`mcp enable`/`mcp disable` enviam um PATCH para a mesma definição `mcpEnabled` (e, opcionalmente, `mcpTransport`)
que o dashboard alterna através de `/api/settings`. `mcp restart` chama `POST /api/mcp/restart`: encerra
as sessões `sse`/`streamable-http` ativas para que o pedido seguinte seja reinicializado de forma limpa, devolve
`409` se o MCP estiver desativado e `501` para o transporte `stdio` (os clientes stdio gerem o seu próprio
subprocesso — não existe nenhum identificador no processo que possa ser reiniciado).

## Transportes

O servidor MCP disponibiliza três transportes, todos suportados pela mesma fábrica `createMcpServer()`:

| Transporte        | Localização                                        | Quando utilizar                                                    |
| :---------------- | :------------------------------------------------- | :----------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                    | Integrações com IDE (Claude Desktop, Cursor, etc.)                 |
| `sse`             | `POST/GET /api/mcp/sse` através de `httpTransport` | Clientes de navegador/agente que necessitem de um fluxo de eventos |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`                  | Clientes HTTP multissessão (cabeçalho `mcp-session-id`)            |

O transporte HTTP ativo (`sse` ou `streamable-http`) é selecionado pela definição `mcpTransport`. A mudança de transporte encerra as sessões existentes no outro transporte.

### Acesso remoto (exceção para o âmbito manage)

`/api/mcp/*` pertence ao nível LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — por predefinição, apenas anfitriões de loopback (`localhost`, `127.0.0.1`, `::1`) podem aceder-lhe. Desde a v3.8.2, os clientes que não sejam de loopback podem estabelecer ligação se apresentarem um `Authorization: Bearer <api-key>` cuja chave tenha o âmbito `manage`. Esta é a única forma de aceder ao servidor MCP remoto através de um túnel, proxy inverso ou nome de anfitrião público.

```bash
# Conceda o âmbito manage: abra a página API Keys do dashboard e ative
# "Management Access" na chave, ou envie POST scopes:["manage"] ao criá-la.

# Em seguida, estabeleça ligação a partir de um cliente MCP remoto:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Uma chave sem o âmbito manage (ou sem Bearer) devolve `403 LOCAL_ONLY`. O prefixo relacionado `/api/cli-tools/runtime/*` NÃO permite intencionalmente esta exceção — consulte [Níveis do Route Guard — Exceção para o âmbito manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Configuração do IDE

Consulte [Configuração do Cliente MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) para configurar o Claude Desktop,
Cursor, Cline e clientes MCP compatíveis.

---

## Ferramentas Essenciais (14) — Fase 1

| Ferramenta                      | Âmbitos               | Descrição                                                                                                                                             |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Tempo de atividade, memória, disjuntores, limites de taxa, estatísticas da cache                                                                      |
| `omniroute_list_combos`         | `read:combos`         | Todos os combos configurados com estratégias (métricas opcionais)                                                                                     |
| `omniroute_get_combo_metrics`   | `read:combos`         | Métricas de desempenho de um combo específico                                                                                                         |
| `omniroute_switch_combo`        | `write:combos`        | Ativar ou desativar um combo                                                                                                                          |
| `omniroute_create_combo`        | `write:combos`        | Criar um combo validado através da API de combos existente                                                                                            |
| `omniroute_check_quota`         | `read:quota`          | Quota utilizada/total, percentagem restante, hora de reposição, estado dos tokens                                                                     |
| `omniroute_route_request`       | `execute:completions` | Enviar uma conclusão de chat através do encaminhamento do OmniRoute                                                                                   |
| `omniroute_cost_report`         | `read:usage`          | Relatório de custos por período (sessão/dia/semana/mês)                                                                                               |
| `omniroute_list_models_catalog` | `read:models`         | Catálogo completo de modelos com capacidades, estado e preços                                                                                         |
| `omniroute_radar_catalog`       | `read:radar`          | Catálogo Radar local assinado; filtros opcionais por fornecedor/família                                                                               |
| `omniroute_tool_search`         | `read:tools`          | Descobrir ferramentas no catálogo MCP registado                                                                                                       |
| `omniroute_web_search`          | `execute:search`      | Pesquisa na Web através dos fornecedores de pesquisa configurados. Não pesquisa no X/Twitter.                                                         |
| `omniroute_x_search`            | `execute:search`      | Pesquisar no X através do xAI/SuperGrok ou escolher `xquik-search` para obter resultados da API Xquik. Requer credenciais para o backend selecionado. |
| `omniroute_web_fetch`           | `execute:search`      | Obter conteúdo da Web através dos fornecedores de obtenção configurados                                                                               |

## Ferramentas avançadas (11) — Fase 2

| Ferramenta                         | Âmbitos                              | Descrição                                                                                                                                          |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulação de encaminhamento sem execução, com árvore de alternativas                                                                               |
| `omniroute_set_budget_guard`       | `write:budget`                       | Orçamento da sessão com ação de degradação/bloqueio/alerta                                                                                         |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Atualizar a estratégia da combinação em tempo de execução (prioridade/ponderada/automática/etc.)                                                   |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Aplicar predefinição de resiliência `aggressive` / `balanced` / `conservative`                                                                     |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Teste em tempo real de cada fornecedor numa combinação através de uma chamada real ao serviço a montante                                           |
| `omniroute_get_provider_metrics`   | `read:health`                        | Métricas por fornecedor com latência p50/p95/p99 e estado do disjuntor                                                                             |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Recomendar uma combinação por tipo de tarefa, com restrições de orçamento/latência                                                                 |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Explicar por que motivo um pedido foi encaminhado para um fornecedor (fatores de pontuação + alternativas)                                         |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Instantâneo completo da sessão: custo, tokens, principais modelos/fornecedores, erros e proteção de orçamento                                      |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnosticar (e, opcionalmente, corrigir automaticamente) inconsistências da base de dados, como referências de combinações inválidas/linhas órfãs |
| `omniroute_sync_pricing`           | `pricing:write`                      | Sincronizar dados de preços a partir de fontes externas (LiteLLM); suporta `dryRun`                                                                |

## Ferramentas de cache (2)

| Ferramenta              | Âmbitos       | Descrição                                                              |
| :---------------------- | :------------ | :--------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Estatísticas da cache semântica, da cache de pedidos e de idempotência |
| `omniroute_cache_flush` | `write:cache` | Limpar a cache globalmente ou por assinatura/modelo                    |

## Ferramentas de compressão (13)

| Ferramenta                          | Âmbitos             | Descrição                                                                                                                                 |
| :---------------------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Definições de compressão, resumo analítico e estatísticas sensíveis à cache (inclui metadados de `analytics.mcpDescriptionCompression`)   |
| `omniroute_compression_configure`   | `write:compression` | Configurar o modo de compressão, o limiar, a proporção-alvo, a preservação do pedido de sistema e a opção de compressão de descrições MCP |
| `omniroute_set_compression_engine`  | `write:compression` | Escolher o motor ativo (off/caveman/rtk/stacked) e a intensidade do Caveman/RTK                                                           |
| `omniroute_list_compression_combos` | `read:compression`  | Listar combinações de compressão com nome e os respetivos pipelines de motores                                                            |
| `omniroute_compression_combo_stats` | `read:compression`  | Dados analíticos agrupados por combinação de compressão e motor                                                                           |
| `omniroute_ccr_store`               | `write:compression` | Armazenar conteúdo isolado por autor da chamada no armazenamento CCR limitado em memória e devolver um marcador e uma referência `ccr://` |
| `omniroute_ccr_retrieve`            | `read:compression`  | Obter conteúdo CCR na íntegra ou através dos modos de início, fim, linhas, grep e estatísticas                                            |
| `omniroute_ccr_inspect`             | `read:compression`  | Inspecionar metadados CCR pertencentes ao autor da chamada sem devolver o conteúdo                                                        |
| `omniroute_ccr_list`                | `read:compression`  | Listar metadados paginados de blocos CCR pertencentes ao autor da chamada                                                                 |
| `omniroute_ccr_delete`              | `write:compression` | Eliminar um bloco CCR pertencente ao autor da chamada                                                                                     |
| `omniroute_ccr_stats`               | `read:compression`  | Comunicar a utilização de memória por autor da chamada, os contadores do ciclo de vida e os limites do armazenamento                      |
| `omniroute_rtk_discover`            | `read:compression`  | Detetar ruído recorrente em amostras de saída RTK de participação voluntária                                                              |
| `omniroute_rtk_learn`               | `read:compression`  | Gerar um rascunho de filtro RTK passível de revisão a partir de amostras de participação voluntária                                       |

As entradas CCR existem apenas em memória e desaparecem ao reiniciar. Cada bloco está limitado a 2 MiB, cada
entidade principal a 16 MiB e o armazenamento global a 64 MiB. Por predefinição, as entradas têm um TTL de 24 horas (máximo de
sete dias). A obtenção integral através de MCP está limitada a 256 KiB; os blocos maiores permanecem disponíveis através dos
modos por intervalo e grep. O armazenamento, a obtenção, a listagem, a inspeção, a eliminação e as estatísticas são isolados por
entidade principal da chave de API autenticada. Os registos de auditoria contêm hashes e metadados de tamanho, nunca conteúdo.

`omniroute_compression_status` comunica separadamente a compressão das descrições MCP em
`analytics.mcpDescriptionCompression`. Esses valores são estimativas do tamanho dos metadados para descrições
enumeráveis de MCP (`tools`, `prompts`, `resources` e `resourceTemplates`); não são comprovativos de utilização
do fornecedor e estão assinalados com `source: "mcp_metadata_estimate"`.

### Filtro da árvore de acessibilidade MCP (v3.8.0)

Separadamente das ferramentas de compressão acima, o OmniRoute inclui um filtro pós-execução que
comprime os **resultados das ferramentas** de browser/acessibilidade MCP antes de serem devolvidos ao
agente. Este filtro não é, por si só, uma ferramenta — é executado de forma transparente em qualquer resultado de ferramenta que contenha
texto verboso de uma árvore de acessibilidade ou de um instantâneo do browser (≥2000 carateres).

Principais comportamentos:

- Reduz ≥30 linhas consecutivas repetidas do mesmo nível a um resumo com o início e o fim
- Preserva as âncoras `[ref=eXX]` exigidas pelo Playwright/controlo por computador
- Trunca estritamente texto demasiado extenso (>50 000 carateres), incluindo uma sugestão de navegação
- Poupança esperada: **60–80%** nos conteúdos de instantâneos do browser

Configuração: `compression.mcpAccessibility` nas definições globais (migração 056).
Implementação: `open-sse/services/compression/engines/mcpAccessibility/`.
Documentação completa: [Motores de compressão — Filtro da árvore de acessibilidade MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Consulte [Motores de compressão](../compression/COMPRESSION_ENGINES.md) e [Compressão RTK](../compression/RTK_COMPRESSION.md) para
conhecer o modelo de compressão em tempo de execução subjacente a estas ferramentas.

## Ferramentas do 1Proxy (3)

| Ferramenta                  | Âmbitos        | Descrição                                                                                  |
| :-------------------------- | :------------- | :----------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Obtém proxies gratuitos do marketplace 1proxy (filtros de protocolo/país/qualidade/limite) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Obtém o próximo proxy disponível por estratégia (`random` / `quality` / `sequential`)      |
| `omniroute_oneproxy_stats`  | `read:proxies` | Estatísticas do conjunto, estado da sincronização e distribuição por protocolo e país      |

## Ferramentas de Memória (3)

Definidas em `open-sse/mcp-server/tools/memoryTools.ts`. A autenticação/o âmbito são aplicados através do pipeline de âmbitos MCP padrão.

| Ferramenta                | Âmbitos        | Descrição                                                                                                   |
| :------------------------ | :------------- | :---------------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Pesquisa memórias por consulta / tipo / chave de API, com aplicação do orçamento de tokens                  |
| `omniroute_memory_add`    | `write:memory` | Adiciona uma nova entrada de memória (`factual` / `episodic` / `procedural` / `semantic`)                   |
| `omniroute_memory_clear`  | `write:memory` | Limpa as memórias de uma chave de API, opcionalmente filtradas por tipo ou pelo carimbo de data `olderThan` |

## Ferramentas de Competências (4)

Definidas em `open-sse/mcp-server/tools/skillTools.ts`. Suportadas por `src/lib/skills/registry` + `src/lib/skills/executor`.

| Ferramenta                    | Âmbitos          | Descrição                                                                                       |
| :---------------------------- | :--------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Lista as competências registadas, com filtragem opcional por chave de API, nome ou estado ativo |
| `omniroute_skills_enable`     | `write:skills`   | Ativa ou desativa uma competência específica por ID                                             |
| `omniroute_skills_execute`    | `execute:skills` | Executa uma competência com os dados de entrada fornecidos e devolve o registo da execução      |
| `omniroute_skills_executions` | `read:skills`    | Lista o histórico recente de execuções de competências                                          |

## Fonte de Contexto do Notion (6)

Definida em `open-sse/mcp-server/tools/notionTools.ts`. Token armazenado na tabela `key_value` através de `src/lib/db/notion.ts`. Cliente REST em `src/lib/notion/api.ts`. API de definições em `src/app/api/settings/notion/route.ts`. Interface do painel em `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Configure o token da integração do Notion no separador **Fontes de Contexto** do painel do Endpoint ou através da API REST:

```bash
# Definir o token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Verificar o estado
curl http://localhost:20128/api/settings/notion

# Desligar
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Ferramenta                   | Âmbitos        | Descrição                                                                 |
| :--------------------------- | :------------- | :------------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | Pesquisa de texto integral em todas as páginas e bases de dados           |
| `notion_get_page`            | `read:notion`  | Obtém uma página por ID, juntamente com as respetivas propriedades        |
| `notion_list_block_children` | `read:notion`  | Lista os blocos subordinados de uma página ou bloco                       |
| `notion_query_database`      | `read:notion`  | Consulta uma base de dados com filtros, ordenações e paginação            |
| `notion_get_database`        | `read:notion`  | Obtém o esquema de uma base de dados por ID                               |
| `notion_append_blocks`       | `write:notion` | Anexa blocos subordinados a um bloco principal (máximo de 100 por pedido) |

## Ferramentas do Catálogo de Competências de Agentes (3)

Definidas em `open-sse/mcp-server/tools/agentSkillTools.ts`. Suportadas por `src/lib/agentSkills/catalog`. Estas ferramentas disponibilizam o catálogo de documentação das 45 Competências de Agentes a clientes MCP e agentes externos. Âmbito: `read:catalog`.

| Ferramenta                        | Âmbitos        | Descrição                                                                                                                                                               |
| :-------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Lista todas as 45 competências de agentes com filtros opcionais `category` (api\|cli) e `area`; devolve metadados + cobertura                                           |
| `omniroute_agent_skills_get`      | `read:catalog` | Obtém os metadados completos + conteúdo de SKILL.md para uma única competência através do `id` canónico                                                                 |
| `omniroute_agent_skills_coverage` | `read:catalog` | Estatísticas de cobertura: quantas das 23 competências de API, 21 de CLI e 1 de configuração têm ficheiros SKILL.md no sistema de ficheiros face aos totais do catálogo |

Consulte [AGENT-SKILLS.md](./AGENT-SKILLS.md) para ver o catálogo completo e saber como os agentes externos o utilizam.

## Frameworks Relacionadas (v3.8.0)

O inventário de ferramentas MCP acima (110 ferramentas únicas, calculadas por `countUniqueMcpTools()`) está intencionalmente
limitado a operações de encaminhamento/cache/compressão/memória/competências/proxy/fontes de contexto em tempo de execução. Duas frameworks adjacentes
são fornecidas juntamente com o servidor MCP na v3.8.0 e estão documentadas separadamente:

### Agentes na Cloud

Os Agentes na Cloud são agentes de programação de IA executados fora do processo (codex-cloud, cursor-cloud, devin, jules), integrados no
OmniRoute através do mesmo modelo de ligação utilizado para os fornecedores de LLM. São disponibilizados através da
sua própria interface REST (`/api/v1/agents/*`) e **não** fazem parte do catálogo de ferramentas MCP
— invocar um Agente na Cloud não consome um âmbito MCP.

- Implementação: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Ciclo de vida: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Documentação: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Mecanismos de Proteção

Os mecanismos de proteção são filtros de pré/pós-execução (vision-bridge, pii-masker, prompt-injection)
aplicados dentro do pipeline de chat. São executados antes de se alcançar a camada de ferramentas/encaminhamento MCP
e emitem violações estruturadas para o pipeline de auditoria; não são invocados como ferramentas MCP.

- Implementação: `src/lib/guardrails/`.
- Documentação: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Ao depurar uma chamada MCP que pareça estar bloqueada, verifique tanto o registo de auditoria MCP
(entradas `scope_denied:*`) como o histórico de auditoria dos mecanismos de proteção — um pedido pode ser rejeitado por
um mecanismo de proteção **antes** de chegar à camada de aplicação dos âmbitos MCP.

---

## Endpoints da API REST

| Endpoint               | Método                | Descrição                                                                                                        | Autenticação                  |
| :--------------------- | :-------------------- | :--------------------------------------------------------------------------------------------------------------- | :---------------------------- |
| `/api/mcp/status`      | `GET`                 | Estado do servidor: sinal de atividade, estado do transporte HTTP, resumo da atividade de auditoria              | Gestão (sessão/administrador) |
| `/api/mcp/tools`       | `GET`                 | Catálogo de ferramentas (nome, descrição, âmbitos, fase, endpoints de origem)                                    | Gestão                        |
| `/api/mcp/sse`         | `GET` / `POST`        | Endpoint de transporte SSE (condicionado por `mcpEnabled` + `mcpTransport === "sse"`)                            | Chave de API + âmbitos        |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Transporte HTTP com streaming (utiliza o cabeçalho `mcp-session-id`; `DELETE` termina a sessão)                  | Chave de API + âmbitos        |
| `/api/mcp/audit`       | `GET`                 | Entradas do registo de auditoria de `mcp_tool_audit` (filtros: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Gestão                        |
| `/api/mcp/audit/stats` | `GET`                 | Estatísticas de auditoria agregadas (`totalCalls`, `successRate`, `avgDurationMs`, ferramentas mais utilizadas)  | Gestão                        |

Ficheiros de origem: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Os transportes SSE e HTTP com streaming ficam bloqueados até o servidor MCP ser ativado nas Definições (`mcpEnabled`) e o `mcpTransport` adequado ser selecionado. Se estiver configurado o transporte errado, a rota devolve HTTP 400 com uma indicação para alterar as definições.

---

## Autenticação e âmbitos

As ferramentas MCP são autenticadas através de âmbitos de chaves de API. A aplicação dos âmbitos está centralizada em
`open-sse/mcp-server/scopeEnforcement.ts`. Cada ferramenta requer âmbitos específicos:

| Âmbito                | Ferramentas                                                                                                                                                                              |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                        |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                                |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                                   |
| `read:quota`          | `check_quota`                                                                                                                                                                            |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                                   |
| `read:models`         | `list_models_catalog`                                                                                                                                                                    |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                            |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                    |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                       |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                              |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                           |
| `read:cache`          | `cache_stats`                                                                                                                                                                            |
| `write:cache`         | `cache_flush`                                                                                                                                                                            |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                               |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                        |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                    |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                         |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                                   |
| `read:memory`         | `memory_search`                                                                                                                                                                          |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                             |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                       |
| `write:skills`        | `skills_enable`                                                                                                                                                                          |
| `execute:skills`      | `skills_execute`                                                                                                                                                                         |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                         |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                                  |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                                |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                         |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                           |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                       |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                          |
| `read:obsidian`       | 13 ferramentas de leitura — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 ferramentas de escrita — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                        |

São suportados âmbitos com carateres universais: `read:*` concede todos os âmbitos de leitura, `*` concede acesso total.

### `mcp:connect` — capacidade de rota restrita (#7895)

O acesso ao transporte HTTP/SSE do MCP (`/api/mcp/*`) a partir de endereços que não sejam de loopback requer a exceção LOCAL_ONLY de `/api/mcp/` (consulte `docs/security/ROUTE_GUARD_TIERS.md`). Historicamente, essa exceção apenas aceitava uma chave de API com o âmbito completo `manage`/`admin` — demasiado abrangente para um cliente que apenas necessita de comunicar com o MCP. `src/shared/constants/managementScopes.ts` exporta agora `MCP_CONNECT_SCOPE = "mcp:connect"`: um âmbito adicional e restrito (seguindo o mesmo precedente de `SELF_USAGE_SCOPE`) que autoriza APENAS a exceção de `/api/mcp/` em `src/server/authz/policies/management.ts` — não concede acesso a quaisquer outras rotas de gestão e é deliberadamente mantido FORA de `MANAGEMENT_API_KEY_SCOPES`. Uma chave com `manage`/`admin` continua a passar pela exceção sem alterações; `mcp:connect` é uma alternativa com menos privilégios para clientes remotos que utilizam apenas o MCP, verificada através de `hasMcpConnectOrManageScope()`.

### Associação de âmbitos HTTP por chave (#7895)

Através de HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` resolve agora os `api_keys.scopes` reais do cliente através de `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) e transmite-os ao `transport.handleRequest(req, { authInfo })` do SDK do MCP, para que `extra.authInfo.scopes`, recebido por cada chamada de ferramenta, reflita os âmbitos da própria chave Bearer. O `resolveCallerScopeContext()` de `scopeEnforcement.ts` já dava prioridade a `authInfo` em relação a `_meta` e à alternativa da variável de ambiente `OMNIROUTE_MCP_SCOPES` — isto apenas preenche essa primeira fonte, de prioridade mais elevada, que anteriormente não era fornecida através de HTTP. Quando não é resolvida nenhuma chave de API (sem cabeçalho ou com uma chave inválida), `authInfo` permanece `undefined` e a resolução recorre à cadeia `meta`/variável de ambiente existente, sem alterações. Isto NÃO altera a predefinição de `OMNIROUTE_MCP_ENFORCE_SCOPES` — a aplicação das restrições continua a ter de ser explicitamente ativada; esta alteração apenas faz com que o caminho por chave tenha precedência quando o for. O stdio não tem identidade por cliente (consulte `mcpCallerIdentity.ts`) e não é afetado — continua a utilizar a cadeia alternativa `_meta`/variável de ambiente.

---

## Variáveis de Ambiente

| Variável                                | Predefinição                      | Finalidade                                                                                                                                                                  |
| :-------------------------------------- | :-------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`          | URL base que o servidor MCP utiliza ao chamar as APIs internas do OmniRoute                                                                                                 |
| `OMNIROUTE_API_KEY`                     | (vazio)                           | Chave de API encaminhada como `Authorization: Bearer` para chamadas de API internas                                                                                         |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (apenas `"true"` o ativa) | Quando ativado, âmbitos em falta recusam chamadas de ferramentas e registam `scope_denied:<reason>` no registo de auditoria                                                 |
| `OMNIROUTE_MCP_SCOPES`                  | (vazio)                           | Lista de âmbitos permitidos, separados por vírgulas, considerados «disponíveis» por predefinição (utilizada quando o autor da chamada não fornece os seus próprios âmbitos) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (não definido = ativo)            | Quando definido como `0/false/off/no`, desativa a compressão das descrições MCP no momento do registo                                                                       |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (não definido = ativo)            | Alias alternativo para a mesma opção acima                                                                                                                                  |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                           | Limite de tempo antes do cancelamento para leituras de gestão internas (estado, resiliência, combinações, quota, utilização)                                                |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                           | Limite de tempo antes do cancelamento para etapas que aguardam um fornecedor (`route_request`, `web_search`, `web_fetch`)                                                   |
| `MCP_TOOL_DENY`                         | (não definido = sem filtro)       | Nomes de ferramentas separados por vírgulas a remover de `tools/list` (redução da cardinalidade das ferramentas — ver abaixo)                                               |
| `MCP_TOOL_ALLOW`                        | (não definido = sem filtro)       | Nomes de ferramentas separados por vírgulas a manter em exclusivo (modo de lista de permissões — ver abaixo)                                                                |
| `DATA_DIR`                              | `~/.omniroute`                    | O ficheiro de sinal de atividade é escrito em `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                      |

---

## Compressão de Descrições

Os registos de ferramentas, pedidos e recursos MCP podem comprimir as descrições no momento do registo/listagem para reduzir o volume de metadados exposto aos clientes (e, por conseguinte, o custo do contexto do pedido). A implementação encontra-se em `open-sse/mcp-server/descriptionCompressor.ts` e está integrada no servidor MCP através de `compressMcpRegistryMetadata` em `createMcpServer()`.

- A compressão é aplicada ao texto da descrição utilizando o conjunto de regras Caveman (`getRulesForContext("all", "full")`), com extração dos blocos preservados (fragmentos de código, blocos delimitados, etc.), para que o conteúdo estrutural não seja alterado.
- Alterne por implementação através do valor `compression.mcpDescriptionCompressionEnabled` na tabela de definições `key_value` (predefinição: ativado) — disponibilizado na interface como **Analytics → Compressão de descrições MCP**.
- Alterne para todo o processo através de `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` ou `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- As estatísticas em tempo real são disponibilizadas através de `omniroute_compression_status` em `analytics.mcpDescriptionCompression` e etiquetadas com `source: "mcp_metadata_estimate"` para as distinguir dos recibos de utilização reais do fornecedor.

---

## Redução da Cardinalidade de Ferramentas (F4.3)

A compressão das descrições reduz os metadados de cada ferramenta; a **redução da cardinalidade de ferramentas** vai mais longe, reduzindo _quantas_ ferramentas são sequer anunciadas. Anunciar menos ferramentas no manifesto `tools/list` reduz o custo em tokens por pedido que o modelo do cliente paga pelo catálogo de ferramentas (compressão de «camada 5»). A implementação é um filtro puro e sem estado em `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), integrado no ciclo de registo em `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Opcional, desativado por predefinição.** O filtro só é executado quando pelo menos uma de duas variáveis de ambiente está definida; se nenhuma estiver definida, todas as 110 ferramentas são anunciadas sem alterações.

| Variável         | Modo                                                                                                                             |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Lista de bloqueio — nomes de ferramentas separados por vírgulas que são sempre removidos de `tools/list`                         |
| `MCP_TOOL_ALLOW` | Lista de permissões — nomes de ferramentas separados por vírgulas; apenas estes são mantidos, sendo todos os restantes removidos |

`deny` tem prioridade sobre `allow`. Os nomes são separados por vírgulas, os espaços em branco no início e no fim são removidos e as entradas vazias são ignoradas. Exemplos:

```bash
# Remover duas ferramentas do catálogo
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Anunciar apenas as ferramentas de encaminhamento e quota (modo de lista de permissões)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Como as ferramentas filtradas são removidas:** o registo é sempre concluído com êxito; uma ferramenta rejeitada pelo perfil é depois desativada através de `.disable()` no identificador do SDK MCP, pelo que nunca aparece em `tools/list`, embora as ligações permaneçam intactas (ativação/desativação simples, sem novo registo). O analisador do perfil é `readMcpToolProfileFromEnv(process.env)`, que devolve `null` (sem filtragem) quando ambas as variáveis estão vazias.

A estrutura mais completa `ToolProfile` subjacente a `reduceToolManifest` também suporta filtragem por interseção de âmbitos (`allowScopes`, com correspondência de caracteres universais ao estilo de `read:*`) e um limite determinístico `maxTools`, mas estas duas opções necessitam do manifesto completo no momento do registo e **não** são atualmente expostas através das variáveis de ambiente (um hook ao nível de `tools/list` está registado como trabalho futuro). `estimateManifestTokens()` está disponível para comparar o custo em tokens do manifesto antes e depois da redução.

---

## Heartbeat de Execução

O transporte stdio guarda o estado de atividade em `${DATA_DIR}/runtime/mcp-heartbeat.json` a cada 5 segundos. O painel (`/api/mcp/status`) lê este ficheiro juntamente com o estado de atividade do PID para determinar `online`. Em alternativa, os transportes HTTP comunicam o estado a partir de `getMcpHttpStatus()` no próprio processo (sem escrita de ficheiros).

O snapshot do heartbeat contém:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## Registo de Auditoria

Todas as chamadas de ferramentas são registadas na tabela SQLite `mcp_tool_audit` por `open-sse/mcp-server/audit.ts`:

- Nome da ferramenta, argumentos (com hash/truncados de acordo com o `auditLevel` de cada ferramenta), resultado
- Duração em ms, indicador de êxito/falha, mensagem de erro (quando aplicável)
- Hash da chave de API, data e hora
- As recusas de âmbito são registadas como `scope_denied:<reason>`, juntamente com a lista de âmbitos em falta

Utilize o painel ou os endpoints REST `/api/mcp/audit` e `/api/mcp/audit/stats` para inspecionar as chamadas recentes.

---

## Ficheiros

| Ficheiro                                                                 | Finalidade                                                                             |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Fábrica do servidor MCP, ponto de entrada stdio, registos de ferramentas com âmbito    |
| `open-sse/mcp-server/httpTransport.ts`                                   | Transporte SSE + HTTP transmissível (gestão de sessões)                                |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Avaliação do âmbito das ferramentas e resolução do chamador                            |
| `open-sse/mcp-server/audit.ts`                                           | Registo de auditoria de chamadas de ferramentas (`mcp_tool_audit`)                     |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Escritor de heartbeat stdio (`mcp-heartbeat.json`)                                     |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Compressão de descrições para registos de ferramentas / prompts / recursos             |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Esquemas Zod + registo de ferramentas (`MCP_TOOLS`, 45 entradas)                       |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Processadores de ferramentas da Fase 2 + cache + 1proxy                                |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Processadores de ferramentas de compressão                                             |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definições de ferramentas de memória (3 ferramentas)                                   |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definições de ferramentas de competências (4 ferramentas)                              |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definições de ferramentas de fontes de contexto do Notion (6 ferramentas)              |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definições de ferramentas de gamificação (8 ferramentas)                               |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Ferramentas de registo e gestão de plugins (8 ferramentas)                             |
| `src/app/api/mcp/status/route.ts`                                        | Endpoint `/api/mcp/status`                                                             |
| `src/app/api/mcp/tools/route.ts`                                         | Endpoint `/api/mcp/tools`                                                              |
| `src/app/api/mcp/sse/route.ts`                                           | Rota de transporte SSE `/api/mcp/sse`                                                  |
| `src/app/api/mcp/stream/route.ts`                                        | Rota de transporte HTTP transmissível `/api/mcp/stream`                                |
| `src/app/api/mcp/audit/route.ts`                                         | Consulta do registo de auditoria `/api/mcp/audit`                                      |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Métricas de auditoria agregadas `/api/mcp/audit/stats`                                 |
| `src/lib/notion/api.ts`                                                  | Cliente da API REST do Notion (novas tentativas, tempo limite, classificação de erros) |
| `src/lib/db/notion.ts`                                                   | Persistência do token do Notion (tabela `key_value`)                                   |
| `src/app/api/settings/notion/route.ts`                                   | API de definições do Notion (GET/POST/DELETE)                                          |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Interface de gestão do token do Notion                                                 |
| `tests/unit/notion-api.test.ts`                                          | Testes do cliente da API do Notion (7)                                                 |
| `tests/unit/notion-tools.test.ts`                                        | Testes de aplicação do âmbito das ferramentas do Notion (10)                           |
| `tests/unit/db/notion.test.mjs`                                          | Testes do módulo de base de dados do Notion (3)                                        |
