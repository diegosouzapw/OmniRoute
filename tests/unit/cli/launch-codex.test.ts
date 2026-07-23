import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildCodexEnv,
  buildCodexProviderArgs,
  resolveCodexTarget,
} from "../../../bin/cli/commands/launch-codex.mjs";

test("buildCodexEnv strips stale OpenAI/Codex creds from the child env (defense-in-depth)", () => {
  const env = buildCodexEnv(
    {
      OPENAI_API_KEY: "leak",
      OPENAI_BASE_URL: "https://api.openai.com/v1",
      OPENAI_ORG_ID: "org",
      CODEX_API_KEY: "leak2",
      PATH: "/bin",
    },
    "oma_live_x"
  );
  assert.equal(env.OPENAI_API_KEY, undefined);
  assert.equal(env.OPENAI_BASE_URL, undefined);
  assert.equal(env.OPENAI_ORG_ID, undefined);
  assert.equal(env.CODEX_API_KEY, undefined);
  assert.equal(env.OMNIROUTE_API_KEY, "oma_live_x");
  assert.equal(env.PATH, "/bin", "unrelated vars preserved");
});

test("buildCodexEnv uses a no-auth sentinel when no token is given", () => {
  const env = buildCodexEnv({ PATH: "/bin" }, undefined);
  assert.equal(env.OMNIROUTE_API_KEY, "omniroute-no-auth");
});

test("buildCodexEnv does not mutate the input env", () => {
  const input = { OPENAI_API_KEY: "leak", PATH: "/bin" };
  buildCodexEnv(input, "x");
  assert.equal(input.OPENAI_API_KEY, "leak");
});

test("buildCodexProviderArgs defines the omniroute provider inline (works without config.toml)", () => {
  const args = buildCodexProviderArgs("http://vps:20128");
  const joined = args.join(" ");
  assert.ok(joined.includes('model_provider="omniroute"'));
  assert.ok(joined.includes('model_providers.omniroute.base_url="http://vps:20128/v1"'));
  assert.ok(joined.includes('model_providers.omniroute.env_key="OMNIROUTE_API_KEY"'));
  assert.ok(joined.includes('model_providers.omniroute.wire_api="responses"'));
  assert.ok(joined.includes("model_providers.omniroute.requires_openai_auth=false"));
  // each assignment is preceded by a -c flag
  assert.equal(args.filter((a) => a === "-c").length, 6);
});

test("resolveCodexTarget: --remote wins and /v1 is stripped from the root", () => {
  const { baseUrl } = resolveCodexTarget({ remote: "http://vps:20128/v1" });
  assert.equal(baseUrl, "http://vps:20128");
});

test("resolveCodexTarget: explicit --api-key wins", () => {
  const { authToken } = resolveCodexTarget({ remote: "http://x:20128", apiKey: "tok-explicit" });
  assert.equal(authToken, "tok-explicit");
});
