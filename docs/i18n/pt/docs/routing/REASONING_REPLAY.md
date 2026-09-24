# Reasoning Replay Cache (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Fonte fidedigna:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute captura o `reasoning_content` do assistente produzido por modelos em modo de raciocínio e reprodu-lo de forma transparente em pedidos com vários turnos quando o fornecedor a montante assim o exige. Isto elimina os erros HTTP 400 que os fornecedores mais rigorosos devolvem quando o histórico de conversação de um cliente não inclui o raciocínio do turno anterior.

## Por Que Existe

Vários fornecedores de modelos em modo de raciocínio rejeitam um turno subsequente, a menos que a **mensagem anterior do assistente inclua o `reasoning_content` original**. O serviço a montante devolve o erro 400 com mensagens como:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

No entanto, os clientes habituais (Cursor, Cline, Roo Code, OpenAI SDK) removem o `reasoning_content` do histórico que reproduzem. O OmniRoute restaura-o a partir de uma cache do lado do servidor, para que o pedido recebido pelo serviço a montante seja consistente. A issue #1628 introduziu a persistência híbrida em memória/SQLite para que a cache sobreviva a reinícios do processo.

## Arquitetura

```
Turno N (o assistente gera):
  → a resposta contém reasoning_content + tool_calls
  → se requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      escreve (memória + BD), indexado por cada tool_call.id
  → encaminha a resposta para o cliente (que pode ou não reter o raciocínio)

Turno N+1 (o cliente envia um pedido de seguimento):
  → o tradutor deteta: requiresReasoningReplay(provider, model) === true
  → para cada mensagem do assistente com tool_calls e sem reasoning_content:
      lookupReasoning(toolCalls[0].id) → memória → BD
      encontrado     → msg.reasoning_content = cached; recordReplay()
      não encontrado → msg.reasoning_content = "" (mecanismo de contingência legado para versões anteriores do DeepSeek)
  → o serviço a montante vê um histórico consistente → sem erro 400
```

A captura ocorre em `open-sse/handlers/chatCore.ts` (em dois locais, nos dois pontos de chamada de `cacheReasoningFromAssistantMessage`). A repetição ocorre em `open-sse/translator/index.ts`, após a coerção do esquema, mas antes do envio.

Os turnos simples do assistente (sem chamadas de ferramentas) são indexados de forma diferente: `buildAssistantMessageCacheKey()` calcula um resumo criptográfico do âmbito da sessão juntamente com a transcrição normalizada no formato OpenAI até esse turno, porque o DeepSeek exige o raciocínio de _todos_ os turnos anteriores assim que `tools` está presente. Para destinos da Responses API (por exemplo, `opencode-go/deepseek-v4-flash`, encaminhado para `/responses`), o corpo enviado ao serviço a montante contém `input`, e não `messages`, pelo que `translateRequest()` (`open-sse/translator/index.ts`) comunica, através de uma opção de callback, a transcrição intermédia usada para calcular o resumo criptográfico, e os pontos de captura calculam o resumo dessa mesma transcrição. A passagem de repetição de Responses é executada sobre a representação intermédia OpenAI para todos os formatos de origem, pelo que os clientes de Anthropic Messages (Claude → OpenAI → Responses) também são abrangidos pela repetição.

## Armazenamento — Memória Híbrida + SQLite

O caminho crítico utiliza um `Map` em memória (LRU por criação), suportado por uma tabela SQLite para recuperação após falhas e visibilidade no painel.

| Camada  | Implementação                                  | Finalidade                                              |
| ------- | ---------------------------------------------- | ------------------------------------------------------- |
| Memória | `Map` em `open-sse/services/reasoningCache.ts` | Pesquisas rápidas, remove a entrada mais antiga aos 200 |
| BD      | Tabela `reasoning_cache` (`src/lib/db/`)       | Persiste entre reinícios, fornece as estatísticas       |

As escritas são efetuadas em ambos. As leituras consultam primeiro a memória e, em seguida, recorrem à BD (os resultados encontrados na BD são novamente promovidos para a memória). As falhas da BD não são fatais — a cache em memória continua a servir o caminho crítico.

**Predefinições:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Máximo de entradas em memória: `200` (`MAX_MEMORY_ENTRIES`)
- Remoção: o `createdAt` mais antigo primeiro

## Esquema da Base de Dados

Migração: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Índices: `expires_at`, `provider`, `model`, `created_at`. O `expires_at` é armazenado como segundos da época Unix; a camada SELECT normaliza os valores de texto legados através de `EXPIRES_AT_EPOCH_SQL`.

## Deteção de Fornecedor / Modelo

A reprodução é ativada quando `requiresReasoningReplay(provider, model)` devolve `true`. A função verifica duas listas em `open-sse/services/reasoningCache.ts`.

**IDs de fornecedores (correspondência exata, sem distinção entre maiúsculas e minúsculas):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Padrões regex de modelos (sem distinção entre maiúsculas e minúsculas):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` e `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, sufixo `-free` opcional)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Adicionar um novo fornecedor/modelo estrito implica acrescentá-lo a uma destas listas e escrever um teste unitário que confirme a injeção da reprodução. A descrição do PR deve citar a mensagem 400 exata do sistema a montante que motivou a alteração.

## API REST

A cache expõe dois endpoints em `src/app/api/cache/reasoning/route.ts`. Ambos requerem autenticação de gestão (`isAuthenticated` de `@/shared/utils/apiAuth`).

| Método | Endpoint                                                  | Descrição                                                        |
| ------ | --------------------------------------------------------- | ---------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Estatísticas + entradas paginadas                                |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Listagem filtrada (`limit` restringido ao intervalo `[1, 200]`)  |
| DELETE | `/api/cache/reasoning`                                    | Limpa tudo (memória + BD) e repõe as contagens de acertos/falhas |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Limpa apenas as entradas de um fornecedor                        |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Elimina uma única entrada                                        |

**Estrutura da resposta GET:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Notas Operacionais

- **Limpeza:** `cleanupReasoningCache()` remove as entradas expiradas da memória e executa `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Os workers de verificação do estado executam esta operação periodicamente.
- **Recuperação após falha:** Após um reinício, a memória está vazia, mas a BD ainda contém entradas não expiradas. A primeira consulta de um determinado `tool_call_id` é um acerto na BD; as consultas seguintes são acertos na memória.
- **Sem raciocínio, sem cache:** `cacheReasoningFromAssistantMessage` devolve `0` quando a mensagem do assistente não tem um campo `reasoning_content` / `reasoning`, pelo que as respostas sem raciocínio não têm qualquer custo.
- **A escrita também está condicionada:** ambos os pontos de chamada em `chatCore.ts` (sem streaming e com streaming) apenas chamam `cacheReasoningFromAssistantMessage()` quando `requiresReasoningReplay(provider, model)` é `true` — o mesmo predicado verificado no lado da leitura. As instalações que nunca contactam um fornecedor com reprodução deixam de suportar o custo da escrita, da atualização do índice e do try/catch em todas as respostas que contêm raciocínio.
- **Fornecedores não estritos:** Quando `requiresReasoningReplay` é `false` e o formato de destino é OpenAI, o tradutor **remove** qualquer campo `reasoning_content` das mensagens enviadas — o OpenAI Chat Completions não o aceita.

## Ver também

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — disjuntores, períodos de espera, bloqueios de modelos
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnóstico de erros 400 de serviços a montante
- Código-fonte: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migração: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Rota da API: `src/app/api/cache/reasoning/route.ts`
- Problema original: #1628
