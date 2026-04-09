# Feature 80 — Injeção de Resposta Sintética para SSE Vazio

**Fonte:** Análise do repositório `kaitranntt/ccs` — módulo `src/cliproxy/tool-sanitization-proxy.ts` (linhas 620-658)
**Prioridade:** 🔴 P0 — Previne crash no cliente
**Complexidade:** Baixa (modificação pontual no handler SSE)

---

## Motivação

Quando um provider upstream (especialmente Gemini via proxy) envia uma resposta SSE que contém `message_start` mas **nenhum `content_block`**, clientes como Claude Code crasham com o erro:

```
Error: No assistant message found in response
```

Isso acontece em cenários específicos:

1. O proxy upstream **descarta thinking blocks não assinados** durante execução de sub-agente
2. O provider retorna **resposta vazia** por rate-limit silencioso
3. Timeout no lado do provider com stream parcialmente enviado

O CCS resolveu isso injetando um **response sintético mínimo** quando detecta que o upstream enviou dados mas nenhum bloco de conteúdo.

---

## O Que Ganhamos

1. **Zero crashes no cliente** — em vez de falha silenciosa, o cliente recebe uma mensagem de erro legível
2. **Retry automático** — o cliente pode decidir reenviar baseado na mensagem de erro
3. **Observabilidade** — o evento é logado como warning para diagnóstico
4. **Resiliência** — o stream SSE é sempre completo (tem `message_start`, `content`, `message_stop`)

---

## Situação Atual (Antes)

```
Provider → stream parcial (message_start, sem content_blocks) → Cliente
                                                                  ❌ CRASH
                                                                  "No assistant message found"
```

**Comportamento atual:** OmniRoute repassa o stream SSE exatamente como recebido. Se o upstream enviar um stream incompleto (sem content blocks), o cliente recebe um stream malformado e crasha.

---

## Situação Desejada (Depois)

```
Provider → stream parcial (message_start, sem content_blocks) → OmniRoute
         OmniRoute detecta: "stream tem data mas zero content_blocks"
         OmniRoute injeta: content_block_start + text_delta + content_block_stop
                                                                  ✅ Cliente recebe erro legível
                                                                  "[Proxy Error] The upstream API
                                                                   returned an empty response..."
```

---

## Implementação Detalhada

### 1. Tracking de Lifecycle no Handler SSE

No handler de streaming (`open-sse/utils/proxyFetch.js` ou `src/sse/handlers/chat.js`), adicionar tracking do ciclo de vida do stream:

```javascript
const lifecycle = {
  hasData: false, // Recebeu qualquer dado?
  hasContent: false, // Recebeu content_block_start?
  hasMessageStart: false, // Recebeu message_start?
  hasMessageDelta: false, // Recebeu message_delta?
  hasMessageStop: false, // Recebeu message_stop?

  update(text) {
    if (text.includes('"content_block_start"')) this.hasContent = true;
    if (text.includes('"message_start"')) this.hasMessageStart = true;
    if (text.includes('"message_delta"')) this.hasMessageDelta = true;
    if (text.includes('"message_stop"')) this.hasMessageStop = true;
  },
};
```

### 2. Detecção no Evento `end` do Stream

```javascript
upstreamResponse.on("data", (chunk) => {
  lifecycle.hasData = true;
  lifecycle.update(chunk.toString("utf8"));
  clientResponse.write(chunk);
});

upstreamResponse.on("end", () => {
  const isSuccess = statusCode >= 200 && statusCode < 300;

  // Detectar resposta vazia
  if (!lifecycle.hasContent && isSuccess && lifecycle.hasData) {
    logger.warn(
      "[sse-safety] Empty response detected from upstream (no content blocks). Injecting synthetic response."
    );
    clientResponse.write(buildSyntheticErrorResponse(lifecycle));
  }

  clientResponse.end();
});
```

### 3. Builder do Response Sintético

```javascript
function buildSyntheticErrorResponse(lifecycle) {
  const events = [];

  // Apenas emitir message_start se o upstream não enviou
  if (!lifecycle.hasMessageStart) {
    const msgId = `msg_synthetic_${Date.now()}`;
    events.push(
      `event: message_start\ndata: {"type":"message_start","message":{"id":"${msgId}","type":"message","role":"assistant","content":[],"model":"unknown","stop_reason":null,"stop_sequence":null,"usage":{"input_tokens":0,"output_tokens":0}}}`
    );
  }

  // Sempre emitir o bloco de conteúdo com a mensagem de erro
  events.push(
    `event: content_block_start\ndata: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}`,
    `event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"[Proxy Error] The upstream API returned an empty response. This typically occurs when the proxy drops unsigned thinking blocks during sub-agent execution. Please retry the request."}}`,
    `event: content_block_stop\ndata: {"type":"content_block_stop","index":0}`
  );

  // Emitir message_delta e message_stop apenas se upstream não enviou
  if (!lifecycle.hasMessageDelta) {
    events.push(
      `event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"end_turn","stop_sequence":null},"usage":{"input_tokens":0,"output_tokens":0}}`
    );
  }

  if (!lifecycle.hasMessageStop) {
    events.push(`event: message_stop\ndata: {"type":"message_stop"}`);
  }

  return events.join("\n\n") + "\n\n";
}
```

---

## Arquivos a Criar/Modificar

| Ação          | Arquivo                                  | Descrição                                 |
| ------------- | ---------------------------------------- | ----------------------------------------- |
| **MODIFICAR** | `open-sse/utils/proxyFetch.js`           | Adicionar tracking de lifecycle e injeção |
| **CRIAR**     | `open-sse/utils/syntheticResponse.js`    | Builder de response sintético             |
| **CRIAR**     | `tests/unit/synthetic-response.test.mjs` | Testes unitários                          |

---

## Testes Necessários

1. Stream com content_blocks normais → nenhuma injeção (passthrough)
2. Stream com message_start mas sem content → injeta response sintético
3. Stream com message_start + message_stop mas sem content → injeta bloco sem duplicar lifecycle
4. Stream vazio (sem dados) → nenhuma injeção
5. Resposta de erro (4xx/5xx) → nenhuma injeção (não é success)
6. Verificar que response sintético é JSON válido e parseable pelo Claude Code

---

## Referência do CCS

- [tool-sanitization-proxy.ts](file:///home/diegosouzapw/dev/proxys/9router/.tmp_ccsue_analysis/src/cliproxy/tool-sanitization-proxy.ts) — método `buildSyntheticErrorResponse()` (linhas 626-658)
- Issue documentado: CCS #350 — upstream envia `message_start` sem `message_delta/message_stop`
