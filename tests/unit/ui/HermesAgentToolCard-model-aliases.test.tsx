import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Regression probe for issue #7151: OpenRouter (and every other
// `passthroughModels` provider — requesty, dgrid, agentrouter, charm-hyper,
// etc.) never appears in the Hermes Agent role model picker.
//
// Root cause: <ModelSelectModal> derives a passthrough provider's model list
// from the `modelAliases` prop (ModelSelectModal.tsx groupedModels →
// buildPassthroughAliasModels(modelAliases, providerId)). When `modelAliases`
// is `{}` (the component default), that helper returns `[]` and the provider
// group is skipped entirely — see modelSelectModalHelpers.ts. Every sibling
// CLI tool card (Codex, Claude, Cline, Kilo, Droid, OpenClaw, Antigravity)
// fetches `/api/models/alias` and passes the result through, but
// HermesAgentToolCard never does, so OpenRouter's managed-available-model
// aliases (synced automatically after the connection is tested — see
// syncManagedAvailableModelAliases in src/lib/providerModels/managedAvailableModels.ts)
// are invisible to it.

const __dirname = dirname(fileURLToPath(import.meta.url));
const CARD_PATH = resolve(
  __dirname,
  "../../../src/app/(dashboard)/dashboard/cli-code/components/HermesAgentToolCard.tsx"
);

describe("HermesAgentToolCard model alias wiring (#7151)", () => {
  const source = readFileSync(CARD_PATH, "utf8");

  it("declares modelAliases state", () => {
    expect(source).toMatch(/const \[modelAliases, setModelAliases\] = useState\(\{\}\)/);
  });

  it("fetches /api/models/alias when expanded", () => {
    expect(source).toContain('fetch("/api/models/alias")');
  });

  it("passes modelAliases prop to ModelSelectModal", () => {
    // Regression guard: this prop is what unlocks passthrough provider groups
    // (OpenRouter, Requesty, DGrid, AgentRouter, Charm Hyper, ...) in the
    // Hermes Agent role picker. Without it, OpenRouter is silently absent
    // from the "Select" modal for every role (Default, Delegation, ...).
    expect(source).toMatch(/modelAliases=\{modelAliases\}/);
  });
});
