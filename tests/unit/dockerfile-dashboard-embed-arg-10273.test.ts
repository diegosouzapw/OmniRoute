/**
 * #10273 — `DASHBOARD_ALLOW_EMBED=vscode` relaxes the dashboard's CSP
 * `frame-ancestors` so the VS Code Simple Browser (the OmniCopilot extension's
 * `dashboardOpen: "editor"` mode) can render it. next.config.mjs reads the
 * variable while the bundle is built and Next.js compiles the result into the
 * route manifest, so the policy is frozen at build time.
 *
 * The Dockerfile therefore has to expose it as a build argument. Without an
 * `ARG`, `docker build --build-arg DASHBOARD_ALLOW_EMBED=vscode` is silently
 * dropped by Docker and the operator gets the default (unframable) image with
 * no error — the same class of failure #6700's `OMNIROUTE_USE_TURBOPACK` note
 * documents for a bare `ENV`.
 *
 * Guarded here rather than in a real `docker build`, which this sandbox cannot
 * run: the assertions pin the mechanism (declared as ARG+ENV, inside the
 * builder stage, before the build step) and that the runner stage does NOT
 * carry the variable — a runtime value would advertise an effect it cannot
 * have.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const lines = fs.readFileSync(path.join(repoRoot, "Dockerfile"), "utf-8").split("\n");

/** Line indices bounding a named stage: its FROM up to the next FROM. */
function stageRange(name: string): { start: number; end: number } {
  const start = lines.findIndex((l) =>
    new RegExp(`^FROM\\s+\\S+\\s+AS\\s+${name}\\b`, "i").test(l.trim())
  );
  assert.ok(start >= 0, `Dockerfile must declare a \`${name}\` stage`);
  const after = lines.slice(start + 1).findIndex((l) => /^FROM\s+/i.test(l.trim()));
  return { start, end: after === -1 ? lines.length : start + 1 + after };
}

test("#10273 the builder stage exposes DASHBOARD_ALLOW_EMBED as a build arg", () => {
  const { start, end } = stageRange("builder");
  const stage = lines.slice(start, end);

  const argIdx = stage.findIndex((l) => /^ARG\s+DASHBOARD_ALLOW_EMBED\b/.test(l.trim()));
  assert.ok(
    argIdx >= 0,
    "builder stage must declare `ARG DASHBOARD_ALLOW_EMBED` — without it, " +
      "`docker build --build-arg DASHBOARD_ALLOW_EMBED=vscode` is silently ignored"
  );

  // ARG alone is not visible to the build process; it has to be promoted to ENV,
  // and the ENV must come from the ARG (a bare `ENV X=vscode` would shadow it).
  const envIdx = stage.findIndex((l) =>
    /^ENV\s+DASHBOARD_ALLOW_EMBED=\$\{?DASHBOARD_ALLOW_EMBED\}?\s*$/.test(l.trim())
  );
  assert.ok(envIdx > argIdx, "ARG must be promoted to ENV from the ARG value, after the ARG");

  // It only has an effect if it is set before `next build` runs.
  // The build command sits inside a multi-line RUN block, so match the line itself.
  const buildIdx = stage.findIndex((l) => /\bnpm run build\b/.test(l));
  assert.ok(buildIdx > envIdx, "DASHBOARD_ALLOW_EMBED must be set before the build step");
});

test("#10273 the default is empty, so images stay unframable unless asked", () => {
  const { start, end } = stageRange("builder");
  const arg = lines.slice(start, end).find((l) => /^ARG\s+DASHBOARD_ALLOW_EMBED\b/.test(l.trim()));
  assert.match(
    String(arg).trim(),
    /^ARG\s+DASHBOARD_ALLOW_EMBED=(""|'')$/,
    "the build arg must default to empty — embedding is opt-in (Hard Rule: default posture unchanged)"
  );
});

test("#10273 no runtime stage carries DASHBOARD_ALLOW_EMBED", () => {
  const { end } = stageRange("builder");
  const afterBuilder = lines.slice(end).join("\n");
  assert.doesNotMatch(
    afterBuilder,
    /^\s*(ENV|ARG)\s+DASHBOARD_ALLOW_EMBED\b/m,
    "the runtime stages (runner-base / runner-web / runner-cli) must not set it: the " +
      "headers are already baked, so a runtime value would advertise an effect it cannot have"
  );
});
