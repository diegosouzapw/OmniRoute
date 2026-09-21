# OmniRoute MCP Server Documentation (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Servidor Model Context Protocol com 110 ferramentas abrangendo operações de roteamento, cache, compressão, memória, habilidades, proxy, pool, Radar e fontes de contexto.
>
> Fonte oficial: `open-sse/mcp-server/server.ts` calcula **110 ferramentas únicas** com `countUniqueMcpTools()`: 45 definições canônicas (incluindo as seis ferramentas de ciclo de vida do CCR, o trio de habilidades de agente, `omniroute_radar_catalog` e `omniroute_x_search`), além de memória (3), habilidades (4), habilidades do GitHub (3), pool (6), gamificação (8), plugins (8), Notion (6), Obsidian (22), corpus local (3) e duas ferramentas de compressão exclusivas do RTK.

## Instalação

O OmniRoute MCP é integrado. Inicie-o com:

```bash
omniroute --mcp
```

Ou por meio do transporte open-sse:

```bash
# Transporte HTTP com streaming (porta 20130)
omniroute --dev  # O MCP é iniciado automaticamente no endpoint /mcp
```

Os transportes HTTP (`sse` / `streamable-http`, disponibilizados no processo pelo servidor do dashboard) ficam
desativados por padrão e, anteriormente, só podiam ser alternados na página `/dashboard/mcp`. A partir da v3.8.51,
a CLI oferece os mesmos recursos:

```bash
omniroute mcp status                                  # habilitado/online, transporte, quantidade de ferramentas
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # redefine as sessões sse/streamable-http ativas
```

`mcp enable`/`mcp disable` enviam um PATCH para a mesma configuração `mcpEnabled` (e, opcionalmente, `mcpTransport`)
que o dashboard alterna por meio de `/api/settings`. `mcp restart` chama `POST /api/mcp/restart`: ele encerra
as sessões `sse`/`streamable-http` ativas para que a próxima solicitação seja reinicializada de forma limpa, retorna
`409` se o MCP estiver desabilitado e `501` para o transporte `stdio` (os clientes stdio são responsáveis pelo próprio
subprocesso — não há um identificador no processo para reiniciar).

## Transportes

O servidor MCP disponibiliza três transportes, todos baseados na mesma fábrica `createMcpServer()`:

| Transporte        | Onde                                        | Quando usar                                                      |
| :---------------- | :------------------------------------------ | :--------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | Integrações com IDEs (Claude Desktop, Cursor etc.)               |
| `sse`             | `POST/GET /api/mcp/sse` via `httpTransport` | Clientes de navegador/agente que precisam de um fluxo de eventos |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | Clientes HTTP com várias sessões (cabeçalho `mcp-session-id`)    |

O transporte HTTP ativo (`sse` ou `streamable-http`) é selecionado pela configuração `mcpTransport`. A troca de transportes encerra as sessões existentes no outro transporte.

### Acesso remoto (desvio por escopo manage)

`/api/mcp/*` está no nível LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — por padrão, somente hosts de loopback (`localhost`, `127.0.0.1`, `::1`) podem acessá-lo. Desde a v3.8.2, clientes que não sejam de loopback podem se conectar caso apresentem um `Authorization: Bearer <api-key>` cuja chave tenha o escopo `manage`. Essa é a única maneira de acessar o servidor MCP remoto por meio de um túnel, proxy reverso ou nome de host público.

