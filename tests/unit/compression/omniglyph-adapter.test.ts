import { test } from "node:test";
import assert from "node:assert";
import { omniglyphEngine } from "../../../open-sse/services/compression/engines/omniglyphAdapter.ts";

// Corpo Claude denso o bastante para o gate de rentabilidade do omniglyph converter.
const DENSE =
  "X".repeat(500) +
  "\n" +
  Array.from(
    { length: 400 },
    (_, i) => `const row_${i} = compute(${i * 17}, "${"v".repeat(80)}");`
  ).join("\n");
function claudeBody(): Record<string, unknown> {
  return {
    model: "claude-fable-5",
    max_tokens: 128,
    system: DENSE,
    messages: [{ role: "user", content: [{ type: "text", text: "oi" }] }],
  };
}
const OK = {
  model: "claude-fable-5",
  supportsVision: true,
  providerTransport: "direct" as const,
  imageTransportFidelity: "byte-preserving" as const,
};
const GPT_OK = {
  model: "gpt-5.6",
  supportsVision: true,
  providerTransport: "direct" as const,
  imageTransportFidelity: "byte-preserving" as const,
  sourceFormat: "openai" as const,
  targetFormat: "openai" as const,
  compressionStage: "post-translation" as const,
};

function openaiChatBody(): Record<string, unknown> {
  return {
    model: "gpt-5.6",
    messages: [
      { role: "system", content: DENSE },
      { role: "user", content: "oi" },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "inspect_repository",
          description: DENSE,
          parameters: { type: "object", properties: { path: { type: "string" } } },
        },
      },
    ],
  };
}

function openaiResponsesBody(): Record<string, unknown> {
  return {
    model: "gpt-5.6",
    instructions: DENSE,
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "oi" }] }],
    tools: [
      {
        type: "function",
        name: "inspect_repository",
        description: DENSE,
        parameters: { type: "object", properties: { path: { type: "string" } } },
      },
    ],
  };
}

test("happy path: comprime corpo claude denso em blocos de imagem", async () => {
  const r = await omniglyphEngine.applyAsync!(claudeBody(), OK);
  assert.equal(r.compressed, true);
  assert.ok(JSON.stringify(r.body).includes('"type":"image"'));
});

test("skip fail-closed: sem supportsVision / transporte agregador / undefined", async () => {
  for (const opts of [
    { ...OK, supportsVision: false },
    { ...OK, providerTransport: "aggregator" as const },
    { model: "claude-fable-5", supportsVision: true }, // transport undefined
  ]) {
    const r = await omniglyphEngine.applyAsync!(claudeBody(), opts);
    assert.equal(r.compressed, false);
    assert.ok(!JSON.stringify(r.body).includes('"type":"image"'));
  }
});

test("skip fail-closed: rota direta sem recibo de fidelidade de imagem", async () => {
  const r = await omniglyphEngine.applyAsync!(claudeBody(), {
    ...OK,
    imageTransportFidelity: "unknown",
  });
  assert.equal(r.compressed, false);
  assert.ok(r.stats?.techniquesUsed.includes("skip:transport_fidelity_unknown"));
});

test("skip: modelo fora da allowlist medida", async () => {
  const body = { ...claudeBody(), model: "gpt-5.5" };
  const r = await omniglyphEngine.applyAsync!(body, { ...OK, model: "gpt-5.5" });
  assert.equal(r.compressed, false);
});

test("skip: corpo em formato OpenAI (role system nas messages)", async () => {
  const body = {
    model: "claude-fable-5",
    messages: [
      { role: "system", content: DENSE },
      { role: "user", content: "oi" },
    ],
  };
  const r = await omniglyphEngine.applyAsync!(body, OK);
  assert.equal(r.compressed, false);
});

test("cache_control do cliente sobrevive byte a byte", async () => {
  const body = claudeBody();
  (body.messages as Array<Record<string, unknown>>).push({
    role: "user",
    content: [{ type: "text", text: "âncora", cache_control: { type: "ephemeral" } }],
  });
  const r = await omniglyphEngine.applyAsync!(body, OK);
  assert.ok(JSON.stringify(r.body).includes('"cache_control"'));
});

