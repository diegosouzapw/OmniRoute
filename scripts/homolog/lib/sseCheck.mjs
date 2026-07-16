export function parseSseChunk(text) {
  // Itera LINHAS dentro de cada bloco: a VPS emite comment-lines SSE
  // (": x-omniroute-*") no mesmo bloco do "data: [DONE]", então olhar só o
  // início do bloco perde o terminador.
  const events = [];
  for (const block of text.split(/\n\n/)) {
    for (const line of block.split("\n")) {
      const t = line.trim();
      if (t.startsWith("data:")) events.push(t.slice(5).trim());
    }
  }
  return events;
}

export function summarizeStream(events) {
  let contentDeltas = 0;
  let done = false;
  for (const e of events) {
    if (e === "[DONE]") {
      done = true;
      continue;
    }
    try {
      const j = JSON.parse(e);
      if (j.choices?.[0]?.delta?.content) contentDeltas++;
    } catch {
      /* fragmento parcial — ignorado; o caller acumula buffer */
    }
  }
  const ok = contentDeltas >= 1 && done;
  return { ok, contentDeltas, done };
}

/** Faz 1 chat streaming real e valida o protocolo SSE ponta-a-ponta. */
export async function checkSse(baseUrl, apiKey, model, { retries = 1 } = {}) {
  try {
    const res = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: "Reply with exactly: OK" }],
        max_tokens: 5,
        stream: true,
      }),
    });
    if (res.status !== 200) return { ok: false, failures: [`HTTP ${res.status}`] };
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("text/event-stream")) return { ok: false, failures: [`content-type "${ct}"`] };

    const events = [];
    let buffer = "";
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    const deadline = Date.now() + 60_000;
    while (Date.now() < deadline) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lastSep = buffer.lastIndexOf("\n\n");
      if (lastSep >= 0) {
        events.push(...parseSseChunk(buffer.slice(0, lastSep + 2)));
        buffer = buffer.slice(lastSep + 2);
      }
    }
    // flush do resto do buffer (último bloco pode chegar sem "\n\n" no read final)
    if (buffer.trim()) events.push(...parseSseChunk(buffer));
    const s = summarizeStream(events);
    return { ok: s.ok, failures: s.ok ? [] : [`contentDeltas=${s.contentDeltas} done=${s.done}`] };
  } catch (err) {
    // Socket keep-alive reciclado pelo servidor entre requests é transitório —
    // 1 retry antes de reportar falha. Erro persistente é FALHA da camada,
    // nunca crash do orquestrador.
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, 1_000));
      return checkSse(baseUrl, apiKey, model, { retries: retries - 1 });
    }
    return { ok: false, failures: [`fetch/stream error: ${err?.cause?.message || err.message}`] };
  }
}
