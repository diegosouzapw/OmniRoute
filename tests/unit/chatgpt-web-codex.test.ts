import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  loadChatGptWebCodexMcpModule,
  resolveChatGptWebCodexMcpEntry,
} from "../../bin/chatgpt-web-codex-mcp.mjs";
import {
  hasNativeCodexTurnBinding,
  isCodexOriginatedHeaders,
  isVerifiedNativeCodexRequest,
} from "../../open-sse/config/codexIdentity.ts";
import { chatgpt_web_codexProvider } from "../../open-sse/config/providers/registry/chatgpt-web-codex/index.ts";
import {
  decodeChatGptWebCodexSecrets,
  encodeChatGptWebCodexSecrets,
} from "../../open-sse/executors/chatgpt-web-codex/credentials.ts";
import {
  reasoningEffortOf,
  requireChatGptWebCodexRoute,
} from "../../open-sse/executors/chatgpt-web-codex/models.ts";
import {
  ensureConnectionStorageState,
  readConnectionStorageState,
} from "../../open-sse/executors/chatgpt-web-codex/storageState.ts";
import {
  buildTunnelRuntimeStatusArgs,
  buildTunnelRuntimeStopArgs,
  CHATGPT_WEB_CODEX_TUNNEL_VERSION,
  parseTunnelChecksum,
  parseTunnelRuntimeStatus,
  tunnelClientInstallAction,
  tunnelPlatformAsset,
} from "../../open-sse/executors/chatgpt-web-codex/tunnelClient.ts";
import {
  callTurnBroker,
  TurnBroker,
} from "../../open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/turn-broker.ts";
import {
  chatGptPromptFilePayloads,
  insertPlainTextAtComposerSelection,
  mergeChatGptRuntimeStorageState,
  resolveBrowserConfig,
} from "../../open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/browser-worker.ts";
import {
  loginVerificationMarkerPath,
  writeVerificationMarker,
} from "../../open-sse/vendor/codex-chatgpt-web/browser-login.ts";
import {
  CHATGPT_CONNECTOR_NAME,
  getConfigDir,
} from "../../open-sse/vendor/codex-chatgpt-web/config.ts";
import {
  CHATGPT_BIGGER_CONTEXT_PARTS,
  compileChatGptWebPrompt,
} from "../../open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/prompt.ts";
import { parseRequest } from "../../open-sse/vendor/codex-chatgpt-web/responses/parser.ts";
import {
  expandPreviousResponseInput,
  rememberResponseState,
  resetResponseStateForTests,
} from "../../open-sse/vendor/codex-chatgpt-web/responses/state.ts";
import type { CodexParsedRequest } from "../../open-sse/vendor/codex-chatgpt-web/types.ts";
import {
  inputHasSelfContainedCodexContinuation,
  resolveChatGptWebCodexPreviousResponse,
} from "../../open-sse/executors/chatgpt-web-codex.ts";
import { checkFallbackError } from "../../open-sse/services/accountFallback.ts";
import {
  ChatGptTextFeed,
  ChatGptTraceFeed,
  ChatGptTurnSessions,
} from "../../open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/turn-execution.ts";
import {
  CHATGPT_WEB_CODEX_CONNECTOR_NAME,
  CHATGPT_WEB_CODEX_RUNTIME_HEADED,
} from "../../src/shared/constants/chatgptWebCodex.ts";

test("registers the additive ChatGPT Web Codex provider and current fixed routes", () => {
  assert.equal(CHATGPT_WEB_CODEX_CONNECTOR_NAME, CHATGPT_CONNECTOR_NAME);
  assert.equal(chatgpt_web_codexProvider.id, "chatgpt-web-codex");
  assert.deepEqual(
    chatgpt_web_codexProvider.models?.map((model) => model.id),
    ["luna", "think", "instant", "medium", "high", "extra-high", "pro"]
  );
  assert.deepEqual(
    ["luna", "think", "instant", "medium", "high", "extra-high", "pro"].map(
      (model) => requireChatGptWebCodexRoute(model).effort
    ),
    ["low", "medium", "low", "medium", "high", "xhigh", "max"]
  );
  assert.equal(requireChatGptWebCodexRoute("luna").sol, false);
  assert.equal(requireChatGptWebCodexRoute("extra-high").pro, true);
  assert.equal(requireChatGptWebCodexRoute("pro").pro, true);
});

test("runs the ChatGPT browser headed so Cloudflare sees the verified browser shape", () => {
  assert.equal(CHATGPT_WEB_CODEX_RUNTIME_HEADED, true);
});

