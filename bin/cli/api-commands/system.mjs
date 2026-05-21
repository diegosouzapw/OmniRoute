// AUTO-GENERATED from docs/reference/openapi.yaml. Do not edit.
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { readFileSync } from "node:fs";

export function register_system(parent) {
  const tag = parent.command("system").description("System endpoints");
  tag
    .command("get-api-v1")
    .description("API v1 root endpoint")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/v1";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-tags")
    .description("List Ollama-compatible model tags")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/tags";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-auth-login")
    .description("Authenticate user")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/auth/login";
      let body;
      if (opts.body) {
        body = opts.body.startsWith("@")
          ? JSON.parse(readFileSync(opts.body.slice(1), "utf8"))
          : JSON.parse(opts.body);
      }
      const res = await apiFetch(url, {
        method: "POST",
        body,
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-auth-logout")
    .description("Log out")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/auth/logout";
      const res = await apiFetch(url, {
        method: "POST",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-init")
    .description("Initialize application")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/init";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-restart")
    .description("Restart the application")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/restart";
      const res = await apiFetch(url, {
        method: "POST",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-shutdown")
    .description("Shutdown the application")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/shutdown";
      const res = await apiFetch(url, {
        method: "POST",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-db-backups")
    .description("List database backups")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/db-backups";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-db-backups")
    .description("Create database backup")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/db-backups";
      const res = await apiFetch(url, {
        method: "POST",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-storage-health")
    .description("Check storage health")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/storage/health";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-sync-cloud")
    .description("Sync with cloud")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/sync/cloud";
      const res = await apiFetch(url, {
        method: "POST",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-sync-initialize")
    .description("Initialize cloud sync")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/sync/initialize";
      const res = await apiFetch(url, {
        method: "POST",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-resilience")
    .description("Get resilience configuration")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/resilience";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("patch-api-resilience")
    .description("Update resilience configuration")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/resilience";
      let body;
      if (opts.body) {
        body = opts.body.startsWith("@")
          ? JSON.parse(readFileSync(opts.body.slice(1), "utf8"))
          : JSON.parse(opts.body);
      }
      const res = await apiFetch(url, {
        method: "PATCH",
        body,
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-resilience-reset")
    .description("Reset circuit breakers")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/resilience/reset";
      const res = await apiFetch(url, {
        method: "POST",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-monitoring-health")
    .description("System health check")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/monitoring/health";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-rate-limits")
    .description("Get per-account rate limit status")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/rate-limits";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-sessions")
    .description("Get active sessions")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/sessions";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-cache")
    .description("Get cache statistics")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/cache";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("delete-api-cache")
    .description("Clear all caches")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/cache";
      const res = await apiFetch(url, {
        method: "DELETE",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-cache-stats")
    .description("Get detailed cache statistics")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/cache/stats";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("delete-api-cache-stats")
    .description("Clear cache statistics")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/cache/stats";
      const res = await apiFetch(url, {
        method: "DELETE",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-evals")
    .description("List eval suites")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/evals";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-evals")
    .description("Run evaluation")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/evals";
      let body;
      if (opts.body) {
        body = opts.body.startsWith("@")
          ? JSON.parse(readFileSync(opts.body.slice(1), "utf8"))
          : JSON.parse(opts.body);
      }
      const res = await apiFetch(url, {
        method: "POST",
        body,
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-evals-suite-id-")
    .description("Get eval suite details")
    .requiredOption("--suite-id <suiteId>", "")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/evals/{suiteId}";
      url = url.replace("{suiteId}", encodeURIComponent(opts.suiteId ?? ""));
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-policies")
    .description("List routing policies")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/policies";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-policies")
    .description("Create routing policy")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/policies";
      let body;
      if (opts.body) {
        body = opts.body.startsWith("@")
          ? JSON.parse(readFileSync(opts.body.slice(1), "utf8"))
          : JSON.parse(opts.body);
      }
      const res = await apiFetch(url, {
        method: "POST",
        body,
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("delete-api-policies")
    .description("Delete routing policy")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/policies";
      const res = await apiFetch(url, {
        method: "DELETE",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-compliance-audit-log")
    .description("Get compliance audit log")
    .option("--limit <limit>", "")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/compliance/audit-log";
      const qs = new URLSearchParams();
      if (opts.limit != null) qs.set("limit", String(opts.limit));
      if (qs.toString()) url += "?" + qs.toString();
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-openapi-spec")
    .description("Get OpenAPI specification catalog")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/openapi/spec";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
}