test("preserveSystemPrompt mantém o sistema nativo e ainda pode comprimir tool_result", async () => {
  const body = {
    ...claudeBody(),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "call_1",
            content: DENSE,
          },
        ],
      },
    ],
  };
  const r = await omniglyphEngine.applyAsync!(body, {
    ...OK,
    config: { preserveSystemPrompt: true } as never,
  });
  assert.equal(r.compressed, true);
  assert.equal((r.body as { system?: unknown }).system, DENSE);
  assert.ok(JSON.stringify(r.body).includes('"type":"image"'));
});

test("apply síncrono é pass-through seguro (engine async-only)", () => {
  const body = claudeBody();
  const r = omniglyphEngine.apply(body, OK);
  assert.equal(r.compressed, false);
  assert.deepEqual(r.body, body);
});

test("fail-open: erro no transform vira skip, nunca propaga", async () => {
  const body = claudeBody() as Record<string, unknown>;
  (body as { self?: unknown }).self = body; // referência circular → JSON.stringify lança
  const r = await omniglyphEngine.applyAsync!(body, OK);
  assert.equal(r.compressed, false);
  assert.deepEqual(r.body, body); // corpo original devolvido intacto
});

test("versão atual: transforma Chat Completions OpenAI no wire pós-tradução", async () => {
  const r = await omniglyphEngine.applyAsync!(openaiChatBody(), GPT_OK);
  assert.equal(r.compressed, true);
  assert.ok(JSON.stringify(r.body).includes('"type":"image_url"'));
});

test("versão atual: transforma OpenAI Responses preservando input[]", async () => {
  const options = { ...GPT_OK, targetFormat: "openai-responses" as const };
  const r = await omniglyphEngine.applyAsync!(openaiResponsesBody(), options);
  assert.equal(r.compressed, true);
  assert.ok(JSON.stringify(r.body).includes('"type":"input_image"'));
  assert.ok(Array.isArray((r.body as { input?: unknown }).input));
});

test("OpenAI não roda no estágio pré-tradução", async () => {
  const r = await omniglyphEngine.applyAsync!(openaiChatBody(), {
    ...GPT_OK,
    compressionStage: "pre-translation",
  });
  assert.equal(r.compressed, false);
  assert.ok(r.stats?.techniquesUsed.includes("skip:requires_post_translation"));
});

// OmniGlyph 1.4.0 introduziu escopos de segurança (`coding-safe`/`balanced`/
// `aggressive`/`passthrough`) e passou a resolvê-los, dentro de
// `isOmniGlyphSupportedModel()`, lendo `process.env.OMNIGLYPH_PROFILE`. Isso
// transforma uma variável de ambiente do HOST num gate silencioso de TODO
// request do OmniRoute: um `OMNIGLYPH_PROFILE=passthrough` exportado no shell
// do processo desligaria a engine sem que nenhuma configuração do OmniRoute
// tivesse mudado — e sem nenhum sinal na UI. A política é do OmniRoute; o
// adapter tem de passar o escopo explicitamente.
async function withEnv<T>(key: string, value: string, fn: () => Promise<T>): Promise<T> {
  const had = Object.prototype.hasOwnProperty.call(process.env, key);
  const previous = process.env[key];
  process.env[key] = value;
  try {
    return await fn();
  } finally {
    if (had) process.env[key] = previous;
    else delete process.env[key];
  }
}

test("OMNIGLYPH_PROFILE do host não decide o gate de modelo do OmniRoute", async () => {
  const r = await withEnv("OMNIGLYPH_PROFILE", "passthrough", () =>
    omniglyphEngine.applyAsync!(claudeBody(), OK)
  );
  assert.equal(
    r.compressed,
    true,
    "env do processo não pode desligar a engine: o escopo vem da config do OmniRoute"
  );
});

test("OMNIGLYPH_PROFILE do host não amplia a allowlist de modelos do OmniRoute", async () => {
  const body = { ...claudeBody(), model: "claude-sonnet-5" };
  const r = await withEnv("OMNIGLYPH_PROFILE", "aggressive", () =>
    withEnv("OMNIGLYPH_MODELS", "claude-fable-5,claude-sonnet-5", () =>
      omniglyphEngine.applyAsync!(body, { ...OK, model: "claude-sonnet-5" })
    )
  );
  assert.equal(r.compressed, false, "modelo sem recibo medido não pode entrar via env do host");
  assert.ok(r.stats?.techniquesUsed.includes("skip:model_not_approved"));
});

