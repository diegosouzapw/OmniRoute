// AUTO-GENERATED from docs/reference/openapi.yaml. Do not edit.
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { readFileSync } from "node:fs";

export function register_telemetry(parent) {
  const tag = parent.command("telemetry").description("Telemetry endpoints");
  tag
    .command("get-api-telemetry-summary")
    .description("Get telemetry summary")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/telemetry/summary";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-token-health")
    .description("Get token health status")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/token-health";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
}