test("runs the Docker browser headed inside a private Xvfb display", () => {
  const dockerfile = readFileSync(
    join(process.cwd(), "docker/chatgpt-web-codex-browser/Dockerfile"),
    "utf8"
  );
  assert.match(dockerfile, /xvfb-run/);
  assert.doesNotMatch(dockerfile, /--headless(?:=|\s)/);
  assert.match(dockerfile, /-nolisten tcp/);
});

test("#12024 Docker browser find pattern matches both chrome-linux and chrome-linux64 layouts", () => {
  const dockerfile = readFileSync(
    join(process.cwd(), "docker/chatgpt-web-codex-browser/Dockerfile"),
    "utf8"
  );
  const found = dockerfile.match(/find \/ms-playwright -path '([^']+)' -type f/);
  assert.ok(found, "Dockerfile CMD must locate the Chrome binary with a find -path glob");
  const glob = found[1];
  const matcher = new RegExp(
    `^${glob.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`
  );
  // playwright:v1.62.0-noble ships Chrome for Testing, which extracts to chrome-linux64/.
  assert.match("/ms-playwright/chromium-1234/chrome-linux64/chrome", matcher);
  // Older images keep the legacy chrome-linux/ directory.
  assert.match("/ms-playwright/chromium-1234/chrome-linux/chrome", matcher);
  // The separate headless-shell build ships a different binary name and must not be picked up.
  assert.doesNotMatch(
    "/ms-playwright/chromium_headless_shell-1234/chrome-linux/headless_shell",
    matcher
  );
});

test("preserves browser-verified ChatGPT auth cookies across runtime rotation", () => {
  const cookie = (name: string, value: string) => ({
    name,
    value,
    domain: ".chatgpt.com",
    path: "/",
    expires: -1,
    httpOnly: false,
    secure: true,
    sameSite: "Lax" as const,
  });
  const verified = {
    cookies: [
      cookie("__Secure-next-auth.session-token", "verified-session"),
      cookie("oai-client-session-epoch", "verified-epoch"),
      cookie("oai-did", "stable-device"),
    ],
    origins: [],
  };
  const runtime = {
    cookies: [
      cookie("__Secure-next-auth.session-token", "rotated-session"),
      cookie("_puid", "runtime-puid"),
    ],
    origins: [{ origin: "https://chatgpt.com", localStorage: [{ name: "runtime", value: "1" }] }],
  };

  const merged = mergeChatGptRuntimeStorageState(verified, runtime);
  assert.equal(
    merged.cookies.find((entry) => entry.name === "__Secure-next-auth.session-token")?.value,
    "verified-session"
  );
  assert.equal(
    merged.cookies.find((entry) => entry.name === "oai-client-session-epoch")?.value,
    "verified-epoch"
  );
  assert.equal(merged.cookies.find((entry) => entry.name === "_puid")?.value, "runtime-puid");
  assert.deepEqual(merged.origins, runtime.origins);
});

test("loads the TypeScript MCP entrypoint through the Node 26-compatible tsx import hook", async () => {
  const entry = resolveChatGptWebCodexMcpEntry(process.cwd());
  assert.ok(entry?.endsWith(".ts"));
  const module = await loadChatGptWebCodexMcpModule(entry, process.cwd());
  assert.equal(typeof module.runChatGptMcpServer, "function");
});

test("plain-text composer insertion establishes a caret when focus has no selection", () => {
  const selection = {
    isCollapsed: true,
    anchorNode: null as object | null,
    removeAllRanges() {
      this.anchorNode = null;
    },
    addRange() {
      this.anchorNode = element;
    },
  };
  const documentState = { activeElement: null as object | null };
  let inserted = "";
  const document = {
    get activeElement() {
      return documentState.activeElement;
    },
    getSelection: () => selection,
    createRange: () => ({
      selectNodeContents: () => {},
      collapse: () => {},
    }),
    execCommand(command: string, _showUi: boolean, value: string) {
      if (command !== "insertText") return false;
      inserted = value;
      return true;
    },
  };
  const element = {
    ownerDocument: document,
    focus() {
      documentState.activeElement = element;
    },
    contains(node: object | null) {
      return node === element;
    },
  };

  assert.equal(
    insertPlainTextAtComposerSelection(element as unknown as HTMLElement, "LUNA_OK"),
    true
  );
  assert.equal(inserted, "LUNA_OK");
  assert.equal(selection.anchorNode, element);
});

