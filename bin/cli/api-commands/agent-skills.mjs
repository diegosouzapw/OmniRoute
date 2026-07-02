// AUTO-GENERATED from docs/openapi.yaml. Do not edit.
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { readFileSync } from "node:fs";

export function register_agent_skills(parent) {
  const tag = parent.command("agent-skills").description("Agent Skills endpoints");
  tag.command("get-api-agent-skills")
    .description("List agent skills catalog")
    .option("--category <category>", "Filter by category (api = REST API skills, cli = CLI skills)")
    .option("--area <area>", "Filter by area slug (e.g. \"providers\", \"models\", \"cli-serve\")")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/agent-skills";
      const qs = new URLSearchParams();
      if (opts.category != null) qs.set("category", String(opts.category));
      if (opts.area != null) qs.set("area", String(opts.area));
      if (qs.toString()) url += "?" + qs.toString();
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("get-api-agent-skills-id-")
    .description("Get a single agent skill")
    .requiredOption("--id <id>", "Canonical skill ID")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/agent-skills/{id}";
      url = url.replace("{id}", encodeURIComponent(opts.id ?? ""));
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("get-api-agent-skills-id-raw")
    .description("Get raw SKILL.md content")
    .requiredOption("--id <id>", "Canonical skill ID")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/agent-skills/{id}/raw";
      url = url.replace("{id}", encodeURIComponent(opts.id ?? ""));
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("get-api-agent-skills-coverage")
    .description("Get SKILL.md coverage stats")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/agent-skills/coverage";
      const res = await apiFetch(url, { method: "GET", baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag.command("post-api-agent-skills-generate")
    .description("Trigger SKILL.md generator")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/agent-skills/generate";
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