```bash
# Conceda o escopo manage: abra a página API Keys do dashboard e ative
# "Management Access" na chave ou envie scopes:["manage"] via POST durante a criação.

# Em seguida, conecte-se por meio de um cliente MCP remoto:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Uma chave sem o escopo manage (ou sem Bearer) retorna `403 LOCAL_ONLY`. O prefixo relacionado `/api/cli-tools/runtime/*` intencionalmente NÃO permite esse desvio — consulte [Níveis de proteção de rotas — exceção para o escopo manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Configuração da IDE

Consulte [Configuração do Cliente MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) para configurar o Claude Desktop,
Cursor, Cline e clientes MCP compatíveis.

---

## Ferramentas Essenciais (14) — Fase 1

| Ferramenta                      | Escopos               | Descrição                                                                                                                                        |
| :------------------------------ | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Tempo de atividade, memória, disjuntores, limites de taxa, estatísticas de cache                                                                 |
| `omniroute_list_combos`         | `read:combos`         | Todos os combos configurados com estratégias (métricas opcionais)                                                                                |
| `omniroute_get_combo_metrics`   | `read:combos`         | Métricas de desempenho de um combo específico                                                                                                    |
| `omniroute_switch_combo`        | `write:combos`        | Ativar ou desativar um combo                                                                                                                     |
| `omniroute_create_combo`        | `write:combos`        | Criar um combo validado por meio da API de combos existente                                                                                      |
| `omniroute_check_quota`         | `read:quota`          | Cota usada/total, percentual restante, horário de redefinição, integridade do token                                                              |
| `omniroute_route_request`       | `execute:completions` | Enviar uma conclusão de chat por meio do roteamento do OmniRoute                                                                                 |
| `omniroute_cost_report`         | `read:usage`          | Relatório de custos por período (sessão/dia/semana/mês)                                                                                          |
| `omniroute_list_models_catalog` | `read:models`         | Catálogo completo de modelos com recursos, status e preços                                                                                       |
| `omniroute_radar_catalog`       | `read:radar`          | Catálogo Radar local assinado; filtros opcionais por provedor/família                                                                            |
| `omniroute_tool_search`         | `read:tools`          | Descobrir ferramentas no catálogo MCP registrado                                                                                                 |
| `omniroute_web_search`          | `execute:search`      | Pesquisa na web por meio dos provedores de pesquisa configurados. Não pesquisa no X/Twitter.                                                     |
| `omniroute_x_search`            | `execute:search`      | Pesquisar no X por meio do xAI/SuperGrok ou escolher `xquik-search` para resultados da API Xquik. Requer credenciais para o backend selecionado. |
| `omniroute_web_fetch`           | `execute:search`      | Buscar conteúdo da web por meio dos provedores de busca configurados                                                                             |

## Ferramentas avançadas (11) — Fase 2

| Ferramenta                         | Escopos                              | Descrição                                                                                                                                         |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulação de roteamento sem execução, com árvore de fallback                                                                                      |
| `omniroute_set_budget_guard`       | `write:budget`                       | Orçamento da sessão com ação de degradação, bloqueio ou alerta                                                                                    |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Atualiza a estratégia de combinação em tempo de execução (prioridade/ponderada/automática/etc.)                                                   |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Aplica a predefinição de resiliência `aggressive` / `balanced` / `conservative`                                                                   |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Teste em tempo real de cada provedor em uma combinação usando uma chamada upstream real                                                           |
| `omniroute_get_provider_metrics`   | `read:health`                        | Métricas por provedor com latência p50/p95/p99 e estado do disjuntor                                                                              |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Recomenda uma combinação por tipo de tarefa, com restrições de orçamento/latência                                                                 |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Explica por que uma solicitação foi roteada para um provedor (fatores de pontuação + fallbacks)                                                   |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Snapshot completo da sessão: custo, tokens, principais modelos/provedores, erros e proteção de orçamento                                          |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnostica (e, opcionalmente, corrige automaticamente) inconsistências no banco de dados, como referências de combinações quebradas/linhas órfãs |
| `omniroute_sync_pricing`           | `pricing:write`                      | Sincroniza dados de preços de fontes externas (LiteLLM); oferece suporte a `dryRun`                                                               |

## Ferramentas de cache (2)

| Ferramenta              | Escopos       | Descrição                                                        |
| :---------------------- | :------------ | :--------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Estatísticas de cache semântico, cache de prompts e idempotência |
| `omniroute_cache_flush` | `write:cache` | Limpa o cache globalmente ou por assinatura/modelo               |

## Ferramentas de compressão (13)

| Ferramenta                          | Escopos             | Descrição                                                                                                                                       |
| :---------------------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Configurações de compressão, resumo analítico e estatísticas que consideram o cache (inclui metadados de `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | Configura o modo de compressão, o limite, a proporção-alvo, a preservação do prompt do sistema e a alternância da compressão de descrições MCP  |
| `omniroute_set_compression_engine`  | `write:compression` | Seleciona o mecanismo ativo (off/caveman/rtk/stacked) e a intensidade do Caveman/RTK                                                            |
| `omniroute_list_compression_combos` | `read:compression`  | Lista combinações de compressão nomeadas e seus pipelines de mecanismos                                                                         |
| `omniroute_compression_combo_stats` | `read:compression`  | Dados analíticos agrupados por combinação de compressão e mecanismo                                                                             |
| `omniroute_ccr_store`               | `write:compression` | Armazena conteúdo isolado por chamador no armazenamento CCR limitado em memória e retorna um marcador, além de uma referência `ccr://`          |
| `omniroute_ccr_retrieve`            | `read:compression`  | Recupera o conteúdo CCR integralmente ou usando os modos de início, fim, linhas, grep e estatísticas                                            |
| `omniroute_ccr_inspect`             | `read:compression`  | Inspeciona metadados CCR pertencentes ao chamador sem retornar o conteúdo                                                                       |
| `omniroute_ccr_list`                | `read:compression`  | Lista metadados paginados dos blocos CCR pertencentes ao chamador                                                                               |
| `omniroute_ccr_delete`              | `write:compression` | Exclui um bloco CCR pertencente ao chamador                                                                                                     |
| `omniroute_ccr_stats`               | `read:compression`  | Relata o uso de memória no escopo do chamador, contadores de ciclo de vida e limites do armazenamento                                           |
| `omniroute_rtk_discover`            | `read:compression`  | Detecta ruídos recorrentes em amostras de saída RTK fornecidas mediante adesão                                                                  |
| `omniroute_rtk_learn`               | `read:compression`  | Gera um rascunho revisável de filtro RTK a partir de amostras fornecidas mediante adesão                                                        |

As entradas CCR ficam apenas na memória e desaparecem ao reiniciar. Cada bloco é limitado a 2 MiB, cada
principal a 16 MiB e o armazenamento global a 64 MiB. Por padrão, as entradas têm um TTL de 24 horas (máximo
de sete dias). A recuperação MCP completa é limitada a 256 KiB; blocos maiores permanecem disponíveis por meio
dos modos de intervalo e grep. O armazenamento, a recuperação, a listagem, a inspeção, a exclusão e as estatísticas são isolados pelo
principal autenticado da chave de API. Os registros de auditoria contêm hashes e metadados de tamanho, nunca o conteúdo.

`omniroute_compression_status` relata a compactação de descrições MCP separadamente em
`analytics.mcpDescriptionCompression`. Esses valores são estimativas do tamanho dos metadados para descrições
listáveis do MCP (`tools`, `prompts`, `resources` e `resourceTemplates`); eles não são comprovantes de uso
do provedor e são marcados com `source: "mcp_metadata_estimate"`.

### Filtro de Árvore de Acessibilidade MCP (v3.8.0)

Separadamente das ferramentas de compactação acima, o OmniRoute inclui um filtro de pós-execução que
compacta os **resultados de ferramentas** de ferramentas MCP de navegador/acessibilidade antes que sejam retornados ao
agente. Esse filtro não é uma ferramenta — ele é executado de forma transparente em qualquer resultado de ferramenta que contenha
texto detalhado de árvore de acessibilidade ou snapshot de navegador (≥2000 caracteres).

Principais comportamentos:

- Recolhe ≥30 linhas-irmãs repetidas consecutivamente em um resumo com início + fim
- Preserva as âncoras `[ref=eXX]` exigidas pelo Playwright/uso do computador
- Trunca de forma rígida textos muito grandes (>50.000 caracteres) com uma dica de navegação
- Economia esperada: **60–80%** nas cargas úteis de snapshots de navegador

Configuração: `compression.mcpAccessibility` nas configurações globais (migração 056).
Implementação: `open-sse/services/compression/engines/mcpAccessibility/`.
Documentação completa: [Mecanismos de Compactação — Filtro de Árvore de Acessibilidade MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Consulte [Mecanismos de Compactação](../compression/COMPRESSION_ENGINES.md) e [Compactação RTK](../compression/RTK_COMPRESSION.md) para
conhecer o modelo de compactação em tempo de execução por trás dessas ferramentas.

## Ferramentas do 1Proxy (3)

| Ferramenta                  | Escopos        | Descrição                                                                                     |
| :-------------------------- | :------------- | :-------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Busca proxies gratuitos no marketplace do 1proxy (filtros de protocolo/país/qualidade/limite) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Obtém o próximo proxy disponível por estratégia (`random` / `quality` / `sequential`)         |
| `omniroute_oneproxy_stats`  | `read:proxies` | Estatísticas do pool, status de sincronização e distribuição por protocolo e país             |

## Ferramentas de memória (3)

Definidas em `open-sse/mcp-server/tools/memoryTools.ts`. A autenticação e o escopo são impostos por meio do pipeline padrão de escopos do MCP.

| Ferramenta                | Escopos        | Descrição                                                                                                        |
| :------------------------ | :------------- | :--------------------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Pesquisa memórias por consulta / tipo / chave de API, aplicando o limite de orçamento de tokens                  |
| `omniroute_memory_add`    | `write:memory` | Adiciona uma nova entrada de memória (`factual` / `episodic` / `procedural` / `semantic`)                        |
| `omniroute_memory_clear`  | `write:memory` | Limpa as memórias de uma chave de API, opcionalmente filtradas por tipo ou pelo carimbo de data/hora `olderThan` |

## Ferramentas de habilidades (4)

Definidas em `open-sse/mcp-server/tools/skillTools.ts`. Baseadas em `src/lib/skills/registry` + `src/lib/skills/executor`.

| Ferramenta                    | Escopos          | Descrição                                                                                             |
| :---------------------------- | :--------------- | :---------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Lista as habilidades registradas, com filtragem opcional por chave de API, nome ou estado de ativação |
| `omniroute_skills_enable`     | `write:skills`   | Ativa ou desativa uma habilidade específica por ID                                                    |
| `omniroute_skills_execute`    | `execute:skills` | Executa uma habilidade com os dados de entrada fornecidos e retorna o registro da execução            |
| `omniroute_skills_executions` | `read:skills`    | Lista o histórico recente de execuções de habilidades                                                 |

## Fonte de contexto do Notion (6)

Definida em `open-sse/mcp-server/tools/notionTools.ts`. Token armazenado na tabela `key_value` por meio de `src/lib/db/notion.ts`. Cliente REST em `src/lib/notion/api.ts`. API de configurações em `src/app/api/settings/notion/route.ts`. Interface do painel em `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Configure o token da sua integração do Notion na guia **Fontes de contexto** do painel do Endpoint ou por meio da API REST:

```bash
# Definir token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Verificar status
curl http://localhost:20128/api/settings/notion

# Desconectar
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Ferramenta                   | Escopos        | Descrição                                                          |
| :--------------------------- | :------------- | :----------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Pesquisa de texto completo em todas as páginas e bancos de dados   |
| `notion_get_page`            | `read:notion`  | Obtém uma página por ID com suas propriedades                      |
| `notion_list_block_children` | `read:notion`  | Lista os blocos filhos de uma página ou bloco                      |
| `notion_query_database`      | `read:notion`  | Consulta um banco de dados com filtros, ordenação e paginação      |
| `notion_get_database`        | `read:notion`  | Obtém o esquema de um banco de dados por ID                        |
| `notion_append_blocks`       | `write:notion` | Anexa blocos filhos a um bloco pai (máximo de 100 por solicitação) |

## Ferramentas do Catálogo de Habilidades de Agentes (3)

Definidas em `open-sse/mcp-server/tools/agentSkillTools.ts`. Com suporte de `src/lib/agentSkills/catalog`. Essas ferramentas expõem o catálogo de documentação das 45 Habilidades de Agentes para clientes MCP e agentes externos. Escopo: `read:catalog`.

| Ferramenta                        | Escopos        | Descrição                                                                                                                                                                        |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Lista todas as 45 habilidades de agentes com filtros opcionais de `category` (api\|cli) e `area`; retorna metadados + cobertura                                                  |
| `omniroute_agent_skills_get`      | `read:catalog` | Obtém os metadados completos + o conteúdo de SKILL.md de uma única habilidade pelo `id` canônico                                                                                 |
| `omniroute_agent_skills_coverage` | `read:catalog` | Estatísticas de cobertura: quantas das 23 habilidades de API, 21 de CLI e 1 de configuração têm arquivos SKILL.md no sistema de arquivos em comparação com os totais do catálogo |

Consulte [AGENT-SKILLS.md](./AGENT-SKILLS.md) para ver o catálogo completo e como agentes externos o utilizam.

## Frameworks Relacionados (v3.8.0)

O inventário de ferramentas MCP acima (110 ferramentas únicas, calculadas por `countUniqueMcpTools()`) é intencionalmente
limitado a operações de roteamento/cache/compressão/memória/habilidades/proxy/fontes de contexto em tempo de execução. Dois frameworks
adjacentes são distribuídos junto com o servidor MCP na v3.8.0 e são documentados separadamente:

### Agentes na Nuvem

Os Agentes na Nuvem são agentes de codificação com IA executados fora do processo (codex-cloud, cursor-cloud, devin, jules), integrados ao
OmniRoute por meio do mesmo modelo de conexão usado para provedores de LLM. Eles são expostos por meio
de sua própria superfície REST (`/api/v1/agents/*`) e **não** fazem parte do catálogo de ferramentas MCP
— chamar um Agente na Nuvem não consome um escopo MCP.

- Implementação: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Ciclo de vida: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Documentação: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Proteções

As proteções são filtros de pré/pós-execução (vision-bridge, pii-masker, prompt-injection)
aplicados dentro do pipeline de chat. Elas são executadas antes que a camada de ferramentas/rotas MCP seja alcançada
e emitem violações estruturadas para o pipeline de auditoria; elas não são invocadas como ferramentas MCP.

- Implementação: `src/lib/guardrails/`.
- Documentação: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Ao depurar uma chamada MCP que parece estar bloqueada, verifique tanto o log de auditoria MCP
(entradas `scope_denied:*`) quanto a trilha de auditoria das proteções — uma solicitação pode ser rejeitada por
uma proteção **antes** mesmo de alcançar a camada de aplicação de escopos MCP.

---

## Endpoints da API REST

| Endpoint               | Método                | Descrição                                                                                                    | Autenticação                 |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------------- | :--------------------------- |
| `/api/mcp/status`      | `GET`                 | Status do servidor: sinal de atividade, estado do transporte HTTP, resumo da atividade de auditoria          | Gerenciamento (sessão/admin) |
| `/api/mcp/tools`       | `GET`                 | Catálogo de ferramentas (nome, descrição, escopos, fase, endpoints de origem)                                | Gerenciamento                |
| `/api/mcp/sse`         | `GET` / `POST`        | Endpoint de transporte SSE (controlado por `mcpEnabled` + `mcpTransport === "sse"`)                          | Chave de API + escopos       |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Transporte HTTP com streaming (usa o cabeçalho `mcp-session-id`; `DELETE` encerra a sessão)                  | Chave de API + escopos       |
| `/api/mcp/audit`       | `GET`                 | Entradas do log de auditoria de `mcp_tool_audit` (filtros: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Gerenciamento                |
| `/api/mcp/audit/stats` | `GET`                 | Estatísticas agregadas de auditoria (`totalCalls`, `successRate`, `avgDurationMs`, ferramentas mais usadas)  | Gerenciamento                |

Arquivos de origem: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Os transportes SSE e HTTP com streaming ficam bloqueados até que o servidor MCP seja habilitado nas Configurações (`mcpEnabled`) e o `mcpTransport` apropriado seja selecionado. Se o transporte incorreto estiver configurado, a rota retornará HTTP 400 com uma dica para alterar as configurações.

---

## Autenticação e escopos

As ferramentas MCP são autenticadas por meio de escopos de chave de API. A aplicação dos escopos é centralizada em
`open-sse/mcp-server/scopeEnforcement.ts`. Cada ferramenta requer escopos específicos:

| Escopo                | Ferramentas                                                                                                                                                                              |
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

Há suporte a escopos curinga: `read:*` concede todos os escopos de leitura, e `*` concede acesso total.

### `mcp:connect` — capacidade de rota restrita (#7895)

Acessar o transporte HTTP/SSE do MCP (`/api/mcp/*`) a partir de um endereço que não seja de loopback exige a
exceção LOCAL_ONLY de `/api/mcp/` (consulte `docs/security/ROUTE_GUARD_TIERS.md`). Historicamente,
essa exceção aceitava apenas uma chave de API com escopo completo `manage`/`admin` — amplo demais para um
chamador que precisa apenas se comunicar com o MCP. `src/shared/constants/managementScopes.ts` agora
exporta `MCP_CONNECT_SCOPE = "mcp:connect"`: um escopo adicional e restrito (seguindo o mesmo precedente de
`SELF_USAGE_SCOPE`) que autoriza SOMENTE o desvio de `/api/mcp/` em
`src/server/authz/policies/management.ts` — ele não concede acesso a nenhuma outra rota de gerenciamento
e é deliberadamente mantido FORA de `MANAGEMENT_API_KEY_SCOPES`. Uma chave que possua `manage`/`admin`
continua passando pela exceção sem alterações; `mcp:connect` é uma alternativa com privilégios menores para
chamadores remotos que utilizam apenas o MCP, verificada por meio de `hasMcpConnectOrManageScope()`.

### Vinculação de escopo HTTP por chave (#7895)

Por HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` agora resolve os
`api_keys.scopes` reais do chamador por meio de `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
e os repassa para `transport.handleRequest(req, { authInfo })` do SDK do MCP, de modo que
`extra.authInfo.scopes`, recebido por cada chamada de ferramenta, reflita os escopos da própria chave Bearer.
`resolveCallerScopeContext()` de `scopeEnforcement.ts` já priorizava `authInfo` em relação
ao `_meta` e ao fallback da variável de ambiente `OMNIROUTE_MCP_SCOPES` — isso apenas preenche essa primeira
fonte, de prioridade mais alta, que anteriormente não era alimentada por HTTP. Quando nenhuma chave de API é resolvida
(sem cabeçalho ou com uma chave inválida), `authInfo` permanece `undefined`, e a resolução segue para a
cadeia `meta`/variável de ambiente existente, sem alterações. Isso NÃO altera o valor padrão de `OMNIROUTE_MCP_ENFORCE_SCOPES` —
a imposição ainda precisa ser habilitada explicitamente; essa alteração apenas faz com que o
caminho por chave tenha precedência quando ela estiver habilitada. stdio não possui identidade por chamador (consulte
`mcpCallerIdentity.ts`) e não é afetado — ele continua usando a cadeia de fallback `_meta`/variável de ambiente.

---

## Variáveis de Ambiente

| Variável                                | Padrão                             | Finalidade                                                                                                                                             |
| :-------------------------------------- | :--------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`           | URL base que o servidor MCP usa ao chamar as APIs internas do OmniRoute                                                                                |
| `OMNIROUTE_API_KEY`                     | (vazio)                            | Chave de API encaminhada como `Authorization: Bearer` para chamadas às APIs internas                                                                   |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (somente `"true"` o ativa) | Quando ativado, escopos ausentes negam chamadas de ferramentas e registram `scope_denied:<reason>` no log de auditoria                                 |
| `OMNIROUTE_MCP_SCOPES`                  | (vazio)                            | Lista de permissões de escopos, separada por vírgulas, considerada "disponível" por padrão (usada quando o chamador não fornece seus próprios escopos) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (não definido = ativado)           | Quando definido como `0/false/off/no`, desativa a compactação das descrições MCP no momento do registro                                                |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (não definido = ativado)           | Alias alternativo para a mesma opção acima                                                                                                             |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                            | Limite de tempo para cancelamento de leituras internas de gerenciamento (integridade, resiliência, combinações, cota, uso)                             |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                            | Limite de tempo para cancelamento de etapas que aguardam um provedor (`route_request`, `web_search`, `web_fetch`)                                      |
| `MCP_TOOL_DENY`                         | (não definido = sem filtro)        | Nomes de ferramentas, separados por vírgulas, a serem removidos de `tools/list` (redução da cardinalidade de ferramentas — veja abaixo)                |
| `MCP_TOOL_ALLOW`                        | (não definido = sem filtro)        | Nomes de ferramentas, separados por vírgulas, a serem mantidos exclusivamente (modo de lista de permissões — veja abaixo)                              |
| `DATA_DIR`                              | `~/.omniroute`                     | O arquivo de heartbeat é gravado em `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                           |

---

## Compactação de Descrições

Os registros de ferramentas, prompts e recursos MCP podem compactar as descrições no momento do registro/listagem para reduzir o volume de metadados exposto aos clientes (e, consequentemente, o custo de contexto do prompt). A implementação está localizada em `open-sse/mcp-server/descriptionCompressor.ts` e é integrada ao servidor MCP por meio de `compressMcpRegistryMetadata` dentro de `createMcpServer()`.

- A compactação é executada sobre o texto da descrição usando o conjunto de regras Caveman (`getRulesForContext("all", "full")`), com extração de blocos preservados (trechos de código, blocos delimitados etc.), para que o conteúdo estrutural não seja alterado.
- Ative ou desative por implantação por meio do valor `compression.mcpDescriptionCompressionEnabled` na tabela de configurações `key_value` (padrão: ativado) — exposto na interface como **Analytics → Compactação de descrições MCP**.
- Ative ou desative em todo o processo por meio de `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` ou `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- As estatísticas em tempo real são disponibilizadas por meio de `omniroute_compression_status` em `analytics.mcpDescriptionCompression` e marcadas com `source: "mcp_metadata_estimate"` para diferenciá-las dos registros reais de uso do provedor.

---

## Redução da Cardinalidade de Ferramentas (F4.3)

A compactação de descrições reduz os metadados de cada ferramenta; a **redução da cardinalidade de ferramentas** vai além, reduzindo _quantas_ ferramentas são anunciadas. Anunciar menos ferramentas no manifesto `tools/list` reduz o custo de tokens por solicitação que o modelo do cliente paga pelo catálogo de ferramentas (compactação da "camada 5"). A implementação é um filtro puro e sem estado em `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), integrado ao loop de registro em `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Opcional, desativado por padrão.** O filtro é executado somente quando pelo menos uma das duas variáveis de ambiente está definida; quando nenhuma delas está definida, todas as 110 ferramentas são anunciadas sem alterações.

| Variável         | Modo                                                                                                                   |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Lista de bloqueio — nomes de ferramentas separados por vírgulas que sempre são removidos de `tools/list`               |
| `MCP_TOOL_ALLOW` | Lista de permissão — nomes de ferramentas separados por vírgulas; somente estas permanecem, todo o restante é removido |

`deny` tem prioridade sobre `allow`. Os nomes são separados por vírgulas, os espaços em branco são removidos e entradas vazias são ignoradas. Exemplos:

```bash
# Remover duas ferramentas do catálogo
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Anunciar somente as ferramentas de roteamento + cota (modo de lista de permissão)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Como as ferramentas filtradas são removidas:** o registro sempre é concluído com sucesso; uma ferramenta rejeitada pelo perfil é então desativada com `.disable()` no identificador do SDK do MCP, portanto nunca aparece em `tools/list`, mas a integração permanece intacta (ativação/desativação limpa, sem novo registro). O analisador do perfil é `readMcpToolProfileFromEnv(process.env)`, que retorna `null` (sem filtragem) quando ambas as variáveis estão vazias.

A estrutura mais completa de `ToolProfile` usada por `reduceToolManifest` também oferece suporte à filtragem por interseção de escopos (`allowScopes`, com correspondência de curingas no estilo `read:*`) e a um limite determinístico `maxTools`, mas essas duas opções exigem o manifesto completo no momento do registro e **não** são expostas atualmente por meio das variáveis de ambiente (um gancho no nível de `tools/list` está registrado como melhoria futura). `estimateManifestTokens()` está disponível para comparar o custo de tokens do manifesto antes e depois da redução.

---

## Heartbeat de Execução

O transporte stdio persiste o estado de atividade em `${DATA_DIR}/runtime/mcp-heartbeat.json` a cada 5 segundos. O painel (`/api/mcp/status`) lê esse arquivo, além do estado de atividade do PID, para determinar `online`. Em vez disso, os transportes HTTP informam o estado a partir de `getMcpHttpStatus()` dentro do processo (sem gravação em arquivo).

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

## Registro de Auditoria

Cada chamada de ferramenta é registrada na tabela `mcp_tool_audit` do SQLite por `open-sse/mcp-server/audit.ts`:

- Nome da ferramenta, argumentos (com hash/truncados de acordo com o `auditLevel` de cada ferramenta), resultado
- Duração em ms, indicador de sucesso/falha, mensagem de erro (quando aplicável)
- Hash da chave de API, timestamp
- As recusas de escopo são registradas como `scope_denied:<reason>`, juntamente com a lista de escopos ausentes

Use o painel ou os endpoints REST `/api/mcp/audit` e `/api/mcp/audit/stats` para inspecionar chamadas recentes.

---

## Arquivos

| Arquivo                                                                  | Finalidade                                                                           |
| :----------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Fábrica do servidor MCP, ponto de entrada stdio, registros de ferramentas com escopo |
| `open-sse/mcp-server/httpTransport.ts`                                   | Transporte SSE + HTTP Streamable (gerenciamento de sessões)                          |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Avaliação de escopo de ferramentas e resolução do chamador                           |
| `open-sse/mcp-server/audit.ts`                                           | Registro de auditoria de chamadas de ferramentas (`mcp_tool_audit`)                  |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Gravador de heartbeat do stdio (`mcp-heartbeat.json`)                                |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Compressão de descrições para registros de ferramentas, prompts e recursos           |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Esquemas Zod + registro de ferramentas (`MCP_TOOLS`, 45 entradas)                    |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Manipuladores de ferramentas da Fase 2, cache e 1proxy                               |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Manipuladores de ferramentas de compressão                                           |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definições de ferramentas de memória (3 ferramentas)                                 |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definições de ferramentas de habilidades (4 ferramentas)                             |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definições de ferramentas de fonte de contexto do Notion (6 ferramentas)             |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definições de ferramentas de gamificação (8 ferramentas)                             |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Ferramentas de registro e gerenciamento de plugins (8 ferramentas)                   |
| `src/app/api/mcp/status/route.ts`                                        | Endpoint `/api/mcp/status`                                                           |
| `src/app/api/mcp/tools/route.ts`                                         | Endpoint `/api/mcp/tools`                                                            |
| `src/app/api/mcp/sse/route.ts`                                           | Rota de transporte SSE `/api/mcp/sse`                                                |
| `src/app/api/mcp/stream/route.ts`                                        | Rota de transporte HTTP Streamable `/api/mcp/stream`                                 |
| `src/app/api/mcp/audit/route.ts`                                         | Consulta ao log de auditoria `/api/mcp/audit`                                        |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Métricas agregadas de auditoria `/api/mcp/audit/stats`                               |
| `src/lib/notion/api.ts`                                                  | Cliente da API REST do Notion (novas tentativas, timeout, classificação de erros)    |
| `src/lib/db/notion.ts`                                                   | Persistência do token do Notion (tabela `key_value`)                                 |
| `src/app/api/settings/notion/route.ts`                                   | API de configurações do Notion (GET/POST/DELETE)                                     |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Interface de gerenciamento do token do Notion                                        |
| `tests/unit/notion-api.test.ts`                                          | Testes do cliente da API do Notion (7)                                               |
| `tests/unit/notion-tools.test.ts`                                        | Testes de aplicação de escopo das ferramentas do Notion (10)                         |
| `tests/unit/db/notion.test.mjs`                                          | Testes do módulo de banco de dados do Notion (3)                                     |
