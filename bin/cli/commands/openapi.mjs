import { readFileSync, writeFileSync } from "node:fs";
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

function truncate(v, max = 40) {
  if (!v) return "-";
  const s = String(v);
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

function toYaml(obj, indent = 0) {
  const pad = "  ".repeat(indent);
  if (obj === null || obj === undefined) return "null";
  if (typeof obj === "boolean") return String(obj);
  if (typeof obj === "number") return String(obj);
  if (typeof obj === "string") {
    if (/[\n:#{}[\],&*?|<>=!%@`]/.test(obj) || obj.trim() !== obj) {
      return JSON.stringify(obj);
    }
    return obj || '""';
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    return obj.map((v) => `\n${pad}- ${toYaml(v, indent + 1)}`).join("");
  }
  const entries = Object.entries(obj);
  if (entries.length === 0) return "{}";
  return entries
    .map(([k, v]) => {
      const safeKey = /[^a-zA-Z0-9_-]/.test(k) ? JSON.stringify(k) : k;
      if (v !== null && typeof v === "object") {
        const nested = toYaml(v, indent + 1);
        if (Array.isArray(v) && v.length > 0) return `\n${pad}${safeKey}:${nested}`;
        if (!Array.isArray(v) && Object.keys(v).length > 0) return `\n${pad}${safeKey}:\n${nested}`;
        return `\n${pad}${safeKey}: ${nested}`;
      }
      return `\n${pad}${safeKey}: ${toYaml(v, indent + 1)}`;
    })
    .join("")
    .trimStart();
}

function validateBasic(spec) {
  if (!spec || typeof spec !== "object") throw new Error("spec is not an object");
  if (!spec.openapi && !spec.swagger) throw new Error("missing openapi/swagger version field");
  if (!spec.info) throw new Error("missing info object");
  if (!spec.paths) throw new Error("missing paths object");
}

const endpointSchema = [
  { key: "method", header: "Method", width: 8 },
  { key: "path", header: "Path", width: 45 },
  { key: "operationId", header: "Operation ID", width: 25 },
  { key: "summary", header: "Summary", width: 40, formatter: (v) => truncate(v, 40) },
];

export function registerOpenapi(program) {
  const api = program.command("openapi").description(t("openapi.description"));

  api
    .command("dump")
    .description(t("openapi.dump.description"))
    .option("--format <f>", t("openapi.dump.format"), "yaml")
    .option("--out <path>", t("openapi.dump.out"))
    .action(async (opts, cmd) => {
      const res = await apiFetch("/api/openapi/spec");
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      const serialized =
        opts.format === "yaml" ? toYaml(data) + "\n" : JSON.stringify(data, null, 2);
      if (opts.out) {
        writeFileSync(opts.out, serialized);
        process.stdout.write(`Saved to ${opts.out}\n`);
      } else {
        process.stdout.write(serialized);
      }
    });

  api
    .command("validate")
    .description(t("openapi.validate.description"))
    .action(async (opts, cmd) => {
      const res = await apiFetch("/api/openapi/spec");
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const spec = await res.json();
      try {
        validateBasic(spec);
        process.stdout.write("Spec is valid\n");
      } catch (err) {
        process.stderr.write(`Invalid: ${err.message}\n`);
        process.exit(1);
      }
    });

  api
    .command("try <path>")
    .description(t("openapi.try.description"))
    .option("--method <m>", t("openapi.try.method"), "GET")
    .option("--body <file>", t("openapi.try.body"))
    .option("--query <kv>", t("openapi.try.query"), (v, prev = []) => [...prev, v.split("=")], [])
    .option("--header <kv>", t("openapi.try.header"), (v, prev = []) => [...prev, v.split("=")], [])
    .action(async (path, opts, cmd) => {
      const body = opts.body ? JSON.parse(readFileSync(opts.body, "utf8")) : undefined;
      const query = Object.fromEntries(opts.query ?? []);
      const headers = Object.fromEntries(opts.header ?? []);
      const res = await apiFetch("/api/openapi/try", {
        method: "POST",
        body: { path, method: opts.method, body, query, headers },
      });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  api
    .command("endpoints")
    .description(t("openapi.endpoints.description"))
    .option("--search <q>", t("openapi.endpoints.search"))
    .action(async (opts, cmd) => {
      const res = await apiFetch("/api/openapi/spec");
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const spec = await res.json();
      const rows = [];
      for (const [path, methods] of Object.entries(spec.paths ?? {})) {
        for (const [method, def] of Object.entries(methods)) {
          if (["parameters", "summary"].includes(method)) continue;
          const summary = def.summary ?? def.description ?? "";
          if (
            opts.search &&
            !path.includes(opts.search) &&
            !summary.toLowerCase().includes(opts.search.toLowerCase())
          )
            continue;
          rows.push({ method: method.toUpperCase(), path, summary, operationId: def.operationId });
        }
      }
      emit(rows, cmd.optsWithGlobals(), endpointSchema);
    });

  api
    .command("paths")
    .description(t("openapi.paths.description"))
    .action(async (opts, cmd) => {
      const res = await apiFetch("/api/openapi/spec");
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const spec = await res.json();
      const paths = Object.keys(spec.paths ?? {}).sort();
      emit(
        paths.map((p) => ({ path: p })),
        cmd.optsWithGlobals()
      );
    });
}
