import fs from "node:fs";
import path from "node:path";
import { pickSmokeModels } from "./lib/providerTiers.mjs";

const baseUrl = process.env.HOMOLOG_BASE_URL;
const critical = (process.env.HOMOLOG_CRITICAL_PROVIDERS || "").split(",").filter(Boolean);

const res = await fetch(`${baseUrl}/v1/models`, {
  headers: { Authorization: `Bearer ${process.env.HOMOLOG_API_KEY}` },
});
if (!res.ok) throw new Error(`/v1/models HTTP ${res.status}`);
const catalog = (await res.json()).data;

const picks = pickSmokeModels(catalog, critical);
const missing = picks.filter((p) => !p.model);
const providers = picks
  .filter((p) => p.model)
  .map((p) => ({
    id: `openai:chat:${p.model}`,
    label: p.provider,
    config: {
      apiBaseUrl: `${baseUrl}/v1`,
      apiKeyEnvar: "HOMOLOG_API_KEY",
      max_tokens: 5,
      temperature: 0,
      // OmniRoute streama por default quando "stream" é omitido (streamDefaultMode
      // legacy) — o parser JSON do promptfoo precisa da resposta non-stream.
      passthrough: { stream: false, max_tokens: 5 },
    },
  }));

const config = {
  description: "OmniRoute homolog — smoke real 1 request/provider crítico",
  prompts: ["Reply with exactly: OK"],
  providers,
  // O smoke valida o WIRING do provider (respondeu sem erro), não o comportamento
  // do modelo: com max_tokens=5, modelos de reasoning podem gastar o budget antes
  // de emitir o "OK" literal — icontains seria falso-positivo de quebra.
  tests: [{ assert: [{ type: "javascript", value: "typeof output === 'string'" }] }],
};
fs.mkdirSync("homolog-report/raw", { recursive: true });
fs.writeFileSync(
  path.join("homolog-report", "promptfooconfig.yaml"),
  JSON.stringify(config, null, 2) // promptfoo aceita JSON como config YAML-compatível
);
fs.writeFileSync(
  path.join("homolog-report", "raw", "provider-misses.json"),
  JSON.stringify(missing, null, 2)
);
console.log(
  `[gen-promptfoo] ${providers.length} providers no smoke, ${missing.length} misses de catálogo`
);
