/**
 * Diagnóstico NVIDIA NIM — `s.startsWith is not a function` (issue #2463 / report 3.8.5+)
 *
 * Como rodar (a chave NUNCA é commitada — vem por env):
 *   NVIDIA_API_KEY="nvapi-..." node --import tsx/esm scripts/ad-hoc/nvidia-startswith-diag.ts
 *
 * Opcional — apontar para outra base/model:
 *   NVIDIA_BASE_URL="https://integrate.api.nvidia.com/v1/chat/completions"
 *   NVIDIA_MODEL="openai/gpt-oss-120b"
 *
 * O que ele faz:
 *   Parte A — Validação real via validateProviderApiKey() (caminho do botão "testar conexão").
 *   Parte B — Sanidade do upstream: POST direto na NVIDIA (isola a chave/model do nosso pipeline).
 *   Parte C — Probes de type-crash SEM chave: alimenta model malformado em resolveModelAlias +
 *             replica o strip de prefixo de chatCore.ts:3316 e parseModel(), capturando o stack
 *             NÃO-minificado (rodamos contra a fonte TS) para cravar a linha exata do startsWith.
 *
 * Parte C não precisa de chave — prova quais linhas são vulneráveis hoje.
 */

const KEY = process.env.NVIDIA_API_KEY ?? "";
const BASE_URL = process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1/chat/completions";
const MODEL = process.env.NVIDIA_MODEL || "openai/gpt-oss-120b";

const line = (s = "") => console.log(s);
const hr = () => line("─".repeat(72));

function show(label: string, value: unknown) {
  line(`  ${label}: ${typeof value === "string" ? value : JSON.stringify(value)}`);
}

// ──────────────────────────────────────────────────────────────────────────
// Parte A — validateProviderApiKey (caminho de validação/teste de conexão)
// ──────────────────────────────────────────────────────────────────────────
async function partA() {
  hr();
  line("PARTE A — validateProviderApiKey({ provider: 'nvidia' })");
  hr();
  if (!KEY) {
    line("  ⏭  pulada — defina NVIDIA_API_KEY para rodar.");
    return;
  }
  try {
    const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
    const providerSpecificData = { baseUrl: BASE_URL };
    const result = await validateProviderApiKey({
      provider: "nvidia",
      apiKey: KEY,
      providerSpecificData,
    });
    line("  ✅ validateProviderApiKey retornou (sem crash):");
    show("resultado", result);
    if (typeof (result as any)?.error === "string" && (result as any).error.includes("startsWith")) {
      line("  ⚠️  A mensagem de erro contém 'startsWith' → crash CAPTURADO dentro do try/catch da validação.");
    }
  } catch (err: any) {
    line("  ❌ validateProviderApiKey LANÇOU (crash não tratado):");
    line(`     ${err?.message}`);
    line(err?.stack ?? String(err));
  }
}

