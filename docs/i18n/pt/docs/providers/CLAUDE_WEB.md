# Providers — Claude Web (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

O `claude-web` envia pedidos de chat no formato OpenAI através de uma sessão autenticada do browser em `claude.ai`. O executor normaliza o cookie fornecido, resolve uma organização autenticada, prepara o estado da conversa, seleciona um transporte direto ou através do browser e traduz rigorosamente a resposta SSE a montante. A orquestração encontra-se em `open-sse/executors/claude-web.ts:320`.

> **É a primeira vez que utiliza fornecedores de cookies Web?**
>
> Leia **`docs/getting-started/WEB-COOKIE-GUIDE.md`** para conhecer o processo geral de configuração, as orientações de autenticação, as limitações e a resolução de problemas antes de seguir este guia específico do fornecedor.

### Catálogo de modelos

Atualmente, o registo do fornecedor expõe exatamente estes sete IDs de modelo estáticos
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| ID do modelo                | Nome de apresentação    |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

A descoberta dinâmica de modelos não está implementada para este fornecedor. A lista acima é o catálogo em tempo de execução.

### Credenciais e resolução da organização

Forneça o cabeçalho Cookie completo de `claude.ai` ou apenas um valor de sessão. Os valores simples são normalizados para `sessionKey`; os restantes cookies são preservados, caso sejam fornecidos. O executor aceita o cookie através de `cookie` ou `apiKey` e lê os valores opcionais `deviceId` e `orgId` a partir dos dados da ligação
(`open-sse/executors/claude-web.ts:72`).

Se `orgId` estiver ausente, o executor chama `GET https://claude.ai/api/organizations` e utiliza a primeira organização devolvida pela sessão autenticada do Claude Web
(`open-sse/executors/claude-web.ts:141`). Falha de forma segura quando não é devolvida nenhuma organização válida, comunica como 401 uma autorização de sessão rejeitada e distingue um desafio do Cloudflare de uma falha de autenticação.

### Operações de conversa

O objeto opcional de nível superior `claude_web` é estrito. Os campos desconhecidos são rejeitados. Os campos aceites são definidos em `open-sse/executors/claude-web/session.ts:50`:

| Campo                 | Significado                                                                 |
| --------------------- | --------------------------------------------------------------------------- |
| `operation`           | `completion` por predefinição; utilize `retry` para repetir um turno        |
| `conversation_id`     | UUID explícito de uma conversa existente                                    |
| `parent_message_uuid` | UUID explícito da mensagem principal do assistente                          |
| `timezone`            | Nome válido de um fuso horário IANA                                         |
| `locale`              | Região estruturalmente válida                                               |
| `tool_states`         | Matriz opcional de estados de ferramentas da conta, limitada a 128 entradas |

Os pedidos preparados utilizam um de dois endpoints a montante
(`open-sse/executors/claude-web.ts:203`):

- Um turno novo ou subsequente é enviado para
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Uma repetição é enviada para
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Um turno novo inclui `create_conversation_params`. Um turno subsequente em cache ou explicitamente associado inclui `parent_message_uuid` e omite `create_conversation_params`. A repetição requer o estado da conversa e da mensagem principal e não envia nenhum prompt
(`open-sse/executors/claude-web/session.ts:254`). As conversas novas abrem a interface autenticada em `/new`; os turnos subsequentes em cache ou explicitamente associados abrem a página exata da conversa
(`open-sse/executors/claude-web/session.ts:324`).

O estado da conversa é uma cache em memória, indexada por um âmbito de conta SHA-256 e pela transcrição canónica do autor da chamada. As entradas expiram após 30 minutos e a cache está limitada a 5.000 entradas
(`open-sse/executors/claude-web/session.ts:12`). O estado só é confirmado depois de o analisador estrito do fluxo observar `message_stop`; os reinícios do processo eliminam-no. Em caso de ausência na cache, um pedido com várias mensagens é serializado num único prompt de recuperação, em vez de descartar silenciosamente as mensagens anteriores.

A região e o fuso horário utilizam esta ordem de precedência: valor de `claude_web` do pedido, valor da ligação, valor do ambiente de execução e, por fim, `en-US` para a região ou `UTC` para o fuso horário
(`open-sse/executors/claude-web/session.ts:218`).

### Ferramentas e payloads dos pedidos

Os pedidos diretos transformam apenas ferramentas de função OpenAI estruturalmente válidas fornecidas pelo autor da chamada. Não existe uma lista estática predefinida de ferramentas gerada artificialmente
(`open-sse/executors/claude-web/payload.ts:102`).

Em alternativa, os pedidos do browser capturam o pedido da interface autenticada e mantêm as respetivas ferramentas de conta, estados de ferramentas e estilos personalizados. Os campos preparados da conversa, do modelo, do raciocínio, do prompt e do UUID da mensagem continuam a substituir os valores do pedido capturado
(`open-sse/executors/claude-web/browserTransport.ts:175`). Os modelos do browser têm um âmbito definido por um hash da conta, da organização, do cookie, da região e do fuso horário e expiram após 30 minutos
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). Quando um pedido direto não contém ferramentas do autor da chamada, pode reutilizar esse modelo com âmbito definido; as ferramentas explícitas do autor da chamada têm precedência
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Seleção do transporte

