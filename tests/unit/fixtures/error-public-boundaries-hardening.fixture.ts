import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-public-errors-"));
const TEST_DATA_DIR = path.join(TEST_ROOT, "data");
const TEST_PLUGINS_DIR = path.join(TEST_ROOT, "plugins");
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_PLUGINS_DIR = process.env.OMNIROUTE_PLUGINS_DIR;
const REPO_ROOT = fileURLToPath(new URL("../../..", import.meta.url));

fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
fs.mkdirSync(TEST_PLUGINS_DIR, { recursive: true });
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_PLUGINS_DIR = TEST_PLUGINS_DIR;

const core = await import("../../../src/lib/db/core.ts");
const {
  buildErrorBody,
  buildModelCooldownBody,
  createErrorResult,
  parseUpstreamError,
  projectPublicErrorIdentifier,
  providerCircuitOpenResponse,
  sanitizeErrorMessage,
  sanitizeUpstreamDetails,
  unavailableResponse,
} = await import("../../../open-sse/utils/error.ts");
const { buildPassthroughErrorResponse, shouldPassthroughUpstreamError } =
  await import("../../../open-sse/utils/upstreamErrorPassthrough.ts");

test.after(() => {
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_PLUGINS_DIR === undefined) delete process.env.OMNIROUTE_PLUGINS_DIR;
  else process.env.OMNIROUTE_PLUGINS_DIR = ORIGINAL_PLUGINS_DIR;
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("sanitizeErrorMessage removes non-source paths, credentials, and serialized stacks", () => {
  const raw = String.raw`Provider failed at /srv/private/provider-key.json access_token=provider-secret\n    at validate (C:\Users\admin\private\validator.ts:42:7)`;
  const safe = sanitizeErrorMessage(raw);

  assert.match(safe, /Provider failed/i);
  assert.doesNotMatch(safe, /srv\/private|provider-secret|C:\\Users|validator\.ts/i);
  assert.doesNotMatch(safe, /\\n\s*at validate/i);
});

test("sanitizeErrorMessage redacts Windows drive-root-relative filesystem paths", () => {
  const plain = sanitizeErrorMessage(
    String.raw`Provider failed at \Users\admin\private\secret.txt`
  );
  const quoted = sanitizeErrorMessage(
    String.raw`Provider failed opening "\Windows\Temp\native.dll"`
  );
  const singleSegment = sanitizeErrorMessage(String.raw`Provider failed opening \private.db`);
  const prose = sanitizeErrorMessage(String.raw`Provider reported \offline without a path`);
  const escapedInitialPaths = [
    String.raw`Provider failed at \bin\private.db`,
    String.raw`Provider failed at \folder\private.db`,
    String.raw`Provider failed at \new\private.db`,
    String.raw`Provider failed at \root\private.db`,
    String.raw`Provider failed at \temp\private.db`,
    String.raw`Provider failed at C:\temp\private.db`,
  ].map((message) => sanitizeErrorMessage(message));

  assert.equal(plain, "Provider failed at <path>");
  assert.equal(quoted, 'Provider failed opening "<path>"');
  assert.equal(singleSegment, "Provider failed opening <path>");
  assert.equal(prose, String.raw`Provider reported \offline without a path`);
  for (const projected of escapedInitialPaths) {
    assert.equal(projected, "Provider failed at <path>");
  }
});

test("sanitizeErrorMessage redacts extensionless POSIX paths without hiding explicit routes", () => {
  const compact = sanitizeErrorMessage("Provider failed at /custom/internal/secret");
  const spaced = sanitizeErrorMessage("Provider failed at /custom/internal secret directory");
  const route = sanitizeErrorMessage("Route /dashboard/providers is unavailable");
  const singleSegment = sanitizeErrorMessage("Provider failed opening /vault");
  const singleSegmentRoute = sanitizeErrorMessage("Route /vault is unavailable");
  const compoundPathAndRoute = sanitizeErrorMessage(
    "Failed /vault then GET /home/profile returned 404"
  );
  const knownRootRoutes = [
    sanitizeErrorMessage("GET /home returned 404"),
    sanitizeErrorMessage("Route /run is unavailable"),
    sanitizeErrorMessage("POST /data returned 409"),
    sanitizeErrorMessage("Route /var is unavailable"),
  ];
  const body = buildErrorBody(500, "Provider failed at /custom/internal/secret");

  assert.doesNotMatch(compact, /custom\/internal\/secret/);
  assert.doesNotMatch(spaced, /custom\/internal|secret directory/);
  assert.doesNotMatch(body.error.message, /custom\/internal\/secret/);
  assert.match(compact, /<path>/);
  assert.equal(route, "Route /dashboard/providers is unavailable");
  assert.equal(singleSegment, "Provider failed opening <path>");
  assert.equal(singleSegmentRoute, "Route /vault is unavailable");
  assert.equal(compoundPathAndRoute, "Failed <path> then GET /home/profile returned 404");
  assert.deepEqual(knownRootRoutes, [
    "GET /home returned 404",
    "Route /run is unavailable",
    "POST /data returned 409",
    "Route /var is unavailable",
  ]);
});

test("sanitizeErrorMessage fails closed when string coercion is hostile", () => {
  const hostile = {
    toString(): never {
      throw new Error("access_token=hostile-secret at /srv/private/hostile.ts:1:2");
    },
  };

  assert.equal(sanitizeErrorMessage(hostile), "");
});

test("buildErrorBody projects untrusted error classifications onto safe identifiers", () => {
  const body = buildErrorBody(502, "upstream failed", undefined, {
    type: "server_error\nX-Leak: yes",
    code: "sk-live-secret-value",
    reason: "access_token=reason-secret",
  });

  assert.equal(body.error.type, "server_error");
  assert.equal(body.error.code, "bad_gateway");
  assert.equal(body.error.reason, undefined);
});

test("createErrorResult rejects opaque upstream identifiers that could be echoed credentials", async () => {
  const opaqueCredential = "AbC9xY7pQ2mN8vR4kL6z";
  const result = createErrorResult(
    502,
    "upstream failed",
    null,
    opaqueCredential,
    opaqueCredential
  );
  const body = (await result.response.json()) as {
    error: { code: string; type: string };
  };

  assert.equal(body.error.code, "bad_gateway");
  assert.equal(body.error.type, "server_error");
  assert.doesNotMatch(JSON.stringify(body), new RegExp(opaqueCredential));
});

test("parseUpstreamError never stringifies an untrusted error object into the public message", async () => {
  const opaqueIdentifier = "AbC9xY7pQ2mN8vR4kL6z";
  const parsed = await parseUpstreamError(
    Response.json(
      {
        error: {
          code: opaqueIdentifier,
          type: opaqueIdentifier,
          reason: opaqueIdentifier,
        },
      },
      { status: 502 }
    ),
    "openai"
  );
  const result = createErrorResult(
    parsed.statusCode,
    parsed.message,
    parsed.retryAfterMs,
    parsed.errorCode as string,
    parsed.errorType as string,
    parsed.responseBody
  );
  const bodyText = await result.response.text();

  assert.equal(parsed.message, "Upstream error: 502");
  assert.doesNotMatch(bodyText, new RegExp(opaqueIdentifier));
});

test("buildErrorBody preserves the configured empty code for unmapped client statuses", () => {
  const body = buildErrorBody(424, "Dependency failed");

  assert.equal(body.error.type, "invalid_request_error");
  assert.equal(body.error.code, "");
});

test("public identifier vocabulary preserves current internal machine-readable contracts", () => {
  const identifiers = [
    "context_length_exceeded",
    "tool_calling_not_supported",
    "vision",
    "tools",
    "structured_output",
    "context_window",
    "unsupported_endpoint",
    "unverified_codex_client",
    "invalid_previous_response_binding",
    "incompatible_reasoning_effort",
    "STREAM_READINESS_TIMEOUT",
    "stream_timeout",
    "STREAM_EARLY_EOF",
    "stream_early_eof",
    "LEASE_NO_ELIGIBLE_CONNECTION",
    "LEASE_ELIGIBILITY_UNAVAILABLE",
    "LEASE_UNSUPPORTED_ROUTE",
    "LEASE_UNSUPPORTED_TRANSPORT",
    "DIRECT_RESPONSE_START_TIMEOUT",
    "PROXY_FAMILY_UNAVAILABLE",
    "RELAY_TIMEOUT",
    "TLS_FINGERPRINT_FAILED",
    "PROXY_REQUEST_FAILED",
    "TLS_SESSION_CAPACITY",
    "TLS_CIRCUIT_OPEN",
    "PROVIDER_RETIRED",
    "upstream_empty_response",
    "upstream_response_error",
    "upstream_response_failed",
    "stream_pipeline_error",
    "stream_terminated",
    "rate_limited",
    "usage_limit_reached",
    "timeout",
    "semaphore_timeout",
    "semaphore_queue_full",
    "RATE_LIMIT_EXECUTION_TIMEOUT",
    "RATE_LIMIT_QUEUE_FULL",
    "RATE_LIMIT_QUEUE_WEDGED",
    "RATE_LIMIT_QUEUE_TIMEOUT",
    "rate_limit_queue_wedged",
    "429",
    "empty_response",
    "stream_idle_timeout",
    "empty_content",
    "UNAVAILABLE",
    "RESOURCE_EXHAUSTED",
    "provider_unavailable",
    "unsupported_feature",
    "missing_project_id",
    "oauth_missing_project_id",
    "gcp_project_required",
    "QUOTA_ONLY",
    "QUOTA_NOT_ALLOCATED",
    "cloudflare_challenge",
    "cf_mitigated_challenge",
    "upstream_protocol_error",
    "claude_web_protocol_error",
    "service_not_running",
    "storage_encryption_stale",
    "HTTP_429",
    "BLACKBOX_SUBSCRIPTION_REQUIRED",
    "BLACKBOX_AUTH_REQUIRED",
    "BLACKBOX_RATE_LIMIT",
    "abort",
    "ABORTED",
    "CHIPOTLE_ERROR",
    "premium_model_requires_key",
    "GROK_ERROR",
    "TLS_CLIENT_UNAVAILABLE",
    "upstream_access_denied",
    "proxy_unavailable",
    "EXECUTOR_ERROR",
    "executor_contract_violation",
    "orphan_tool_result",
    "bedrock_stream_error",
    "invalid_kiro_tool_call",
    "devin_cli_error",
    "upstream_websocket_error",
    "upstream_websocket_connect_failed",
    "codex_app_server_turn_failed",
    "missing_credits",
    "reached_limit",
    "rate_limit_reached",
    "rate_limit_longer_reached",
    "client_cancelled",
    "client_closed_request",
    "compaction_control_unavailable",
    "compaction_handoff_failed",
    "connector_not_found",
    "connector_error",
    "prompt_attachment_integrity",
    "chatgpt_session_expired",
    "chatgpt_subscription_unavailable",
    "upstream_server_error",
    "multipart_protocol_violation",
    "browser_stream_inconsistent",
    "structured_output_validation_failed",
    "chatgpt_submission_ambiguous",
    "chatgpt_submitted_turn_failed",
    "cli_not_found",
    "upstream_auth_error",
    "wreq_unavailable",
    "api_error",
    "connection_error",
    "unsupported_runtime",
    "VIDEO_ARTIFACT_URL_INVALID",
    "VIDEO_ARTIFACT_URL_BLOCKED",
    "VIDEO_ARTIFACT_DOWNLOAD_FAILED",
    "VIDEO_ARTIFACT_TOO_LARGE",
    "VIDEO_ARTIFACT_SIGNATURE_INVALID",
    "VIDEO_ARTIFACT_NOT_READY",
    "VIDEO_ARTIFACT_UNAVAILABLE",
    "VIDEO_ARTIFACT_CONTENT_TYPE_INVALID",
    "codex_app_server_unconfigured",
    "meta_ai_warmup_failed",
    "meta_ai_mode_switch_failed",
    "meta_ai_ws_error",
    "meta_ai_empty_response",
    "PPLX_ERROR",
    "cloudflare_or_bot",
    "request_failed",
    "lmarena_error",
    "network_error",
  ];

  for (const identifier of identifiers) {
    assert.equal(projectPublicErrorIdentifier(identifier, "bad_request"), identifier, identifier);
  }
});

test("public numeric identifiers are limited to three-digit HTTP status codes", () => {
  assert.equal(projectPublicErrorIdentifier("100", "bad_request"), "100");
  assert.equal(projectPublicErrorIdentifier("599", "bad_request"), "599");
  assert.equal(projectPublicErrorIdentifier("099", "bad_request"), "bad_request");
  assert.equal(projectPublicErrorIdentifier("600", "bad_request"), "bad_request");
  assert.equal(projectPublicErrorIdentifier("5000", "bad_request"), "bad_request");
  assert.equal(projectPublicErrorIdentifier("40002", "bad_request"), "bad_request");
  assert.equal(projectPublicErrorIdentifier("HTTP_600", "bad_request"), "bad_request");
  assert.equal(projectPublicErrorIdentifier("HTTP_40002", "bad_request"), "bad_request");
  assert.equal(projectPublicErrorIdentifier("weird_error", "bad_gateway"), "bad_gateway");
});

test("buildErrorBody callers never overwrite a projected public classification", () => {
  const productionFiles: string[] = [];
  const collectTypeScriptFiles = (directory: string): void => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "__tests__") continue;
        collectTypeScriptFiles(entryPath);
      } else if (entry.isFile() && /\.tsx?$/.test(entry.name)) {
        productionFiles.push(entryPath);
      }
    }
  };

  collectTypeScriptFiles(path.join(REPO_ROOT, "open-sse"));
  collectTypeScriptFiles(path.join(REPO_ROOT, "src"));

  const mutationPattern = /\b[A-Za-z_$][A-Za-z0-9_$]*\.error\.(?:code|type|reason)\s*=(?!=)/g;
  const violations: string[] = [];
  for (const filePath of productionFiles) {
    const source = fs.readFileSync(filePath, "utf8");
    if (!source.includes("buildErrorBody")) continue;
    for (const match of source.matchAll(mutationPattern)) {
      const line = source.slice(0, match.index).split("\n").length;
      violations.push(`${path.relative(REPO_ROOT, filePath)}:${line}`);
    }
  }

  assert.deepEqual(violations, []);

  const chatCoreSource = fs.readFileSync(
    path.join(REPO_ROOT, "open-sse/handlers/chatCore.ts"),
    "utf8"
  );
  assert.doesNotMatch(
    chatCoreSource,
    /JSON\.stringify\(\s*\{\s*error\s*:\s*\{/,
    "chatCore must not bypass buildErrorBody with a manually assembled error envelope"
  );
});

test("operational log persistence catches use the canonical sanitizer", () => {
  const callLogsSource = fs.readFileSync(path.join(REPO_ROOT, "src/lib/usage/callLogs.ts"), "utf8");
  const proxyLoggerSource = fs.readFileSync(path.join(REPO_ROOT, "src/lib/proxyLogger.ts"), "utf8");

  assert.match(callLogsSource, /sanitizeErrorMessage\(error\)/);
  assert.doesNotMatch(callLogsSource, /\(error as Error\)\.message/);
  assert.match(proxyLoggerSource, /sanitizeErrorMessage\(err\)/);
  assert.doesNotMatch(proxyLoggerSource, /err\?\.message\s*\|\|\s*err/);
});

test("stream request finalization never warns with a raw error object", () => {
  const source = fs.readFileSync(
    path.join(REPO_ROOT, "open-sse/utils/streamFailureFinalization.ts"),
    "utf8"
  );

  assert.match(source, /sanitizeErrorMessage\(error\)/);
  assert.doesNotMatch(source, /"message" in error[\s\S]{0,160}: error/);
});

test("chatCore provider-failure writes use the projected persistent message", () => {
  const source = fs.readFileSync(path.join(REPO_ROOT, "open-sse/handlers/chatCore.ts"), "utf8");
  const failureStart = source.indexOf("providerFailure: if (!providerResponse.ok)");
  const failureEnd = source.indexOf("// Non-streaming response", failureStart);
  assert.ok(failureStart >= 0 && failureEnd > failureStart, "providerFailure block must exist");
  const failureBlock = source.slice(failureStart, failureEnd);

  assert.doesNotMatch(failureBlock, /lastError:\s*message\b/);
  assert.ok(
    (failureBlock.match(/lastError:\s*persistentMessage\b/g) || []).length >= 11,
    "every providerFailure persistence branch must use persistentMessage"
  );
});

test("public cooldown and circuit responses sanitize dynamic context", async () => {
  const unavailable = unavailableResponse(
    503,
    "Provider failed at /srv/private/state.sqlite access_token=unavailable-secret",
    5,
    "retry after reading C:\\Users\\admin\\private\\state.json"
  );
  const unavailableBody = (await unavailable.json()) as { error: { message: string } };
  assert.doesNotMatch(unavailableBody.error.message, /srv\/private|unavailable-secret|C:\\Users/i);

  const circuit = providerCircuitOpenResponse(
    "provider access_token=circuit-secret /home/service/provider.json",
    5
  );
  const circuitBody = (await circuit.json()) as {
    error: { message: string; provider: string };
  };
  assert.equal(circuitBody.error.provider, "unknown");
  assert.doesNotMatch(JSON.stringify(circuitBody), /circuit-secret|\/home\/service/i);

  const cooldown = buildModelCooldownBody({
    model: "model access_token=model-secret /opt/models/private.json",
    retryAfterSec: Number.NaN,
    retryAfterAt: "not-a-timestamp access_token=timestamp-secret",
  });
  assert.equal(cooldown.error.model, undefined);
  assert.equal(cooldown.error.retry_after, undefined);
  assert.equal(cooldown.error.reset_seconds, 1);
  assert.doesNotMatch(JSON.stringify(cooldown), /model-secret|timestamp-secret|\/opt\/models/i);
});

test("sanitizeUpstreamDetails drops credential aliases and prototype-control keys", () => {
  const input = Object.create(null) as Record<string, unknown>;
  input.error = {
    message: "quota metadata at /srv/provider/private.json",
    credential: "credential-secret",
    sessionId: "session-secret",
    session_count: 2,
  };
  input.__proto__ = { leaked: true };

  const safe = sanitizeUpstreamDetails(input) as Record<string, unknown>;
  const serialized = JSON.stringify(safe);

  assert.doesNotMatch(serialized, /credential-secret|session-secret|srv\/provider|__proto__/i);
  assert.match(serialized, /"session_count":2/);
});

test("buildErrorBody fails closed for hostile upstream detail accessors", () => {
  const hostile = new Proxy(
    {},
    {
      ownKeys(): never {
        throw new Error("access_token=hostile-detail at /srv/private/detail.ts:1:2");
      },
    }
  );

  let body: ReturnType<typeof buildErrorBody> | undefined;
  assert.doesNotThrow(() => {
    body = buildErrorBody(502, "upstream failed", hostile);
  });
  assert.equal(body?.upstream_details, undefined);
  assert.doesNotMatch(JSON.stringify(body), /hostile-detail|srv\/private|detail\.ts/i);
});

test("upstream passthrough preserves safe wording but recursively sanitizes the JSON body", async () => {
  const opaqueIdentifier = "AbC9xY7pQ2mN8vR4kL6z";
  const upstream = {
    type: "error",
    error: {
      type: "invalid_request_error",
      code: opaqueIdentifier,
      reason: opaqueIdentifier,
      message: "quota metadata from /srv/provider/private.json",
      credential: "credential-secret",
      session_count: 2,
      details: [{ type: "integer", reason: "must be positive" }],
    },
  };

  assert.equal(shouldPassthroughUpstreamError(422, upstream), true);
  const response = buildPassthroughErrorResponse(422, upstream);
  assert.ok(response);
  const serialized = JSON.stringify(await response.json());

  assert.match(serialized, /invalid_request_error/);
  assert.match(serialized, /"session_count":2/);
  assert.match(serialized, /"type":"integer","reason":"must be positive"/);
  assert.doesNotMatch(
    serialized,
    new RegExp(`credential-secret|srv/provider|${opaqueIdentifier}`, "i")
  );
});

test("upstream classification projection preserves HTTP numbers and rejects opaque aliases", () => {
  const opaqueIdentifier = "AbC9xY7pQ2mN8vR4kL6z";
  const projected = sanitizeUpstreamDetails({
    code: 400,
    status: "UNAVAILABLE",
    oversizedCode: 40002,
    error: {
      code: 40002,
      error_code: opaqueIdentifier,
      errorCode: opaqueIdentifier,
      error_type: opaqueIdentifier,
      errorType: opaqueIdentifier,
      sub_type: opaqueIdentifier,
      subType: opaqueIdentifier,
      status: opaqueIdentifier,
      status_code: opaqueIdentifier,
      statusCode: opaqueIdentifier,
      message: "safe provider wording",
    },
  }) as {
    code?: unknown;
    status?: unknown;
    oversizedCode?: unknown;
    error?: Record<string, unknown>;
  };

  assert.equal(projected.code, 400);
  assert.equal(projected.status, "UNAVAILABLE");
  assert.equal(projected.oversizedCode, 40002);
  assert.equal(projected.error?.code, undefined);
  assert.equal(projected.error?.error_code, "");
  assert.equal(projected.error?.errorCode, "");
  assert.equal(projected.error?.error_type, "upstream_error");
  assert.equal(projected.error?.errorType, "upstream_error");
  assert.equal(projected.error?.sub_type, "upstream_error");
  assert.equal(projected.error?.subType, "upstream_error");
  assert.equal(projected.error?.status, undefined);
  assert.equal(projected.error?.status_code, undefined);
  assert.equal(projected.error?.statusCode, undefined);
  assert.equal(projected.error?.message, "safe provider wording");
  assert.doesNotMatch(JSON.stringify(projected), new RegExp(opaqueIdentifier));
});

test("upstream classification projection preserves only real gRPC numeric codes", () => {
  const projected = sanitizeUpstreamDetails({
    error: { code: 7 },
    errors: [{ code: 16 }, { code: 17 }, { code: 40002 }],
    status: 7,
    warning: { code: "model_capacity", type: "unknown" },
  }) as {
    error?: { code?: unknown };
    errors?: Array<{ code?: unknown }>;
    status?: unknown;
    warning?: { code?: unknown; type?: unknown };
  };

  assert.equal(projected.error?.code, 7);
  assert.equal(projected.errors?.[0]?.code, 16);
  assert.equal(projected.errors?.[1]?.code, undefined);
  assert.equal(projected.errors?.[2]?.code, undefined);
  assert.equal(projected.status, undefined);
  assert.equal(projected.warning?.code, "");
  assert.equal(projected.warning?.type, "upstream_error");
});

test("sanitizeUpstreamDetails fails closed for hostile prototype access", () => {
  const hostile = new Proxy(
    {},
    {
      getPrototypeOf(): never {
        throw new Error("access_token=prototype-secret at /srv/private/prototype.ts");
      },
    }
  );

  let projected: unknown;
  assert.doesNotThrow(() => {
    projected = sanitizeUpstreamDetails(hostile);
  });
  assert.doesNotMatch(JSON.stringify(projected), /prototype-secret|srv\/private|prototype\.ts/i);
});

test("upstream passthrough fails closed for non-serializable bodies", () => {
  const cyclic: Record<string, unknown> = { error: { message: "safe" } };
  cyclic.self = cyclic;

  assert.equal(shouldPassthroughUpstreamError(400, cyclic), false);
  assert.equal(buildPassthroughErrorResponse(400, cyclic), null);
});

test("upstream passthrough fails closed when getters change after eligibility", () => {
  let reads = 0;
  const upstream = Object.create(null) as Record<string, unknown>;
  Object.defineProperty(upstream, "error", {
    enumerable: true,
    get(): unknown {
      reads += 1;
      if (reads === 1) return { message: "safe capability error" };
      throw new Error("access_token=second-read-secret at /srv/private/getter.ts:1:2");
    },
  });

  assert.doesNotThrow(() => buildPassthroughErrorResponse(400, upstream));
  assert.equal(buildPassthroughErrorResponse(400, upstream), null);
});
