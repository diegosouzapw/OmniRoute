// AUTO-GENERATED from docs/openapi.yaml. Do not edit.
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { readFileSync } from "node:fs";

export function register_quota(parent) {
  const tag = parent.command("quota").description("Quota endpoints");
  tag.command("get-api-quota-pools")
    .description("List quota pools")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/quota/pools";
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("post-api-quota-pools")
    .description("Create quota pool")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/quota/pools";
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
  tag.command("get-api-quota-pools-id-")
    .description("Get quota pool by ID")
    .requiredOption("--id <id>", "")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/quota/pools/{id}";
      url = url.replace("{id}", encodeURIComponent(opts.id ?? ""));
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("patch-api-quota-pools-id-")
    .description("Update quota pool (name or allocations)")
    .requiredOption("--id <id>", "")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/quota/pools/{id}";
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
  tag.command("delete-api-quota-pools-id-")
    .description("Delete quota pool")
    .requiredOption("--id <id>", "")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/quota/pools/{id}";
      url = url.replace("{id}", encodeURIComponent(opts.id ?? ""));
      const res = await apiFetch(url, { method: "DELETE", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("get-api-quota-pools-id-usage")
    .description("Get pool usage snapshot (per-key consumption + burn rate)")
    .requiredOption("--id <id>", "")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/quota/pools/{id}/usage";
      url = url.replace("{id}", encodeURIComponent(opts.id ?? ""));
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("get-api-quota-plans")
    .description("List resolved provider plans (catalog + manual overrides)")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/quota/plans";
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("get-api-quota-plans-connection-id-")
    .description("Get resolved plan for a connection")
    .requiredOption("--connection-id <connectionId>", "")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/quota/plans/{connectionId}";
      url = url.replace("{connectionId}", encodeURIComponent(opts.connectionId ?? ""));
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("put-api-quota-plans-connection-id-")
    .description("Upsert manual plan override for a connection")
    .requiredOption("--connection-id <connectionId>", "")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/quota/plans/{connectionId}";
      url = url.replace("{connectionId}", encodeURIComponent(opts.connectionId ?? ""));
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
  tag.command("delete-api-quota-plans-connection-id-")
    .description("Delete manual plan override (reverts to catalog/auto)")
    .requiredOption("--connection-id <connectionId>", "")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/quota/plans/{connectionId}";
      url = url.replace("{connectionId}", encodeURIComponent(opts.connectionId ?? ""));
      const res = await apiFetch(url, { method: "DELETE", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("get-api-quota-preview")
    .description("Dry-run quota enforcement check (preview only, no consumption recorded)")
    .requiredOption("--api-key-id <apiKeyId>", "")
    .requiredOption("--pool-id <poolId>", "")
    .option("--estimated-tokens <estimatedTokens>", "")
    .option("--estimated-usd <estimatedUsd>", "")
    .option("--estimated-requests <estimatedRequests>", "")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/quota/preview";
      const qs = new URLSearchParams();
      if (opts.apiKeyId != null) qs.set("apiKeyId", String(opts.apiKeyId));
      if (opts.poolId != null) qs.set("poolId", String(opts.poolId));
      if (opts.estimatedTokens != null) qs.set("estimatedTokens", String(opts.estimatedTokens));
      if (opts.estimatedUsd != null) qs.set("estimatedUsd", String(opts.estimatedUsd));
      if (opts.estimatedRequests != null) qs.set("estimatedRequests", String(opts.estimatedRequests));
      if (qs.toString()) url += "?" + qs.toString();
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
}