O caminho predefinido é `sendClaudeWebDirect()`, que chama `tlsFetchClaude()` com o perfil Chrome 146 configurado e o cookie fornecido (`open-sse/services/claudeTlsClient.ts:23`). Não inicia um solucionador nem gera um cookie de substituição.

Defina `WEB_COOKIE_USE_BROWSER` como `1`, `true` ou `on` para tornar o adaptador de browser
com âmbito de conta no transporte principal. Defina `OMNIROUTE_BROWSER_POOL` como um dos mesmos valores para
permitir que um desafio 403 reconhecido do Cloudflare passe do transporte direto para o
adaptador de browser (`open-sse/executors/claude-web.ts:195`). Outras falhas HTTP não acionam
esse mecanismo de contingência.

O adaptador de browser mantém os cookies no mesmo contexto Playwright agrupado, utiliza a chave
hash com âmbito descrita acima e envia a conclusão a partir desse contexto
(`open-sse/executors/claude-web/browserTransport.ts:444`). Nunca exporta um cookie resolvido pelo
browser para o cliente TLS direto. As novas tentativas no browser exigem um modelo de IU não expirado associado
ao mesmo contexto Playwright efetivo (`open-sse/executors/claude-web/browserTransport.ts:467`).
As leituras de respostas do browser são executadas incrementalmente na página autenticada, respeitam o cancelamento
do pedido e cancelam o corpo a montante assim que este excede 16 MiB
(`open-sse/executors/claude-web/browserTransport.ts:259`).

O executor devolve uma projeção de auditoria anonimizada ao registador de pedidos partilhado: os UUIDs
da organização, conversa e mensagem, o texto do pedido, as definições de ferramentas, os cookies e os identificadores
de dispositivos são excluídos (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). As exceções de transporte também devolvem um erro de ligação
genérico, em vez da mensagem lançada.

### Comportamento SSE

`createClaudeWebResponse()` processa enquadramento LF ou CRLF e campos `data:` multilinha. Mapeia
deltas de texto para `content`, deltas de raciocínio para `reasoning_content` e eventos de metadados conhecidos
para a extensão de resposta `claude_web`. Cada evento de metadados é projetado através da sua própria lista de
campos permitidos (`open-sse/executors/claude-web/stream.ts:37`). Os metadados
da conversa, da mensagem principal, da mensagem do assistente e da operação também são devolvidos nos
cabeçalhos `X-OmniRoute-Claude-Web-*` (`open-sse/executors/claude-web/stream.ts:364`).

O analisador falha de forma segura perante JSON malformado, eventos `error` a montante, tipos de eventos
desconhecidos, ordenação inválida, incompatibilidades de blocos de conteúdo ou EOF antes de `message_stop`. A saída
em streaming emite um fragmento de conclusão e um `[DONE]`; a saída em buffer utiliza o mesmo analisador. O analisador trata
`message_stop` como terminal de imediato, cancela os dados a montante subsequentes e propaga
o cancelamento a jusante para o leitor a montante (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). As linhas SSE não terminadas e os eventos acumulados
estão limitados a 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Ficheiros

| Ficheiro                                                 | Finalidade                                |
| -------------------------------------------------------- | ----------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Registo estático de modelos do fornecedor |
| `open-sse/executors/claude-web.ts`                       | Orquestração do executor                  |
| `open-sse/executors/claude-web/payload.ts`               | Transformação da carga útil e ferramentas |
| `open-sse/executors/claude-web/session.ts`               | Estado do turno e cache da transcrição    |
| `open-sse/executors/claude-web/transport.ts`             | Adaptador de transporte direto            |
| `open-sse/executors/claude-web/browserTransport.ts`      | Adaptador de browser com âmbito de conta  |
| `open-sse/executors/claude-web/stream.ts`                | Tradução SSE rigorosa                     |
| `open-sse/services/claudeTlsClient.ts`                   | Transporte TLS nativo                     |
| `open-sse/services/browserPool.ts`                       | Contextos Playwright agrupados            |

### Testes

Execute o conjunto determinístico do Claude Web sem credenciais reais:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Os casos dependentes do Playwright em `tests/unit/claude-web-auto-refresh.test.ts` são explicitamente
ignorados. Atualmente, este repositório não define um script de teste em ambiente real do Claude Web
com credenciais, pelo que esses casos ignorados não constituem prova em tempo de execução.

### Configuração

1. Inicie o OmniRoute com `npm run dev` ou uma instalação compilada.
2. Abra Painel → Fornecedores → Adicionar fornecedor.
3. Selecione a categoria Cookie da Web e Claude Web.
4. Cole o cabeçalho Cookie completo copiado de um pedido autenticado para `claude.ai`.