// ──────────────────────────────────────────────────────────────────────────
// Parte B — sanidade do upstream NVIDIA (isola chave/model do nosso pipeline)
// ──────────────────────────────────────────────────────────────────────────
async function partB() {
  hr();
  line("PARTE B — POST direto no upstream NVIDIA (sanidade da chave/model)");
  hr();
  if (!KEY) {
    line("  ⏭  pulada — defina NVIDIA_API_KEY para rodar.");
    return;
  }
  const url = BASE_URL.endsWith("/chat/completions") ? BASE_URL : `${BASE_URL}/chat/completions`;
  show("url", url);
  show("model", MODEL);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${KEY}` },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: "ping" }],
        max_tokens: 1,
      }),
    });
    const text = await res.text();
    show("status", res.status);
    line(`  body (256): ${text.slice(0, 256)}`);
    if (res.ok) line("  ✅ upstream OK — chave e model válidos.");
    else if (res.status === 401 || res.status === 403) line("  ❌ chave inválida (401/403).");
    else line("  ⚠️  não-OK não-auth — chave provavelmente válida, ver corpo.");
  } catch (err: any) {
    line(`  ❌ fetch falhou: ${err?.message}`);
  }
}

// ──────────────────────────────────────────────────────────────────────────
// Parte C — probes de type-crash (sem chave) — crava a linha do startsWith
// ──────────────────────────────────────────────────────────────────────────
async function partC() {
  hr();
  line("PARTE C — probes de type-crash (resolveModelAlias + strip chatCore:3316 + parseModel)");
  hr();

  const { resolveModelAlias } = await import("../../open-sse/services/modelDeprecation.ts");
  const { parseModel } = await import("../../open-sse/services/model.ts");

  // Replica EXATA do trecho de chatCore.ts:3315-3320 (feature #1261), sem guard.
  function stripPrefixLikeChatCore(effectiveModel: any, provider: string, alias?: string) {
    let finalModelToUpstream = effectiveModel;
    if (finalModelToUpstream.startsWith(`${provider}/`)) {
      finalModelToUpstream = finalModelToUpstream.slice(provider.length + 1);
    } else if (alias && finalModelToUpstream.startsWith(`${alias}/`)) {
      finalModelToUpstream = finalModelToUpstream.slice(alias.length + 1);
    }
    return finalModelToUpstream;
  }

  const inputs: Array<{ label: string; model: any }> = [
    { label: "string normal (multi-barra NVIDIA)", model: "nvidia/openai/gpt-oss-120b" },
    { label: "objeto {} (UI bug / providerSpecificData mal salvo)", model: {} },
    { label: "objeto {id: '...'}", model: { id: "openai/gpt-oss-120b" } },
    { label: "number", model: 123 },
    { label: "array", model: ["openai/gpt-oss-120b"] },
    { label: "null", model: null },
    { label: "undefined", model: undefined },
  ];

  for (const { label, model } of inputs) {
    line("");
    line(`  ▶ input: ${label}  (typeof=${typeof model})`);

    // 1) resolveModelAlias — deixa não-string passar? (if (!modelId) return modelId)
    let effective: any;
    try {
      effective = resolveModelAlias(model as any);
      line(`     resolveModelAlias → ${typeof effective} ${JSON.stringify(effective)}`);
    } catch (err: any) {
      line(`     resolveModelAlias THROW: ${err?.message}`);
      effective = model;
    }

    // 2) strip de prefixo (chatCore:3316) — captura o stack EXATO
    try {
      const out = stripPrefixLikeChatCore(effective, "nvidia", "nvidia");
      line(`     chatCore strip → ${JSON.stringify(out)}  ✅ sem crash`);
    } catch (err: any) {
      line(`     ❌ chatCore:3316 strip THROW: ${err?.message}`);
      const at = (err?.stack ?? "").split("\n").find((l: string) => l.includes(".ts"));
      if (at) line(`        ${at.trim()}`);
    }

    // 3) parseModel (model.ts:315) — captura o stack EXATO
    try {
      const parsed = parseModel(model as any);
      line(`     parseModel → ${JSON.stringify(parsed)}  ✅ sem crash`);
    } catch (err: any) {
      line(`     ❌ model.ts parseModel THROW: ${err?.message}`);
      const at = (err?.stack ?? "").split("\n").find((l: string) => l.includes("model.ts"));
      if (at) line(`        ${at.trim()}`);
    }
  }
}

async function main() {
  line("");
  line("NVIDIA NIM — diagnóstico `startsWith is not a function`");
  show("NVIDIA_API_KEY presente", KEY ? `sim (${KEY.slice(0, 6)}…)` : "não");
  show("BASE_URL", BASE_URL);
  show("MODEL", MODEL);
  line("");
  await partA();
  await partB();
  await partC();
  hr();
  line("FIM.");
}

main().catch((e) => {
  console.error("erro fatal no diagnóstico:", e);
  process.exit(1);
});
