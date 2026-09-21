# Reasoning Replay Cache (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Fonte da verdade:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute captura o `reasoning_content` do assistente produzido por modelos no modo de raciocínio e o reproduz de forma transparente em solicitações com múltiplos turnos quando o provedor upstream exige isso. Isso elimina os erros HTTP 400 que provedores rigorosos geram quando o histórico da conversa de um cliente não contém o raciocínio do turno anterior.

## Por Que Isso Existe

Vários provedores no modo de raciocínio rejeitam um turno subsequente, a menos que a **mensagem anterior do assistente inclua o `reasoning_content` original**. O upstream retorna 400 com mensagens como:

```
Parâmetro incorreto: o reasoning_content no modo de raciocínio deve ser enviado de volta para a API.
```

No entanto, clientes comuns (Cursor, Cline, Roo Code, OpenAI SDK) removem o `reasoning_content` do histórico que reproduzem. O OmniRoute o restaura a partir de um cache no lado do servidor para que a solicitação recebida pelo upstream seja consistente. A issue #1628 introduziu a persistência híbrida em memória/SQLite para que o cache sobreviva a reinicializações do processo.

## Arquitetura

```
Turno N (o assistente gera):
  → a resposta contém reasoning_content + tool_calls
  → se requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      grava (memória + DB), usando cada tool_call.id como chave
  → encaminha a resposta ao cliente (que pode ou não preservar o raciocínio)

Turno N+1 (o cliente envia uma solicitação subsequente):
  → o tradutor detecta: requiresReasoningReplay(provider, model) === true
  → para cada mensagem do assistente com tool_calls e sem reasoning_content:
      lookupReasoning(toolCalls[0].id) → memória → DB
      acerto → msg.reasoning_content = cached; recordReplay()
      erro   → msg.reasoning_content = "" (fallback legado para versões mais antigas do DeepSeek)
  → o upstream recebe um histórico consistente → sem erro 400
```

A captura ocorre em `open-sse/handlers/chatCore.ts` (em dois locais, nos dois pontos de chamada de `cacheReasoningFromAssistantMessage`). A reprodução ocorre em `open-sse/translator/index.ts` após a coerção de esquema, mas antes do encaminhamento.

## Armazenamento — Memória Híbrida + SQLite

O caminho crítico usa um `Map` em memória (LRU por criação), respaldado por uma tabela SQLite para recuperação após falhas e visibilidade no painel.

| Camada  | Implementação                                  | Finalidade                                             |
| ------- | ---------------------------------------------- | ------------------------------------------------------ |
| Memória | `Map` em `open-sse/services/reasoningCache.ts` | Consultas rápidas, remove o mais antigo após 200       |
| DB      | Tabela `reasoning_cache` (`src/lib/db/`)       | Persiste entre reinicializações, alimenta estatísticas |

As gravações são realizadas em ambos. As leituras consultam primeiro a memória e depois recorrem ao DB (os resultados encontrados no DB são promovidos de volta para a memória). Falhas no DB não são fatais — o cache em memória continua atendendo ao caminho crítico.

**Valores padrão:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Máximo de entradas na memória: `200` (`MAX_MEMORY_ENTRIES`)
- Remoção: `createdAt` mais antigo primeiro

## Esquema do Banco de Dados

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

Índices: `expires_at`, `provider`, `model`, `created_at`. `expires_at` é armazenado como segundos da época Unix; a camada SELECT normaliza valores de texto legados por meio de `EXPIRES_AT_EPOCH_SQL`.

## Detecção de provedor / modelo

A repetição é habilitada quando `requiresReasoningReplay(provider, model)` retorna `true`. A função verifica duas listas em `open-sse/services/reasoningCache.ts`.

**IDs de provedores (correspondência exata, sem diferenciar maiúsculas de minúsculas):**

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

**Padrões regex de modelos (sem diferenciar maiúsculas de minúsculas):**

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

Adicionar um novo provedor/modelo estrito significa acrescentá-lo a uma dessas listas e escrever um teste unitário que confirme a injeção da repetição. A descrição do PR deve citar a string exata do erro 400 upstream que motivou a alteração.

## API REST

O cache expõe dois endpoints em `src/app/api/cache/reasoning/route.ts`. Ambos exigem autenticação de gerenciamento (`isAuthenticated` de `@/shared/utils/apiAuth`).

| Método | Endpoint                                                  | Descrição                                                                   |
| ------ | --------------------------------------------------------- | --------------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Estatísticas + entradas paginadas                                           |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Listagem filtrada (`limit` limitado ao intervalo `[1, 200]`)                |
| DELETE | `/api/cache/reasoning`                                    | Limpa tudo (memória + banco de dados) e zera as contagens de acertos/falhas |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Limpa apenas as entradas de um provedor                                     |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Exclui uma única entrada                                                    |

**Formato da resposta GET:**

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

## Notas operacionais

- **Limpeza:** `cleanupReasoningCache()` remove entradas expiradas da memória e executa `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Os workers de verificação de integridade chamam essa função periodicamente.
- **Recuperação após falha:** Após uma reinicialização, a memória fica vazia, mas o banco de dados ainda mantém as entradas não expiradas. A primeira consulta de um determinado `tool_call_id` resulta em um acerto no banco de dados; as consultas subsequentes resultam em acertos na memória.
- **Sem raciocínio, sem cache:** `cacheReasoningFromAssistantMessage` retorna `0` quando a mensagem do assistente não contém o campo `reasoning_content` / `reasoning`, portanto respostas sem raciocínio não geram custo algum.
- **A gravação também é condicionada:** ambos os locais de chamada em `chatCore.ts` (sem streaming e com streaming) só chamam `cacheReasoningFromAssistantMessage()` quando `requiresReasoningReplay(provider, model)` é `true` — o mesmo predicado verificado no lado da leitura. Instalações que nunca usam um provedor com repetição deixam de arcar com a gravação, a atualização do índice e o try/catch em cada resposta que contém raciocínio.
- **Provedores não estritos:** Quando `requiresReasoningReplay` é `false` e o formato de destino é OpenAI, o tradutor **remove** qualquer campo `reasoning_content` das mensagens de saída — o OpenAI Chat Completions não o aceita.

## Veja também

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breakers, períodos de espera, bloqueios de modelos
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnóstico de erros 400 de serviços upstream
- Código-fonte: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migração: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Rota da API: `src/app/api/cache/reasoning/route.ts`
- Issue original: #1628
