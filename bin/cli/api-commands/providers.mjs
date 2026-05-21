// AUTO-GENERATED from docs/reference/openapi.yaml. Do not edit.
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { readFileSync } from "node:fs";

export function register_providers(parent) {
  const tag = parent.command("providers").description("Providers endpoints");
  tag
    .command("get-api-providers")
    .description("List provider connections")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/providers";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-providers")
    .description("Create provider connection")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/providers";
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
    .command("get-api-providers-id-")
    .description("Get provider connection")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/providers/{id}";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("patch-api-providers-id-")
    .description("Update provider connection")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/providers/{id}";
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
    .command("delete-api-providers-id-")
    .description("Delete provider connection")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/providers/{id}";
      const res = await apiFetch(url, {
        method: "DELETE",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-providers-id-test")
    .description("Test provider connection")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/providers/{id}/test";
      const res = await apiFetch(url, {
        method: "POST",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-providers-id-models")
    .description("List models for a provider")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/providers/{id}/models";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-providers-test-batch")
    .description("Test multiple providers at once")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/providers/test-batch";
      const res = await apiFetch(url, {
        method: "POST",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-providers-validate")
    .description("Validate provider credentials")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/providers/validate";
      const res = await apiFetch(url, {
        method: "POST",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-providers-client")
    .description("Get client-side provider info")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/providers/client";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
}
