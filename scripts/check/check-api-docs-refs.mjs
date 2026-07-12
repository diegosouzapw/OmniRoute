#!/usr/bin/env node
/**
 * Combined anti-hallucination gate: OpenAPI paths + docs prose /api refs.
 *
 * Existence reasons (both still enforced):
 * - openapi-routes: invented/obsolete paths in docs/openapi.yaml
 * - docs-symbols: invented/obsolete /api paths in docs markdown *
 * Shared walk of src/app/api (lib/apiRoutes.mjs) — one filesystem inventory,
 * two independent failure messages. Prefer this on docs-gates CI; individual
 * scripts remain for targeted local runs.
 */
import { pathToFileURL } from "node:url";
import { collectApiRouteFiles, collectApiRouteUrlPaths } from "./lib/apiRoutes.mjs";
import { runOpenapiRoutesCheck } from "./check-openapi-routes.mjs";
import { runDocsSymbolsCheck } from "./check-docs-symbols.mjs";

function main() {
  const implPaths = collectApiRouteUrlPaths();
  const routeFiles = collectApiRouteFiles();

  const openapi = runOpenapiRoutesCheck({ implPaths });
  const docs = runDocsSymbolsCheck({ routeFiles });

  if (openapi.ok) console.log(openapi.message);
  else console.error(openapi.message);
  if (docs.ok) console.log(docs.message);
  else console.error(docs.message);

  process.exit(openapi.ok && docs.ok ? 0 : 1);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
