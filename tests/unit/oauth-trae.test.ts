import test from "node:test";
import assert from "node:assert/strict";

const providersModule = await import("../../src/lib/oauth/providers/index.ts");
const oauthModule = await import("../../src/lib/oauth/constants/oauth.ts");
const oauthHandlers = await import("../../src/lib/oauth/providers.ts");

const PROVIDERS = providersModule.default;
const { TRAE_CONFIG, PROVIDERS: OAUTH_PROVIDER_IDS } = oauthModule;
const { getProvider } = oauthHandlers;

// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------

test("PROVIDERS map includes a 'trae' entry", () => {
  assert.ok("trae" in PROVIDERS, "PROVIDERS must contain trae");
});

test("getProvider('trae') does not throw", () => {
  assert.doesNotThrow(() => getProvider("trae"));
});

test("trae provider has the correct id via getProvider", () => {
  // trae provider has no .config.id — confirm via OAUTH_PROVIDER_IDS constant
  const traeKey = OAUTH_PROVIDER_IDS.TRAE;
  assert.equal(traeKey, "trae");
});

// ---------------------------------------------------------------------------
// Shape
// ---------------------------------------------------------------------------

test("trae provider exposes the expected shape", () => {
  const provider = PROVIDERS.trae;

  assert.ok(provider, "trae provider must exist");
  assert.equal(
    provider.flowType,
    "import_token",
    "Trae uses import_token until ByteDance publishes a public OAuth client"
  );
  assert.ok(provider.config, "trae provider must have a config object");
  assert.equal(typeof provider.mapTokens, "function", "trae provider must expose mapTokens");
});

test("TRAE_CONFIG has required API endpoint fields", () => {
  assert.ok(typeof TRAE_CONFIG.apiEndpoint === "string" && TRAE_CONFIG.apiEndpoint.length > 0);
  assert.ok(typeof TRAE_CONFIG.chatEndpoint === "string" && TRAE_CONFIG.chatEndpoint.length > 0);
  assert.ok(typeof TRAE_CONFIG.webUrl === "string" && TRAE_CONFIG.webUrl.length > 0);
  assert.ok(TRAE_CONFIG.apiEndpoint.startsWith("https://"), "apiEndpoint must use HTTPS");
  assert.ok(TRAE_CONFIG.webUrl.startsWith("https://"), "webUrl must use HTTPS");
});

test("TRAE_CONFIG exposes token storage paths for all platforms (#2658)", () => {
  assert.ok(TRAE_CONFIG.tokenStoragePaths.linux);
  assert.ok(TRAE_CONFIG.tokenStoragePaths.macos);
  assert.ok(TRAE_CONFIG.tokenStoragePaths.windows);
});

// ---------------------------------------------------------------------------
// mapTokens
// ---------------------------------------------------------------------------

test("trae mapTokens returns expected structure with valid input", () => {
  const provider = PROVIDERS.trae;

  const mapped = provider.mapTokens({
    accessToken: "trae-test-token",
    expiresIn: 7200,
  });

  assert.equal(mapped.accessToken, "trae-test-token");
  assert.equal(mapped.refreshToken, null, "Trae import_token has no refresh token");
  assert.equal(mapped.expiresIn, 7200);
  assert.equal(mapped.providerSpecificData.authMethod, "imported");
});

test("trae mapTokens preserves machineId in providerSpecificData (#2658)", () => {
  const provider = PROVIDERS.trae;
  const mapped = provider.mapTokens({
    accessToken: "tk_test",
    expiresIn: 3600,
    machineId: "machine-xyz",
  });
  assert.equal(mapped.providerSpecificData.machineId, "machine-xyz");
  assert.equal(mapped.providerSpecificData.authMethod, "imported");
});

test("trae mapTokens defaults expiresIn to the ~14-day Cloud-IDE-JWT lifetime when not provided", () => {
  const provider = PROVIDERS.trae;

  const mapped = provider.mapTokens({ accessToken: "trae-token-2" });

  // SOLO Cloud-IDE-JWTs live ~14 days (TRAE_CONFIG.tokenLifetimeDays).
  assert.equal(mapped.expiresIn, TRAE_CONFIG.tokenLifetimeDays * 24 * 60 * 60);
});

test("trae mapTokens enriches providerSpecificData with SOLO identity defaults", () => {
  const provider = PROVIDERS.trae;
  const mapped = provider.mapTokens({
    accessToken: "tk",
    webId: "WID",
    bizUserId: "BUID",
  });
  assert.equal(mapped.providerSpecificData.webId, "WID");
  assert.equal(mapped.providerSpecificData.bizUserId, "BUID");
  // Identity defaults required by the SOLO common_params payload.
  assert.equal(mapped.providerSpecificData.scope, "marscode-us");
  assert.equal(mapped.providerSpecificData.tenant, "marscode");
  assert.equal(mapped.providerSpecificData.region, "US-East");
});

test("trae mapTokens returns an object even when called with empty tokens", () => {
  const provider = PROVIDERS.trae;
  const mapped = provider.mapTokens({});

  assert.ok(mapped && typeof mapped === "object");
  assert.equal(mapped.refreshToken, null);
  assert.equal(mapped.expiresIn, TRAE_CONFIG.tokenLifetimeDays * 24 * 60 * 60);
});

// ---------------------------------------------------------------------------
// OAuth provider ID constant alignment
// ---------------------------------------------------------------------------

test("OAUTH_PROVIDER_IDS.TRAE matches the PROVIDERS key", () => {
  const traeId = OAUTH_PROVIDER_IDS.TRAE;
  assert.equal(traeId, "trae");
  assert.ok(traeId in PROVIDERS, "PROVIDERS must include the key from OAUTH_PROVIDER_IDS.TRAE");
});
