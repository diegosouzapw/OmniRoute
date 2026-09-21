# Notion Context Source (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Fonte fidedigna:** `src/lib/notion/api.ts` (cliente REST), `src/lib/db/notion.ts`
> (persistência do token), `open-sse/mcp-server/tools/notionTools.ts` (6 ferramentas MCP),
> `src/app/api/settings/notion/route.ts` (API de definições). O registo de ferramentas e a
> configuração de âmbitos encontram-se em `open-sse/mcp-server/server.ts`.

## O que é

O OmniRoute pode ligar-se a um espaço de trabalho do **Notion** como uma **fonte de contexto** — uma base de
conhecimentos de leitura/escrita à qual os agentes acedem através do servidor MCP integrado. Assim que um token
de integração do Notion estiver configurado, as ferramentas MCP permitem que um LLM pesquise páginas e bases de dados,
leia o conteúdo das páginas e árvores de blocos, consulte bases de dados com filtros/ordenações e acrescente novos
blocos — tudo encaminhado através do OmniRoute (com repetição, tempo limite e classificação de erros),
pelo que o modelo nunca acede diretamente à API do Notion.

A integração é um invólucro simples e robusto da API REST oficial do Notion
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). O cliente
(`src/lib/notion/api.ts`) acrescenta:

- **Repetição com recuo exponencial** (até 3 tentativas) para `429` e `5xx`.
- **Tempo limite de 55 segundos por pedido** através de `AbortController`.
- **Classificação tipada de erros** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, respeita as indicações de `retry after`),
  `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Saneamento de mensagens** que remove fragmentos semelhantes a rastreios de pilha antes de os apresentar.

## Configuração

Não existe **nenhuma variável de ambiente** para o token do Notion — este é armazenado na
tabela `key_value` do SQLite (espaço de nomes `notion`, chave `integration_token`) através de
`src/lib/db/notion.ts`. Configure-o no separador **Fontes de contexto** do painel do Endpoint
(`NotionSourceCard`, componente irmão de `ObsidianSourceCard`) ou através da API REST de definições.

> [!NOTE]
> O token é um **token de integração interna do Notion**. Crie uma integração em
> <https://www.notion.com/my-integrations> e, em seguida, partilhe com essa integração as páginas/bases de dados às quais pretende
> que o OmniRoute aceda (o modelo de permissões do Notion baseia-se em partilhas,
> não abrange todo o espaço de trabalho).

### Configurar através de REST

```bash
# Guardar + validar o token de integração (POST valida através de uma pesquisa de teste)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Verificar o estado da ligação
curl http://localhost:20128/api/settings/notion

# Desligar (limpa o token armazenado)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Os três métodos requerem autenticação no painel (`isAuthenticated`). Num pedido `POST`,
o OmniRoute guarda o token e executa imediatamente uma pesquisa de teste com 1 resultado; se o Notion
devolver um objeto de erro, o token é limpo e a chamada falha com `400`.

## Ferramentas MCP (6)

Definidas em `open-sse/mcp-server/tools/notionTools.ts`. O token é obtido no momento da chamada
através de `getNotionToken()`; se nenhum estiver configurado, a ferramenta gera o erro
`"Notion integration token not configured. Set it in Settings > Context Sources."`

| Ferramenta                   | Âmbito         | Descrição                                                                                                   |
| ---------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Pesquisa páginas e bases de dados através de uma consulta de texto (devolve títulos, IDs e URLs). Paginada. |
| `notion_get_page`            | `read:notion`  | Obtém o conteúdo e os metadados de uma página através do respetivo ID.                                      |
| `notion_list_block_children` | `read:notion`  | Lista todos os blocos subordinados de um bloco ou página (a árvore de blocos). Paginada.                    |
| `notion_query_database`      | `read:notion`  | Consulta uma base de dados com `filter` + `sorts` opcionais (formato da API do Notion). Paginada.           |
| `notion_get_database`        | `read:notion`  | Obtém o esquema/os metadados de uma base de dados através do ID.                                            |
| `notion_append_blocks`       | `write:notion` | Acrescenta blocos subordinados a um bloco ou página existente (máximo de 100 blocos por pedido).            |

### Parâmetros de entrada

- `notion_search` — `query` (1–500 carateres), `pageSize` (1–100, predefinição: 20),
  `startCursor` (opcional).
- `notion_get_page` — `pageId` (hexadecimal ou UUID de 32 carateres).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, predefinição: 50),
  `startCursor` (opcional).
- `notion_query_database` — `databaseId`, `filter` (opcional, formato de filtro do Notion),
  `sorts` (matriz opcional), `pageSize` (1–100, predefinição: 50), `startCursor` (opcional).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (matriz de objetos de bloco),
  `after` (posição opcional).

### Âmbitos

As ferramentas de leitura requerem `read:notion` e a ferramenta de escrita requer `write:notion`.
Os âmbitos são impostos por `withScopeEnforcement()` em
`open-sse/mcp-server/server.ts` apenas quando `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; os
âmbitos permitidos ao autor da chamada provêm de `OMNIROUTE_MCP_SCOPES` (separados por vírgulas) ou do
contexto de âmbito da chave de API autenticada. Consulte [MCP-SERVER.md](./MCP-SERVER.md) para conhecer o
modelo de âmbitos completo.

## Endpoints

| Método   | Caminho                | Finalidade                               |
| -------- | ---------------------- | ---------------------------------------- |
| `GET`    | `/api/settings/notion` | Devolver `{ connected, hasToken }`.      |
| `POST`   | `/api/settings/notion` | Guardar + validar o token de integração. |
| `DELETE` | `/api/settings/notion` | Desligar (limpar o token armazenado).    |

> Estas são rotas de definições do painel. **Não existe qualquer endpoint proxy
> público `/v1` do Notion** — o acesso ao Notion é efetuado exclusivamente através das ferramentas MCP acima.

## Casos de utilização

- **Respostas baseadas em conhecimento** — permitir que um agente utilize `notion_search` no espaço de trabalho e
  `notion_get_page` no principal resultado antes de responder, para que as respostas citem documentação interna real.
- **Fluxos de trabalho baseados em bases de dados** — utilizar `notion_query_database` numa base de dados de tarefas/CRM com
  filtros + ordenações e, em seguida, resumir ou fazer a triagem das linhas.
- **Registo / escrita de resultados** — utilizar `notion_append_blocks` para adicionar notas de reuniões, resumos
  de execuções ou resultados do agente a uma página existente (apenas adição; sem edições destrutivas).
- **Exploração da estrutura** — utilizar `notion_list_block_children` para percorrer a árvore de blocos de uma página
  ou `notion_get_database` para conhecer o esquema de propriedades de uma base de dados antes de a consultar.

## Relacionado

- [Servidor MCP](./MCP-SERVER.md) — transportes, aplicação do âmbito, inventário completo de ferramentas.
- [Fonte de Contexto do Obsidian](./OBSIDIAN_CONTEXT.md) — a outra fonte de contexto incorporada.
- [Sistema de Memória](./MEMORY.md) — memória conversacional persistente (camada de
  contexto complementar, injetada automaticamente em vez de obtida através de ferramentas).
