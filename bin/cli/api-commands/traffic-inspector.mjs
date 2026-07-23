// AUTO-GENERATED from docs/openapi.yaml. Do not edit.
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { readFileSync } from "node:fs";

export function register_traffic_inspector(parent) {
  const tag = parent.command("traffic-inspector").description("Traffic Inspector endpoints");
  tag.command("get-api-tools-traffic-inspector-requests")
    .description("List intercepted requests (filterable)")
    .option("--profile <profile>", "")
    .option("--host <host>", "")
    .option("--agent <agent>", "")
    .option("--status <status>", "")
    .option("--source <source>", "")
    .option("--session-id <sessionId>", "")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/requests";
      const qs = new URLSearchParams();
      if (opts.profile != null) qs.set("profile", String(opts.profile));
      if (opts.host != null) qs.set("host", String(opts.host));
      if (opts.agent != null) qs.set("agent", String(opts.agent));
      if (opts.status != null) qs.set("status", String(opts.status));
      if (opts.source != null) qs.set("source", String(opts.source));
      if (opts.sessionId != null) qs.set("sessionId", String(opts.sessionId));
      if (qs.toString()) url += "?" + qs.toString();
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("delete-api-tools-traffic-inspector-requests")
    .description("Clear the in-memory traffic buffer")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/requests";
      const res = await apiFetch(url, { method: "DELETE", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("get-api-tools-traffic-inspector-requests-id-")
    .description("Get a single intercepted request by ID")
    .requiredOption("--id <id>", "")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/requests/{id}";
      url = url.replace("{id}", encodeURIComponent(opts.id ?? ""));
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("post-api-tools-traffic-inspector-requests-id-replay")
    .description("Replay a captured request through OmniRoute router")
    .requiredOption("--id <id>", "")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/requests/{id}/replay";
      url = url.replace("{id}", encodeURIComponent(opts.id ?? ""));
      const res = await apiFetch(url, { method: "POST", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("put-api-tools-traffic-inspector-requests-id-annotation")
    .description("Save or update annotation on a request")
    .requiredOption("--id <id>", "")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/requests/{id}/annotation";
      url = url.replace("{id}", encodeURIComponent(opts.id ?? ""));
      let body;
      if (opts.body) {
        body = opts.body.startsWith("@")
          ? JSON.parse(readFileSync(opts.body.slice(1), "utf8"))
          : JSON.parse(opts.body);
      }
      const res = await apiFetch(url, { method: "PUT", body, baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("get-api-tools-traffic-inspector-ws")
    .description("Live WebSocket stream of intercepted requests")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/ws";
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("get-api-tools-traffic-inspector-export-har")
    .description("Export current filtered request list as HAR 1.2")
    .option("--profile <profile>", "")
    .option("--session-id <sessionId>", "")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/export.har";
      const qs = new URLSearchParams();
      if (opts.profile != null) qs.set("profile", String(opts.profile));
      if (opts.sessionId != null) qs.set("sessionId", String(opts.sessionId));
      if (qs.toString()) url += "?" + qs.toString();
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("get-api-tools-traffic-inspector-hosts")
    .description("List custom capture hosts")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/hosts";
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("post-api-tools-traffic-inspector-hosts")
    .description("Add a custom capture host (edits /etc/hosts)")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/hosts";
      let body;
      if (opts.body) {
        body = opts.body.startsWith("@")
          ? JSON.parse(readFileSync(opts.body.slice(1), "utf8"))
          : JSON.parse(opts.body);
      }
      const res = await apiFetch(url, { method: "POST", body, baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("delete-api-tools-traffic-inspector-hosts-host-")
    .description("Remove a custom capture host")
    .requiredOption("--host <host>", "")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/hosts/{host}";
      url = url.replace("{host}", encodeURIComponent(opts.host ?? ""));
      const res = await apiFetch(url, { method: "DELETE", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("patch-api-tools-traffic-inspector-hosts-host-")
    .description("Toggle enabled state of a custom host")
    .requiredOption("--host <host>", "")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/hosts/{host}";
      url = url.replace("{host}", encodeURIComponent(opts.host ?? ""));
      let body;
      if (opts.body) {
        body = opts.body.startsWith("@")
          ? JSON.parse(readFileSync(opts.body.slice(1), "utf8"))
          : JSON.parse(opts.body);
      }
      const res = await apiFetch(url, { method: "PATCH", body, baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("get-api-tools-traffic-inspector-capture-modes")
    .description("Get state of all 4 capture modes")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/capture-modes";
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("post-api-tools-traffic-inspector-capture-modes-http-proxy")
    .description("Start or stop the HTTP_PROXY listener (port 8080)")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/capture-modes/http-proxy";
      let body;
      if (opts.body) {
        body = opts.body.startsWith("@")
          ? JSON.parse(readFileSync(opts.body.slice(1), "utf8"))
          : JSON.parse(opts.body);
      }
      const res = await apiFetch(url, { method: "POST", body, baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("post-api-tools-traffic-inspector-capture-modes-system-proxy")
    .description("Apply or revert system-wide proxy settings")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/capture-modes/system-proxy";
      let body;
      if (opts.body) {
        body = opts.body.startsWith("@")
          ? JSON.parse(readFileSync(opts.body.slice(1), "utf8"))
          : JSON.parse(opts.body);
      }
      const res = await apiFetch(url, { method: "POST", body, baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("post-api-tools-traffic-inspector-capture-modes-tls-intercept")
    .description("Toggle TLS body decryption in HTTP_PROXY mode")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/capture-modes/tls-intercept";
      let body;
      if (opts.body) {
        body = opts.body.startsWith("@")
          ? JSON.parse(readFileSync(opts.body.slice(1), "utf8"))
          : JSON.parse(opts.body);
      }
      const res = await apiFetch(url, { method: "POST", body, baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("get-api-tools-traffic-inspector-sessions")
    .description("List all saved recording sessions")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/sessions";
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("post-api-tools-traffic-inspector-sessions")
    .description("Start a new recording session")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/sessions";
      let body;
      if (opts.body) {
        body = opts.body.startsWith("@")
          ? JSON.parse(readFileSync(opts.body.slice(1), "utf8"))
          : JSON.parse(opts.body);
      }
      const res = await apiFetch(url, { method: "POST", body, baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("get-api-tools-traffic-inspector-sessions-id-")
    .description("Get session snapshot (all captured requests)")
    .requiredOption("--id <id>", "")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/sessions/{id}";
      url = url.replace("{id}", encodeURIComponent(opts.id ?? ""));
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("patch-api-tools-traffic-inspector-sessions-id-")
    .description("Stop or rename a recording session")
    .requiredOption("--id <id>", "")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/sessions/{id}";
      url = url.replace("{id}", encodeURIComponent(opts.id ?? ""));
      let body;
      if (opts.body) {
        body = opts.body.startsWith("@")
          ? JSON.parse(readFileSync(opts.body.slice(1), "utf8"))
          : JSON.parse(opts.body);
      }
      const res = await apiFetch(url, { method: "PATCH", body, baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("delete-api-tools-traffic-inspector-sessions-id-")
    .description("Delete a recording session")
    .requiredOption("--id <id>", "")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/sessions/{id}";
      url = url.replace("{id}", encodeURIComponent(opts.id ?? ""));
      const res = await apiFetch(url, { method: "DELETE", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("get-api-tools-traffic-inspector-sessions-id-export-har")
    .description("Export a recorded session as HAR 1.2")
    .requiredOption("--id <id>", "")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/sessions/{id}/export.har";
      url = url.replace("{id}", encodeURIComponent(opts.id ?? ""));
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("post-api-tools-traffic-inspector-internal-ingest")
    .description("Internal ingest endpoint for server.cjs passthrough path")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tools/traffic-inspector/internal/ingest";
      let body;
      if (opts.body) {
        body = opts.body.startsWith("@")
          ? JSON.parse(readFileSync(opts.body.slice(1), "utf8"))
          : JSON.parse(opts.body);
      }
      const res = await apiFetch(url, { method: "POST", body, baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
}
