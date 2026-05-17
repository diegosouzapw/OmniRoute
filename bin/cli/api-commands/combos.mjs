// AUTO-GENERATED from docs/reference/openapi.yaml. Do not edit.
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { readFileSync } from "node:fs";

export function register_combos(parent) {
  const tag = parent.command("combos").description("Combos endpoints");
  tag
    .command("get-api-combos")
    .description("List routing combos")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/combos";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-combos")
    .description("Create routing combo")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/combos";
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
    .command("patch-api-combos-id-")
    .description("Update combo")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/combos/{id}";
      const res = await apiFetch(url, {
        method: "PATCH",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("delete-api-combos-id-")
    .description("Delete combo")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/combos/{id}";
      const res = await apiFetch(url, {
        method: "DELETE",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-combos-metrics")
    .description("Get combo metrics")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/combos/metrics";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-combos-test")
    .description("Test a combo configuration")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/combos/test";
      const res = await apiFetch(url, {
        method: "POST",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
}
