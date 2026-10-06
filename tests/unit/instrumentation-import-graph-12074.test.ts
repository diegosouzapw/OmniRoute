import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const instrumentationPath = path.join(process.cwd(), "src/instrumentation-node.ts");
const quotaAutoPingPath = path.join(process.cwd(), "src/lib/services/quotaAutoPing.ts");
const credentialRefreshPath = path.join(
  process.cwd(),
  "src/lib/usage/providerLimits/credentialRefresh.ts"
);
const providerLimitsPath = path.join(process.cwd(), "src/lib/usage/providerLimits.ts");
const credentialExecutorPath = path.join(process.cwd(), "open-sse/executors/credential.ts");
const executorDirectory = path.join(process.cwd(), "open-sse/executors");
const anthropicValidationPath = path.join(
  process.cwd(),
  "src/lib/providers/validation/anthropicFormat.ts"
);
const defaultExecutorResolverPath = path.join(
  process.cwd(),
  "open-sse/executors/defaultResolver.ts"
);

test("node instrumentation loads the proxy patch leaf before quota registration", () => {
  const source = fs.readFileSync(instrumentationPath, "utf8");
  const proxyPatchImport = 'await import("@omniroute/open-sse/utils/proxyFetch.ts")';
  const proxyPatchIndex = source.indexOf(proxyPatchImport);
  const quotaRegistrationIndex = source.indexOf("await registerQuotaFetchers()");

  assert.ok(proxyPatchIndex >= 0, "startup must load the proxyFetch side-effect leaf");
  assert.ok(quotaRegistrationIndex > proxyPatchIndex, "proxy patch must run before quota setup");
  assert.doesNotMatch(source, /import\("@omniroute\/open-sse\/index\.ts"\)/);
});

test("quota auto-ping lazily loads only the Codex executor", () => {
  const source = fs.readFileSync(quotaAutoPingPath, "utf8");
  const credentialRefreshSource = fs.readFileSync(credentialRefreshPath, "utf8");

  assert.doesNotMatch(source, /open-sse\/executors\/index(?:\.ts)?/);
  assert.doesNotMatch(source, /@\/lib\/usage\/providerLimits["']/);
  assert.match(source, /import\("@omniroute\/open-sse\/executors\/codex\.ts"\)/);
  assert.match(source, /@\/lib\/usage\/providerLimits\/credentialRefresh/);
  assert.match(source, /getExecutor: loadQuotaAutoPingExecutor/);
  assert.doesNotMatch(credentialRefreshSource, /open-sse\/executors\/index(?:\.ts)?/);
});

test("startup still registers bespoke, batch, and generic quota fetchers", async () => {
  const [{ registerQuotaFetchers }, { getQuotaFetcher }] = await Promise.all([
    import("../../src/instrumentation-node.ts"),
    import("../../open-sse/services/quotaPreflight.ts"),
  ]);

  await registerQuotaFetchers();

  for (const provider of [
    "agentrouter",
    "codex",
    "bailian-coding-plan",
    "qwen-cloud-token-plan",
    "crof",
    "deepseek",
    "openrouter",
    "opencode-go",
    "grok-web",
    "antigravity",
  ]) {
    assert.equal(typeof getQuotaFetcher(provider), "function", `${provider} quota fetcher missing`);
  }
});

test("provider-limit startup uses the refresh-only executor resolver", () => {
  const providerLimitsSource = fs.readFileSync(providerLimitsPath, "utf8");
  const credentialExecutorSource = fs.readFileSync(credentialExecutorPath, "utf8");

  assert.doesNotMatch(providerLimitsSource, /open-sse\/executors\/index(?:\.ts)?/);
  assert.match(providerLimitsSource, /open-sse\/executors\/credential\.ts/);
  assert.doesNotMatch(credentialExecutorSource, /\.\/index(?:\.ts)?/);
  assert.match(credentialExecutorSource, /export async function getCredentialRefreshExecutor/);
});

test("credential resolver covers every executor with custom refresh behavior", () => {
  const credentialExecutorSource = fs.readFileSync(credentialExecutorPath, "utf8");
  const refreshOverrideFiles = fs
    .readdirSync(executorDirectory)
    .filter((file) => file.endsWith(".ts") && !["base.ts", "default.ts"].includes(file))
    .filter((file) => {
      const source = fs.readFileSync(path.join(executorDirectory, file), "utf8");
      return /^\s*(?:async\s+)?(?:needsRefresh|refreshCredentials)\s*\(/m.test(source);
    });

  for (const file of refreshOverrideFiles) {
    assert.ok(
      credentialExecutorSource.includes(`import("./${file}")`),
      `${file} must be registered in the refresh-only resolver`
    );
  }
});

test("Claude OAuth validation resolves the default executor without the chat registry", () => {
  const validationSource = fs.readFileSync(anthropicValidationPath, "utf8");
  const resolverSource = fs.readFileSync(defaultExecutorResolverPath, "utf8");

  assert.doesNotMatch(validationSource, /open-sse\/executors\/index(?:\.ts)?/);
  assert.match(validationSource, /open-sse\/executors\/defaultResolver\.ts/);
  assert.doesNotMatch(resolverSource, /\.\/index(?:\.ts)?/);
  assert.match(resolverSource, /export function getDefaultExecutor/);
});
