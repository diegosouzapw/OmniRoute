# Providers — Claude Web (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

O `claude-web` envia solicitações de chat no formato OpenAI por meio de uma sessão autenticada do navegador no `claude.ai`. O executor normaliza o cookie fornecido, resolve uma organização autenticada, prepara o estado da conversa, seleciona um transporte direto ou via navegador e traduz estritamente a resposta SSE do serviço de origem. A orquestração está em `open-sse/executors/claude-web.ts:320`.

> **Primeira vez usando provedores de Web Cookie?**
>
> Leia **`docs/getting-started/WEB-COOKIE-GUIDE.md`** para conhecer o processo geral de configuração, as orientações de autenticação, as limitações e a solução de problemas antes de seguir este guia específico do provedor.

### Catálogo de modelos

Atualmente, o registro do provedor expõe exatamente estes sete IDs de modelo estáticos (`open-sse/config/providers/registry/claude/web/index.ts:11`):

| ID do modelo                | Nome de exibição        |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

A descoberta dinâmica de modelos não está implementada para este provedor. A lista acima é o catálogo disponível em tempo de execução.

### Credenciais e resolução da organização

Forneça o cabeçalho Cookie completo do `claude.ai` ou apenas o valor da sessão. Valores isolados são normalizados para `sessionKey`; outros cookies são preservados se forem fornecidos. O executor aceita o cookie por meio de `cookie` ou `apiKey` e lê os valores opcionais `deviceId` e `orgId` dos dados da conexão (`open-sse/executors/claude-web.ts:72`).

Se `orgId` estiver ausente, o executor chama `GET https://claude.ai/api/organizations` e usa a primeira organização retornada pela sessão autenticada do Claude Web (`open-sse/executors/claude-web.ts:141`). Ele falha de forma segura quando nenhuma organização válida é retornada, relata como 401 uma autorização de sessão rejeitada e diferencia um desafio do Cloudflare de uma falha de autenticação.

### Operações de conversa

O objeto opcional `claude_web` de nível superior é estrito. Campos desconhecidos são rejeitados. Seus campos aceitos são definidos em `open-sse/executors/claude-web/session.ts:50`:

| Campo                 | Significado                                                                 |
| --------------------- | --------------------------------------------------------------------------- |
| `operation`           | `completion` por padrão; use `retry` para uma tentativa novamente           |
| `conversation_id`     | UUID explícito de uma conversa existente                                    |
| `parent_message_uuid` | UUID explícito da mensagem assistente principal                             |
| `timezone`            | Nome válido de fuso horário da IANA                                         |
| `locale`              | Localidade estruturalmente válida                                           |
| `tool_states`         | Matriz opcional de estados de ferramentas da conta, limitada a 128 entradas |

As solicitações preparadas usam um de dois endpoints do serviço de origem (`open-sse/executors/claude-web.ts:203`):

- Um turno novo ou de continuação envia uma solicitação para
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Uma nova tentativa envia uma solicitação para
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Um novo turno inclui `create_conversation_params`. Uma continuação em cache ou vinculada explicitamente inclui `parent_message_uuid` e omite `create_conversation_params`. Uma nova tentativa exige os estados da conversa e da mensagem principal e não envia nenhum prompt (`open-sse/executors/claude-web/session.ts:254`). Novas conversas abrem a interface autenticada em `/new`; continuações em cache ou vinculadas explicitamente abrem a página exata da conversa (`open-sse/executors/claude-web/session.ts:324`).

O estado da conversa é um cache em memória indexado por um escopo de conta SHA-256 e pela transcrição canônica do chamador. As entradas expiram após 30 minutos, e o cache é limitado a 5.000 entradas (`open-sse/executors/claude-web/session.ts:12`). O estado é confirmado somente depois que o analisador estrito do fluxo observa `message_stop`; reinicializações do processo o descartam. Em caso de falha de cache, uma solicitação com várias mensagens é serializada em um único prompt de recuperação, em vez de descartar silenciosamente as mensagens anteriores.

A localidade e o fuso horário usam esta ordem de precedência: valor de `claude_web` da solicitação, valor da conexão, valor do ambiente de execução e, por fim, `en-US` para a localidade ou `UTC` para o fuso horário (`open-sse/executors/claude-web/session.ts:218`).

### Ferramentas e payloads de solicitação

As solicitações diretas transformam apenas ferramentas de função OpenAI estruturalmente válidas fornecidas pelo chamador. Não há uma lista padrão estática de ferramentas gerada artificialmente (`open-sse/executors/claude-web/payload.ts:102`).

As solicitações do navegador, por sua vez, capturam a solicitação da interface autenticada e preservam suas ferramentas de conta, os estados das ferramentas e os estilos personalizados. Os campos preparados de conversa, modelo, raciocínio, prompt e UUID da mensagem ainda substituem os valores da solicitação capturada (`open-sse/executors/claude-web/browserTransport.ts:175`). Os modelos de navegador têm como escopo um hash da conta, da organização, do cookie, da localidade e do fuso horário, e expiram após 30 minutos (`open-sse/executors/claude-web/browserTransport.ts:11`, `open-sse/executors/claude-web/browserTransport.ts:158`). Quando uma solicitação direta não contém ferramentas do chamador, ela pode reutilizar esse modelo com escopo definido; ferramentas explícitas do chamador têm precedência (`open-sse/executors/claude-web/browserTransport.ts:214`).