// ---------------------------------------------------------------------------
// Perfis semânticos (OmniGlyph 1.4.0)
//
// `transformAnthropicMessages()` resolve e mescla o perfil sozinho, mas os
// transformadores OpenAI recebem `TransformOptions` cru e NÃO conhecem
// `profile`. Sem o merge explícito do host, um perfil escolhido pelo operador
// valeria no wire Claude e seria silenciosamente ignorado no wire OpenAI.
// ---------------------------------------------------------------------------

/** Histórico longo o bastante para o colapso valer mesmo com o system nativo. */
function claudeBodyWithHistory(): Record<string, unknown> {
  const messages: Array<Record<string, unknown>> = [];
  for (let i = 0; i < 40; i++) {
    messages.push({ role: "user", content: [{ type: "text", text: `pergunta ${i}: ${DENSE}` }] });
    messages.push({
      role: "assistant",
      content: [{ type: "text", text: `resposta ${i}: ${DENSE}` }],
    });
  }
  messages.push({ role: "user", content: [{ type: "text", text: "oi" }] });
  return { model: "claude-fable-5", max_tokens: 128, system: DENSE, messages };
}

test("perfil coding-safe chega ao wire OpenAI (não só ao wrapper Anthropic)", async () => {
  const aggressive = await omniglyphEngine.applyAsync!(openaiChatBody(), {
    ...GPT_OK,
    stepConfig: { profile: "aggressive" } as never,
  });
  assert.equal(aggressive.compressed, true, "aggressive é a política medida atual");

  const codingSafe = await omniglyphEngine.applyAsync!(openaiChatBody(), {
    ...GPT_OK,
    stepConfig: { profile: "coding-safe" } as never,
  });
  assert.equal(
    codingSafe.compressed,
    false,
    "coding-safe mantém system e schemas de tools nativos no wire OpenAI"
  );
  assert.ok(
    codingSafe.stats?.techniquesUsed.some((t) => t.startsWith("skip:below_min_chars")),
    `esperado skip por minCompressChars, veio ${JSON.stringify(codingSafe.stats?.techniquesUsed)}`
  );
});

test("perfil é TETO, não piso: coding-safe mantém o system nativo mesmo sem preserveSystemPrompt", async () => {
  const body = claudeBodyWithHistory();
  const r = await omniglyphEngine.applyAsync!(body, {
    ...OK,
    stepConfig: { profile: "coding-safe", preserveSystemPrompt: false } as never,
  });
  assert.equal(r.compressed, true, "o histórico antigo ainda colapsa");
  assert.equal(
    (r.body as { system?: unknown }).system,
    DENSE,
    "coding-safe não deixa um override do chamador reabrir a compressão do system"
  );
});

test("perfil passthrough desliga a engine sem tocar no corpo", async () => {
  const body = claudeBodyWithHistory();
  const r = await omniglyphEngine.applyAsync!(body, {
    ...OK,
    stepConfig: { profile: "passthrough" } as never,
  });
  assert.equal(r.compressed, false);
  assert.ok(r.stats?.techniquesUsed.includes("skip:profile_passthrough"));
  assert.deepEqual(r.body, body);
});

test("perfil inválido falha fechado, não propaga exceção", async () => {
  const r = await omniglyphEngine.applyAsync!(claudeBody(), {
    ...OK,
    stepConfig: { profile: "turbo-max" } as never,
  });
  assert.equal(r.compressed, false);
  assert.ok(r.stats?.techniquesUsed.includes("skip:invalid_profile"));
});

test("preserveSystemPrompt: wire OpenAI pula, porque o pacote não sabe preservar system lá", async () => {
  // O transform OpenAI do OmniGlyph 1.4.0 honra apenas compressTools, gptHistory,
  // minCompressChars e reflow — não existe compressSystem nesse wire, e a
  // instrução vira sempre um ponteiro para a imagem. Imagear assim queimaria o
  // prefixo quente que a decisão cache-aware do OmniRoute mandou preservar, e o
  // OmniRoute não teria como saber. Sem opção de honrar a política, pula.
  const r = await omniglyphEngine.applyAsync!(openaiChatBody(), {
    ...GPT_OK,
    config: { preserveSystemPrompt: true } as never,
  });
  assert.equal(r.compressed, false);
  assert.ok(r.stats?.techniquesUsed.includes("skip:system_preservation_unsupported_on_wire"));
  assert.deepEqual(r.body, openaiChatBody());
});
