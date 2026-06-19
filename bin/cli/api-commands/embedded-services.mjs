// AUTO-GENERATED from docs/reference/openapi.yaml. Do not edit.
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { readFileSync } from "node:fs";

export function register_embedded_services(parent) {
  const tag = parent.command("embedded-services").description("Embedded Services endpoints");
  tag.command("post-api-services-9router-install")
    .description("Install 9Router from npm")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/services/9router/install";
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
  tag.command("post-api-services-9router-start")
    .description("Start 9Router")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/services/9router/start";
      const res = await apiFetch(url, { method: "POST", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("post-api-services-9router-stop")
    .description("Stop 9Router")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/services/9router/stop";
      const res = await apiFetch(url, { method: "POST", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("post-api-services-9router-restart")
    .description("Restart 9Router")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/services/9router/restart";
      const res = await apiFetch(url, { method: "POST", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("post-api-services-9router-update")
    .description("Update 9Router to a newer npm version")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/services/9router/update";
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
  tag.command("post-api-services-9router-rotate-key")
    .description("Rotate the 9Router API key")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/services/9router/rotate-key";
      const res = await apiFetch(url, { method: "POST", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("get-api-services-9router-status")
    .description("Get 9Router status")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/services/9router/status";
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("post-api-services-9router-auto-start")
    .description("Toggle 9Router auto-start")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/services/9router/auto-start";
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
  tag.command("post-api-services-cliproxy-install")
    .description("Install CLIProxyAPI from npm")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/services/cliproxy/install";
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
  tag.command("post-api-services-cliproxy-start")
    .description("Start CLIProxyAPI")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/services/cliproxy/start";
      const res = await apiFetch(url, { method: "POST", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("post-api-services-cliproxy-stop")
    .description("Stop CLIProxyAPI")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/services/cliproxy/stop";
      const res = await apiFetch(url, { method: "POST", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("post-api-services-cliproxy-restart")
    .description("Restart CLIProxyAPI")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/services/cliproxy/restart";
      const res = await apiFetch(url, { method: "POST", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("post-api-services-cliproxy-update")
    .description("Update CLIProxyAPI to a newer npm version")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/services/cliproxy/update";
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
  tag.command("get-api-services-cliproxy-status")
    .description("Get CLIProxyAPI status")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/services/cliproxy/status";
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("post-api-services-cliproxy-auto-start")
    .description("Toggle CLIProxyAPI auto-start")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/services/cliproxy/auto-start";
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
  tag.command("get-api-services-name-logs")
    .description("Stream service logs via SSE")
    .requiredOption("--name <name>", "")
    .option("--tail <tail>", "Number of historical lines to include in the initial snapshot")
    .option("--filter <filter>", "Case-insensitive substring filter applied to log lines. No regex — ReDoS-safe by design.")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/services/{name}/logs";
      url = url.replace("{name}", encodeURIComponent(opts.name ?? ""));
      const qs = new URLSearchParams();
      if (opts.tail != null) qs.set("tail", String(opts.tail));
      if (opts.filter != null) qs.set("filter", String(opts.filter));
      if (qs.toString()) url += "?" + qs.toString();
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
}