### Seleção de transporte

O caminho padrão é `sendClaudeWebDirect()`, que chama `tlsFetchClaude()` com o perfil configurado do Chrome 146 e o cookie fornecido (`open-sse/services/claudeTlsClient.ts:23`). Ele não inicia um solucionador nem gera um cookie substituto.

Defina `WEB_COOKIE_USE_BROWSER` como `1`, `true` ou `on` para tornar o adaptador de navegador com escopo de conta o transporte principal. Defina `OMNIROUTE_BROWSER_POOL` como um dos mesmos valores para permitir que um desafio 403 reconhecido do Cloudflare faça fallback do transporte direto para o adaptador de navegador (`open-sse/executors/claude-web.ts:195`). Outras falhas HTTP não acionam esse fallback.

O adaptador de navegador mantém os cookies dentro do mesmo contexto Playwright em pool, usa a chave com hash e escopo descrita acima e envia a conclusão a partir desse contexto (`open-sse/executors/claude-web/browserTransport.ts:444`). Ele nunca exporta um cookie resolvido pelo navegador para o cliente TLS direto. As novas tentativas pelo navegador exigem um template de UI não expirado vinculado ao mesmo contexto Playwright real (`open-sse/executors/claude-web/browserTransport.ts:467`). As leituras de resposta pelo navegador são executadas incrementalmente na página autenticada, respeitam o cancelamento da solicitação e cancelam o corpo upstream assim que ele excede 16 MiB (`open-sse/executors/claude-web/browserTransport.ts:259`).

O executor retorna uma projeção de auditoria com dados sensíveis removidos para o logger compartilhado de solicitações: UUIDs da organização, conversa e mensagem, texto do prompt, definições de ferramentas, cookies e identificadores de dispositivo são excluídos (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). As exceções de transporte também retornam um erro genérico de conexão, em vez da mensagem lançada.

### Comportamento do SSE

`createClaudeWebResponse()` processa enquadramento LF ou CRLF e campos `data:` multilinha. Ele mapeia deltas de texto para `content`, deltas de raciocínio para `reasoning_content` e eventos de metadados conhecidos para a extensão de resposta `claude_web`. Cada evento de metadados é projetado por meio de sua própria lista de campos permitidos (`open-sse/executors/claude-web/stream.ts:37`). Os metadados da conversa, da mensagem pai, da mensagem do assistente e da operação também são retornados nos cabeçalhos `X-OmniRoute-Claude-Web-*` (`open-sse/executors/claude-web/stream.ts:364`).

O parser falha de forma segura diante de JSON malformado, eventos upstream `error`, tipos de evento desconhecidos, ordenação inválida, incompatibilidades de blocos de conteúdo ou EOF antes de `message_stop`. A saída por streaming emite um bloco de finalização e um `[DONE]`; a saída em buffer usa o mesmo parser. O parser trata `message_stop` como terminal imediatamente, cancela dados upstream subsequentes e propaga o cancelamento downstream para o leitor upstream (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Linhas SSE não terminadas e eventos acumulados são limitados a 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Arquivos

| Arquivo                                                  | Finalidade                                 |
| -------------------------------------------------------- | ------------------------------------------ |
| `open-sse/config/providers/registry/claude/web/index.ts` | Registro estático de modelos do provedor   |
| `open-sse/executors/claude-web.ts`                       | Orquestração do executor                   |
| `open-sse/executors/claude-web/payload.ts`               | Transformação de payload e ferramentas     |
| `open-sse/executors/claude-web/session.ts`               | Estado do turno e cache da transcrição     |
| `open-sse/executors/claude-web/transport.ts`             | Adaptador de transporte direto             |
| `open-sse/executors/claude-web/browserTransport.ts`      | Adaptador de navegador com escopo de conta |
| `open-sse/executors/claude-web/stream.ts`                | Tradução SSE estrita                       |
| `open-sse/services/claudeTlsClient.ts`                   | Transporte TLS nativo                      |
| `open-sse/services/browserPool.ts`                       | Contextos Playwright em pool               |

### Testes

Execute a suíte determinística do Claude Web sem credenciais reais:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Os casos que dependem do Playwright em `tests/unit/claude-web-auto-refresh.test.ts` são explicitamente ignorados. Atualmente, este repositório não define um script de teste em ambiente real do Claude Web com credenciais; portanto, esses casos ignorados não constituem comprovação de execução.

### Configuração

1. Inicie o OmniRoute com `npm run dev` ou usando uma instalação compilada.
2. Abra Dashboard → Providers → Add Provider.
3. Selecione a categoria Web Cookie e Claude Web.
4. Cole o cabeçalho Cookie completo copiado de uma solicitação autenticada para `claude.ai`.
