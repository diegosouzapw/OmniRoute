# Notion Context Source (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Fonte da verdade:** `src/lib/notion/api.ts` (cliente REST), `src/lib/db/notion.ts`
> (persistência do token), `open-sse/mcp-server/tools/notionTools.ts` (6 ferramentas MCP),
> `src/app/api/settings/notion/route.ts` (API de configurações). O registro das ferramentas e a
> configuração dos escopos ficam em `open-sse/mcp-server/server.ts`.

## O que é

O OmniRoute pode se conectar a um workspace do **Notion** como uma **fonte de contexto** — uma base
de conhecimento de leitura/gravação que os agentes acessam por meio do servidor MCP integrado.
Depois que um token de integração do Notion é configurado, as ferramentas MCP permitem que um LLM
pesquise páginas e bancos de dados, leia o conteúdo de páginas e árvores de blocos, consulte bancos
de dados com filtros/ordenações e acrescente novos blocos — tudo intermediado pelo OmniRoute (com
nova tentativa, tempo limite e classificação de erros), para que o modelo nunca acesse diretamente
a API do Notion.

A integração é um wrapper enxuto e robusto sobre a API REST oficial do Notion
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). O cliente
(`src/lib/notion/api.ts`) adiciona:

- **Novas tentativas com recuo exponencial** (até 3 tentativas) para `429` e `5xx`.
- **Tempo limite de solicitação de 55 segundos** por meio de `AbortController`.
- **Classificação tipada de erros** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, respeita as indicações de
  `retry after`), `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Sanitização de mensagens** que remove fragmentos semelhantes a rastreamentos de pilha antes
  de exibi-las.

## Configuração

Não há **nenhuma variável de ambiente** para o token do Notion — ele é armazenado na
tabela `key_value` do SQLite (namespace `notion`, chave `integration_token`) por meio de
`src/lib/db/notion.ts`. Configure-o na aba **Fontes de contexto** do painel do Endpoint
(`NotionSourceCard`, ao lado de `ObsidianSourceCard`) ou por meio da API REST de configurações.

> [!NOTE]
> O token é um **token de integração interna do Notion**. Crie uma integração em
> <https://www.notion.com/my-integrations> e compartilhe com ela as páginas/os bancos de dados
> que você deseja que o OmniRoute acesse (o modelo de permissões do Notion é baseado em
> compartilhamento, não abrange todo o workspace).

### Configurar via REST

```bash
# Salva e valida o token de integração (o POST valida fazendo uma pesquisa de teste)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Verifica o status da conexão
curl http://localhost:20128/api/settings/notion

# Desconecta (remove o token armazenado)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Os três métodos exigem autenticação no painel (`isAuthenticated`). Em uma solicitação `POST`,
o OmniRoute salva o token e executa imediatamente uma pesquisa de teste com 1 resultado; se o
Notion retornar um objeto de erro, o token será removido e a chamada falhará com `400`.

## Ferramentas MCP (6)

Definidas em `open-sse/mcp-server/tools/notionTools.ts`. O token é obtido no momento da
chamada por meio de `getNotionToken()`; se nenhum estiver configurado, a ferramenta lançará
`"O token de integração do Notion não está configurado. Defina-o em Configurações > Fontes de contexto."`

| Ferramenta                   | Escopo         | Descrição                                                                                         |
| ---------------------------- | -------------- | ------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Pesquisa páginas e bancos de dados por consulta de texto (retorna títulos, IDs e URLs). Paginada. |
| `notion_get_page`            | `read:notion`  | Obtém o conteúdo e os metadados de uma página por seu ID.                                         |
| `notion_list_block_children` | `read:notion`  | Lista todos os blocos filhos de um bloco ou página (a árvore de blocos). Paginada.                |
| `notion_query_database`      | `read:notion`  | Consulta um banco de dados com `filter` + `sorts` opcionais (formato da API do Notion). Paginada. |
| `notion_get_database`        | `read:notion`  | Obtém o esquema/os metadados de um banco de dados por ID.                                         |
| `notion_append_blocks`       | `write:notion` | Acrescenta blocos filhos a um bloco ou página existente (no máximo 100 blocos por solicitação).   |

### Parâmetros de entrada

- `notion_search` — `query` (1–500 caracteres), `pageSize` (1–100, padrão 20),
  `startCursor` (opcional).
- `notion_get_page` — `pageId` (hexadecimal de 32 caracteres ou UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, padrão 50),
  `startCursor` (opcional).
- `notion_query_database` — `databaseId`, `filter` (opcional, formato de filtro do Notion),
  `sorts` (array opcional), `pageSize` (1–100, padrão 50), `startCursor` (opcional).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (array de objetos de bloco),
  `after` (posição opcional).

### Escopos

As ferramentas de leitura exigem `read:notion`, e a ferramenta de gravação exige `write:notion`.
Os escopos são aplicados por `withScopeEnforcement()` em
`open-sse/mcp-server/server.ts` somente quando `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; os
escopos permitidos para o chamador vêm de `OMNIROUTE_MCP_SCOPES` (separados por vírgulas) ou do
contexto de escopo da chave de API autenticada. Consulte [MCP-SERVER.md](./MCP-SERVER.md) para
ver o modelo completo de escopos.

## Endpoints

| Método   | Caminho                | Finalidade                              |
| -------- | ---------------------- | --------------------------------------- |
| `GET`    | `/api/settings/notion` | Retorna `{ connected, hasToken }`.      |
| `POST`   | `/api/settings/notion` | Salva e valida o token de integração.   |
| `DELETE` | `/api/settings/notion` | Desconecta (remove o token armazenado). |

> Estas são rotas de configurações do dashboard. **Não há um endpoint público de proxy
> do Notion em `/v1`** — o Notion é acessado exclusivamente pelas ferramentas MCP acima.

## Casos de uso

- **Respostas fundamentadas em conhecimento** — permita que um agente use `notion_search` no workspace e
  `notion_get_page` no principal resultado antes de responder, para que as respostas citem documentos internos reais.
- **Fluxos de trabalho baseados em banco de dados** — use `notion_query_database` em um banco de dados de tarefas/CRM com
  filtros + ordenações e, em seguida, resuma ou faça a triagem das linhas.
- **Gravação / registro** — use `notion_append_blocks` para anexar notas de reuniões, resumos de
  execuções ou a saída do agente a uma página existente (somente anexação; sem edições destrutivas).
- **Exploração da estrutura** — use `notion_list_block_children` para percorrer a árvore de blocos de uma página
  ou `notion_get_database` para descobrir o esquema de propriedades de um banco de dados antes de consultá-lo.

## Relacionado

- [Servidor MCP](./MCP-SERVER.md) — transportes, aplicação de escopo e inventário completo de ferramentas.
- [Fonte de contexto do Obsidian](./OBSIDIAN_CONTEXT.md) — a outra fonte de contexto integrada.
- [Sistema de memória](./MEMORY.md) — memória conversacional persistente (camada de contexto
  complementar, injetada automaticamente em vez de obtida por ferramentas).