test("keeps OmniRoute DATA_DIR isolation and Docker CDP browser ownership", () => {
  const previousDataDir = process.env.DATA_DIR;
  const previousDedicatedHome = process.env.CODEX_CHATGPT_WEB_HOME;
  const root = mkdtempSync(join(tmpdir(), "omniroute-chatgpt-web-config-"));
  try {
    process.env.DATA_DIR = root;
    delete process.env.CODEX_CHATGPT_WEB_HOME;
    assert.equal(getConfigDir(), join(root, "chatgpt-web-codex"));
    const resolved = resolveBrowserConfig({
      adapter: "chatgpt-web",
      baseUrl: "https://chatgpt.com",
      chatgptWeb: {
        cdpEndpoint: "http://chatgpt-web-codex-browser:9223",
        storageStatePath: join(root, "storage-state.json"),
      },
    });
    assert.equal(resolved.cdpEndpoint, "http://chatgpt-web-codex-browser:9223");
    assert.equal(resolved.chromeExecutablePath, undefined);
  } finally {
    if (previousDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previousDataDir;
    if (previousDedicatedHome === undefined) delete process.env.CODEX_CHATGPT_WEB_HOME;
    else process.env.CODEX_CHATGPT_WEB_HOME = previousDedicatedHome;
    rmSync(root, { recursive: true, force: true });
  }
});

test("rejects the previously shipped OmniRoute connector identity after the MCP contract change", () => {
  assert.throws(
    () =>
      resolveBrowserConfig({
        adapter: "chatgpt-web",
        baseUrl: "https://chatgpt.com",
        chatgptWeb: {
          appName: "OmniRoute Codex",
          storageStatePath: "/tmp/omniroute-chatgpt-web-storage-state.json",
        },
      }),
    /newly created connector named "OmniRoute Codex v2"/
  );
});

test("verified capability refresh preserves the credential marker binding", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-chatgpt-web-marker-"));
  const statePath = join(root, "storage-state.json");
  const markerPath = loginVerificationMarkerPath(statePath);
  try {
    writeFileSync(statePath, `${JSON.stringify({ cookies: [], origins: [] })}\n`);
    writeFileSync(
      markerPath,
      `${JSON.stringify({
        version: 1,
        authenticated: true,
        verifiedAt: "2026-08-31T00:00:00.000Z",
        cookieFingerprint: "cookie-bound",
        pendingBrowserVerification: true,
      })}\n`
    );
    writeVerificationMarker(statePath, { solAvailable: false, proAvailable: false });
    const marker = JSON.parse(readFileSync(markerPath, "utf8")) as Record<string, unknown>;
    assert.equal(marker.cookieFingerprint, "cookie-bound");
    assert.equal(marker.pendingBrowserVerification, false);
    assert.equal(marker.solAvailable, false);
    assert.equal(marker.proAvailable, false);
    assert.match(String(marker.storageStateFingerprint), /^[a-f0-9]{64}$/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("cookie-header storage state satisfies Playwright cookie requirements", () => {
  const previousDataDir = process.env.DATA_DIR;
  const root = mkdtempSync(join(tmpdir(), "omniroute-chatgpt-web-cookie-state-"));
  try {
    process.env.DATA_DIR = root;
    const statePath = ensureConnectionStorageState(
      "cookie-shape",
      [
        "__Secure-next-auth.session-token.0=first",
        "__Secure-next-auth.session-token.1=second",
        "__Host-next-auth.csrf-token=csrf",
        "oai-did=device",
      ].join("; ")
    );
    const state = readConnectionStorageState(statePath);
    const cookies = state.cookies as Array<Record<string, unknown>>;

    assert.equal(cookies.length, 4);
    assert.equal(
      cookies.every((cookie) => cookie.expires === -1),
      true
    );
    assert.equal(
      cookies.find((cookie) => cookie.name === "__Host-next-auth.csrf-token")?.domain,
      "chatgpt.com"
    );
    assert.equal(cookies.find((cookie) => cookie.name === "oai-did")?.domain, ".chatgpt.com");
  } finally {
    if (previousDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previousDataDir;
    rmSync(root, { recursive: true, force: true });
  }
});

test("explicit Responses reasoning effort is read for mismatch preflight", () => {
  assert.equal(reasoningEffortOf({ reasoning: { effort: "high" } }), "high");
  assert.equal(reasoningEffortOf({ reasoning_effort: "xhigh" }), "xhigh");
});

test("Codex detection requires originator or Codex User-Agent", () => {
  assert.equal(isCodexOriginatedHeaders({ originator: "codex_cli_rs" }), true);
  assert.equal(isCodexOriginatedHeaders({ "user-agent": "codex_app/1.0" }), true);
  assert.equal(isCodexOriginatedHeaders({ "user-agent": "openai-node/4" }), false);
});

test("native ChatGPT Web Codex detection also requires thread and turn identity", () => {
  const headers = { originator: "codex_cli_rs" };
  const body = {
    client_metadata: {
      "x-codex-turn-metadata": JSON.stringify({
        thread_id: "thread-1",
        turn_id: "turn-1",
      }),
    },
  };
  assert.equal(hasNativeCodexTurnBinding(body), true);
  assert.equal(isVerifiedNativeCodexRequest(body, headers), true);
  assert.equal(isVerifiedNativeCodexRequest({}, headers), false);
  assert.equal(isVerifiedNativeCodexRequest(body, { "user-agent": "openai-node/4" }), false);
  assert.equal(
    hasNativeCodexTurnBinding({
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify({ turn_id: "turn-1" }),
      },
    }),
    false
  );
});

test("version two credentials contain storage state but not the raw Cookie", () => {
  const encoded = encodeChatGptWebCodexSecrets({
    storageState: { cookies: [{ name: "session", value: "secret" }], origins: [] },
    runtimeKey: "runtime-secret",
  });
  const parsed = JSON.parse(encoded) as Record<string, unknown>;
  assert.equal(parsed.version, 2);
  assert.equal("cookie" in parsed, false);
  assert.deepEqual(decodeChatGptWebCodexSecrets(encoded).storageState, parsed.storageState);
});

test("legacy Cookie credentials remain decodable for one-time validation", () => {
  assert.equal(
    decodeChatGptWebCodexSecrets(
      JSON.stringify({ version: 1, cookie: "Cookie: session=value", runtimeKey: "key" })
    ).cookie,
    "session=value"
  );
});

test("tunnel status is ready only when the process is running and healthy", () => {
  const ready = parseTunnelRuntimeStatus(
    JSON.stringify({ process_running: true, healthy: true, ready: true, runtime_state: "ready" })
  );
  assert.equal(ready.ok, true);
  assert.equal(
    parseTunnelRuntimeStatus(JSON.stringify({ process_running: false, healthy: true, ready: true }))
      .ok,
    false
  );
});

test("tunnel runtime status and stop use only flags accepted by alias commands", () => {
  assert.deepEqual(buildTunnelRuntimeStatusArgs("omniroute-chatgpt-web-codex"), [
    "runtimes",
    "status",
    "omniroute-chatgpt-web-codex",
    "--json",
  ]);
  assert.deepEqual(buildTunnelRuntimeStopArgs("omniroute-chatgpt-web-codex"), [
    "runtimes",
    "stop",
    "omniroute-chatgpt-web-codex",
    "--json",
  ]);
});

test("tunnel checksum parsing is pinned to the exact release asset", () => {
  const checksum = "a".repeat(64);
  assert.equal(
    parseTunnelChecksum(`${checksum}  tunnel-client.zip\n`, "tunnel-client.zip"),
    checksum
  );
  assert.throws(
    () => parseTunnelChecksum(`${checksum}  another.zip\n`, "tunnel-client.zip"),
    /no valid entry/
  );
});

test("pins tunnel-client 0.0.13 and upgrades previously shipped builds", () => {
  assert.equal(CHATGPT_WEB_CODEX_TUNNEL_VERSION, "0.0.13");
  assert.equal(tunnelPlatformAsset("darwin", "arm64"), "tunnel-client-v0.0.13-darwin-arm64.zip");
  assert.equal(tunnelClientInstallAction("0.0.13"), "reuse");
  assert.equal(tunnelClientInstallAction("0.0.12"), "upgrade");
  assert.equal(tunnelClientInstallAction("0.0.10"), "upgrade");
  assert.throws(() => tunnelClientInstallAction("0.0.11"), /not a trusted upgrade source/);
  assert.throws(() => tunnelClientInstallAction("9.9.9"), /not a trusted upgrade source/);
});

test("turn broker holds a tool invocation and rejects wrong or duplicate results", async () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-cgw-broker-"));
  const socketPath = join(root, "runtime", "turn-broker.sock");
  const broker = TurnBroker.forSocket(socketPath);
  try {
    const token = await broker.register(
      {
        cwd: root,
        roots: [root],
        writableRoots: [root],
        sandboxPolicy: { type: "dangerFullAccess" },
        tools: [
          {
            name: "exec_command",
            description: "Run a command",
            parameters: { type: "object" },
          },
        ],
      },
      10_000
    );
    const claim = await callTurnBroker<{ bindingId: string }>(socketPath, {
      method: "claim",
      token,
    });
    const invocation = callTurnBroker<{ content: unknown[] }>(
      socketPath,
      {
        method: "invoke",
        bindingId: claim.bindingId,
        wireName: "exec_command",
        arguments: { cmd: "pwd" },
      },
      10_000
    );
    const [request] = await broker.nextToolBatch(token);
    assert.ok(request);
    assert.throws(() => broker.completeTool(token, "unknown-call", { content: [] }), /not pending/);
    broker.completeTool(token, request.callId, { content: [{ type: "text", text: root }] });
    assert.deepEqual(await invocation, { content: [{ type: "text", text: root }] });
    assert.throws(() => broker.completeTool(token, request.callId, { content: [] }), /not pending/);
  } finally {
    await broker.close();
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("revoking a turn rejects a pending connector invocation", async () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-cgw-revoke-"));
  const socketPath = join(root, "runtime", "turn-broker.sock");
  const broker = TurnBroker.forSocket(socketPath);
  try {
    const token = await broker.register(
      {
        cwd: root,
        roots: [root],
        writableRoots: [root],
        sandboxPolicy: { type: "dangerFullAccess" },
        tools: [],
      },
      10_000
    );
    const claim = await callTurnBroker<{ bindingId: string }>(socketPath, {
      method: "claim",
      token,
    });
    const invocation = callTurnBroker(
      socketPath,
      {
        method: "invoke",
        bindingId: claim.bindingId,
        wireName: "exec_command",
        arguments: { cmd: "sleep 30" },
      },
      10_000
    );
    await broker.nextToolBatch(token);
    broker.revoke(token);
    await assert.rejects(invocation, /revoked/);
  } finally {
    await broker.close();
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("an explicitly bounded turn token expires closed", async () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-cgw-expiry-"));
  const socketPath = join(root, "runtime", "turn-broker.sock");
  const broker = TurnBroker.forSocket(socketPath);
  try {
    const token = await broker.register(
      {
        cwd: root,
        roots: [root],
        writableRoots: [root],
        sandboxPolicy: { type: "dangerFullAccess" },
        tools: [],
      },
      1
    );
    await new Promise((resolve) => setTimeout(resolve, 10));
    await assert.rejects(
      callTurnBroker(socketPath, { method: "claim", token }),
      /already finished|turn token is invalid, expired, or revoked/
    );
  } finally {
    await broker.close();
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

function requestWithText(text: string): CodexParsedRequest {
  return {
    modelId: "gpt-5.6-sol",
    context: {
      messages: [{ role: "user", content: text, timestamp: 1 }],
    },
    stream: true,
    options: { reasoning: "high" },
  };
}

test("contexts stay inline by default and use explicit transactional multipart transport", () => {
  const capabilities = { localToolsEnabled: false, solAvailable: true, proAvailable: true };
  const small = compileChatGptWebPrompt(requestWithText("hello"), capabilities);
  assert.match(small.text, /<codex_context_json>/);
  assert.equal(small.multipart, undefined);

  const large = compileChatGptWebPrompt(
    requestWithText("x".repeat(120_001)),
    capabilities,
    undefined,
    { experimentalMultipartParts: CHATGPT_BIGGER_CONTEXT_PARTS }
  );
  assert.equal(large.multipart?.parts.length, CHATGPT_BIGGER_CONTEXT_PARTS);
  assert.equal(large.text, large.multipart?.commit);
  assert.match(large.multipart?.parts.join("\n") ?? "", /"kind":"message"/);
  assert.doesNotMatch(large.text, /x{1000}/);
});

test("preserves native Codex image inputs as browser attachments", () => {
  const request = requestWithText("inspect the image");
  request.context.messages = [
    {
      role: "user",
      content: [
        { type: "text", text: "inspect the image" },
        { type: "image", imageUrl: "data:image/png;base64,aW1hZ2U=", detail: "high" },
      ],
      timestamp: 1,
    },
  ];

  const compiled = compileChatGptWebPrompt(request, {
    localToolsEnabled: false,
    solAvailable: true,
    proAvailable: true,
  });

  assert.deepEqual(compiled.images, [
    {
      ref: "codex-input-image-1",
      imageUrl: "data:image/png;base64,aW1hZ2U=",
      detail: "high",
    },
  ]);
  assert.match(compiled.text, /"type":"image_attachment"/);
  assert.match(compiled.text, /"attachment_ref":"codex-input-image-1"/);
});

test("preserves Responses input_file bytes as browser attachments", () => {
  const fileBytes = Buffer.from("CHATGPT_WEB_FILE_SENTINEL\n", "utf8");
  const parsed = parseRequest({
    model: "gpt-5.6-sol",
    stream: true,
    reasoning: { effort: "high" },
    input: [
      {
        type: "message",
        role: "user",
        content: [
          { type: "input_text", text: "Read the attached file" },
          {
            type: "input_file",
            filename: "sentinel.txt",
            file_data: fileBytes.toString("base64"),
          },
        ],
      },
    ],
  });

  const compiled = compileChatGptWebPrompt(parsed, {
    localToolsEnabled: false,
    solAvailable: true,
    proAvailable: true,
  });

  assert.deepEqual(compiled.files, [
    {
      ref: "codex-input-file-1",
      filename: "sentinel.txt",
      fileData: fileBytes.toString("base64"),
    },
  ]);
  assert.match(compiled.text, /"type":"file_attachment"/);
  assert.match(compiled.text, /"attachment_ref":"codex-input-file-1"/);
  const payloads = chatGptPromptFilePayloads(compiled);
  assert.equal(payloads.length, 1);
  assert.equal(payloads[0]?.name, "sentinel.txt");
  assert.equal(payloads[0]?.mimeType, "text/plain");
  assert.equal(payloads[0]?.buffer.toString("utf8"), "CHATGPT_WEB_FILE_SENTINEL\n");
});

test("rejects unresolved Responses file_id references instead of fabricating file text", () => {
  assert.throws(
    () =>
      parseRequest({
        model: "gpt-5.6-sol",
        stream: true,
        input: [
          {
            type: "message",
            role: "user",
            content: [{ type: "input_file", file_id: "file-unavailable" }],
          },
        ],
      }),
    /cannot resolve input_file file_id/i
  );
});

test("rejects unresolved and remote Responses image references before browser dispatch", () => {
  const requestWith = (image: Record<string, unknown>) => ({
    model: "gpt-5.6-sol",
    stream: true,
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_image", ...image }],
      },
    ],
  });

  assert.throws(
    () => parseRequest(requestWith({ file_id: "file-unavailable" })),
    /cannot resolve input_image file_id/i
  );
  assert.throws(
    () => parseRequest(requestWith({ image_url: "https:\/\/example.com\/remote.png" })),
    /supports inline data URLs only/i
  );
});

test("accepts inline input_file data URLs and rejects remote file URLs", () => {
  const parsed = parseRequest({
    model: "gpt-5.6-sol",
    stream: true,
    input: [
      {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_file",
            filename: "../probe.csv",
            file_url: "data:text/csv;base64,Y29sdW1uCg==",
          },
        ],
      },
    ],
  });
  const compiled = compileChatGptWebPrompt(parsed, {
    localToolsEnabled: false,
    solAvailable: true,
    proAvailable: true,
  });
  const [payload] = chatGptPromptFilePayloads(compiled);
  assert.equal(payload?.name, "probe.csv");
  assert.equal(payload?.mimeType, "text/csv");
  assert.equal(payload?.buffer.toString("utf8"), "column\n");

  assert.throws(
    () =>
      parseRequest({
        model: "gpt-5.6-sol",
        stream: true,
        input: [
          {
            type: "message",
            role: "user",
            content: [
              {
                type: "input_file",
                filename: "remote.pdf",
                file_url: "https://example.com/remote.pdf",
              },
            ],
          },
        ],
      }),
    /supports inline data URLs only/i
  );
});

test("session registry reports waiting turns as settled retained sessions", async () => {
  const sessions = new ChatGptTurnSessions();
  assert.equal(sessions.activeCount(), 0);
  assert.equal(sessions.waitingCount(), 0);

  let resolveBrowser: (answer: string) => void = () => {};
  const browser = new Promise<string>((resolve) => {
    resolveBrowser = resolve;
  });
  sessions.getOrCreate("turn-a", () => ({
    mode: "read-only",
    browser,
    physicalSettlement: browser.then(() => undefined),
    trace: new ChatGptTraceFeed(),
    text: new ChatGptTextFeed(),
    cancel() {},
  }));
  assert.equal(sessions.activeCount(), 1);
  assert.equal(sessions.waitingCount(), 0);

  resolveBrowser("done");
  await sessions.find("turn-a")?.browserOutcome;
  assert.equal(sessions.activeCount(), 0);
  assert.equal(sessions.waitingCount(), 1);
});

test("forced previous_response_id state flushes immediately and reloads after an isolate miss", () => {
  const home = mkdtempSync(join(tmpdir(), "chatgpt-web-codex-state-"));
  const previousHome = process.env.CODEX_CHATGPT_WEB_HOME;
  process.env.CODEX_CHATGPT_WEB_HOME = home;
  try {
    resetResponseStateForTests();
    const namespace = "conn:thread_live:turn_live";
    rememberResponseState(
      {
        store: false,
        input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "pwd" }] }],
      },
      {
        id: "resp_force_flush",
        status: "completed",
        output: [{ type: "function_call", call_id: "call_1", name: "exec_command" }],
      },
      { force: true, namespace }
    );
    const snapshot = join(home, "responses-state.json");
    assert.equal(existsSync(snapshot), true);
    resetResponseStateForTests();
    const continuation = {
      previous_response_id: "resp_force_flush",
      input: [
        { type: "function_call_output", call_id: "call_1", output: "/Users/backryun/OmniRoute" },
      ],
    };
    const expanded = expandPreviousResponseInput(continuation, namespace);
    assert.notEqual(expanded, continuation);
    assert.ok(Array.isArray((expanded as { input: unknown[] }).input));
    assert.equal((expanded as { input: unknown[] }).input.length, 3);
    const foreign = expandPreviousResponseInput(continuation, "other-turn");
    assert.equal(foreign, continuation);
  } finally {
    resetResponseStateForTests();
    if (previousHome === undefined) delete process.env.CODEX_CHATGPT_WEB_HOME;
    else process.env.CODEX_CHATGPT_WEB_HOME = previousHome;
    rmSync(home, { recursive: true, force: true });
  }
});

test("concurrent response-state writers merge their snapshots instead of overwriting", async () => {
  const home = mkdtempSync(join(tmpdir(), "chatgpt-web-codex-state-merge-"));
  const previousHome = process.env.CODEX_CHATGPT_WEB_HOME;
  process.env.CODEX_CHATGPT_WEB_HOME = home;
  const nonce = `${process.pid}-${Date.now()}`;
  const writerA = await import(
    `../../open-sse/vendor/codex-chatgpt-web/responses/state.ts?writer-a=${nonce}`
  );
  const writerB = await import(
    `../../open-sse/vendor/codex-chatgpt-web/responses/state.ts?writer-b=${nonce}`
  );
  try {
    assert.notEqual(writerA, writerB);
    writerA.resetResponseStateForTests();
    writerB.resetResponseStateForTests();
    writerA.rememberResponseState(
      { store: false, input: "request-a" },
      { id: "resp_writer_a", status: "completed", output: [{ type: "output_text", text: "a" }] },
      { force: true, namespace: "namespace-a" }
    );
    writerB.rememberResponseState(
      { store: false, input: "request-b" },
      { id: "resp_writer_b", status: "completed", output: [{ type: "output_text", text: "b" }] },
      { force: true, namespace: "namespace-b" }
    );

    writerA.resetResponseStateForTests();
    writerB.resetResponseStateForTests();
    const continuationA = { previous_response_id: "resp_writer_a", input: "continue-a" };
    const continuationB = { previous_response_id: "resp_writer_b", input: "continue-b" };
    assert.notEqual(
      writerA.expandPreviousResponseInput(continuationA, "namespace-a"),
      continuationA
    );
    assert.notEqual(
      writerB.expandPreviousResponseInput(continuationB, "namespace-b"),
      continuationB
    );
  } finally {
    writerA.resetResponseStateForTests();
    writerB.resetResponseStateForTests();
    if (previousHome === undefined) delete process.env.CODEX_CHATGPT_WEB_HOME;
    else process.env.CODEX_CHATGPT_WEB_HOME = previousHome;
    rmSync(home, { recursive: true, force: true });
  }
});

test("large attachment response state survives a separate isolate", async () => {
  const home = mkdtempSync(join(tmpdir(), "chatgpt-web-codex-state-large-"));
  const previousHome = process.env.CODEX_CHATGPT_WEB_HOME;
  process.env.CODEX_CHATGPT_WEB_HOME = home;
  const nonce = `${process.pid}-${Date.now()}`;
  const writer = await import(
    `../../open-sse/vendor/codex-chatgpt-web/responses/state.ts?large-writer=${nonce}`
  );
  const reader = await import(
    `../../open-sse/vendor/codex-chatgpt-web/responses/state.ts?large-reader=${nonce}`
  );
  try {
    assert.notEqual(writer, reader);
    writer.resetResponseStateForTests();
    reader.resetResponseStateForTests();
    const fileData = "a".repeat(2_200_000);
    writer.rememberResponseState(
      {
        store: false,
        input: [
          {
            type: "message",
            role: "user",
            content: [{ type: "input_file", filename: "large.txt", file_data: fileData }],
          },
        ],
      },
      {
        id: "resp_large_attachment",
        status: "completed",
        output: [{ type: "output_text", text: "received" }],
      },
      { force: true, namespace: "namespace-large" }
    );
    assert.equal(existsSync(join(home, "responses-state-large")), true);

    const continuation = {
      previous_response_id: "resp_large_attachment",
      input: "continue-large",
    };
    const expanded = reader.expandPreviousResponseInput(continuation, "namespace-large");
    assert.notEqual(expanded, continuation);
    assert.equal((expanded as { input: unknown[] }).input.length, 3);
  } finally {
    writer.resetResponseStateForTests();
    reader.resetResponseStateForTests();
    if (previousHome === undefined) delete process.env.CODEX_CHATGPT_WEB_HOME;
    else process.env.CODEX_CHATGPT_WEB_HOME = previousHome;
    rmSync(home, { recursive: true, force: true });
  }
});

test("namespaced continuations reject legacy state without a namespace", () => {
  const home = mkdtempSync(join(tmpdir(), "chatgpt-web-codex-state-namespace-"));
  const previousHome = process.env.CODEX_CHATGPT_WEB_HOME;
  process.env.CODEX_CHATGPT_WEB_HOME = home;
  try {
    resetResponseStateForTests();
    rememberResponseState(
      { store: false, input: "private-history" },
      { id: "resp_legacy_namespace", status: "completed", output: [] },
      { force: true }
    );
    const continuation = { previous_response_id: "resp_legacy_namespace", input: "foreign" };
    assert.equal(expandPreviousResponseInput(continuation, "different-namespace"), continuation);
  } finally {
    resetResponseStateForTests();
    if (previousHome === undefined) delete process.env.CODEX_CHATGPT_WEB_HOME;
    else process.env.CODEX_CHATGPT_WEB_HOME = previousHome;
    rmSync(home, { recursive: true, force: true });
  }
});

test("self-contained Codex continuations ignore an unknown previous_response_id instead of 409ing", () => {
  resetResponseStateForTests();
  const body = {
    previous_response_id: "resp_missing_from_this_isolate",
    input: [
      { type: "message", role: "user", content: [{ type: "input_text", text: "pwd" }] },
      {
        type: "function_call",
        call_id: "call_1",
        name: "exec_command",
        arguments: '{"cmd":"pwd"}',
      },
      { type: "function_call_output", call_id: "call_1", output: "/Users/backryun/OmniRoute" },
    ],
  };
  assert.equal(inputHasSelfContainedCodexContinuation(body), true);
  const resolved = resolveChatGptWebCodexPreviousResponse(body, "conn:thread:turn");
  assert.equal(resolved.ok, true);
  assert.equal(resolved.body.previous_response_id, undefined);
  assert.deepEqual(resolved.body.input, body.input);

  const naked = {
    previous_response_id: "resp_missing_from_this_isolate",
    input: [{ type: "function_call_output", call_id: "call_1", output: "/tmp" }],
  };
  assert.equal(inputHasSelfContainedCodexContinuation(naked), false);
  assert.equal(resolveChatGptWebCodexPreviousResponse(naked, "conn:thread:turn").ok, false);
});

test("a previous_response_id binding miss does not cool down the ChatGPT Web Codex connection", () => {
  const result = checkFallbackError(
    409,
    "[chatgpt-web-codex/instant] previous_response_id does not belong to this verified Codex turn",
    0,
    "instant",
    "chatgpt-web-codex",
    null,
    null,
    { code: "invalid_previous_response_binding" }
  );
  assert.equal(result.shouldFallback, false);
  assert.equal(result.cooldownMs, 0);
  assert.equal(result.skipProviderBreaker, true);
});
