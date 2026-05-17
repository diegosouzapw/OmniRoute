/**
 * API: OpenAPI Spec
 * GET — returns the parsed openapi.yaml as structured JSON catalog
 */

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

let cachedSpec: { data: any; mtime: number } | null = null;
const OPENAPI_SPEC_CANDIDATES = [
  path.join(/* turbopackIgnore: true */ process.cwd(), "docs", "reference", "openapi.yaml"),
  path.join(/* turbopackIgnore: true */ process.cwd(), "app", "docs", "reference", "openapi.yaml"),
  // Legacy locations kept as fallback for old standalone bundles.
  path.join(/* turbopackIgnore: true */ process.cwd(), "docs", "openapi.yaml"),
  path.join(/* turbopackIgnore: true */ process.cwd(), "app", "docs", "openapi.yaml"),
];

export async function GET() {
  try {
    let specPath = "";
    for (const p of OPENAPI_SPEC_CANDIDATES) {
      if (fs.existsSync(p)) {
        specPath = p;
        break;
      }
    }

    if (!specPath) {
      return NextResponse.json({ error: "openapi.yaml not found" }, { status: 404 });
    }

    const stat = fs.statSync(specPath);
    const mtime = stat.mtimeMs;

    // Use cache if file hasn't changed
    if (cachedSpec && cachedSpec.mtime === mtime) {
      return NextResponse.json(cachedSpec.data);
    }

    const content = fs.readFileSync(specPath, "utf-8");
    const raw: any = yaml.load(content);

    // Build a structured catalog
    const catalog: any = {
      info: raw.info || {},
      servers: raw.servers || [],
      tags: Array.isArray(raw.tags) ? raw.tags : [],
      endpoints: [] as any[],
      schemas: Object.keys(raw.components?.schemas || {}),
    };

    // Parse paths into flat endpoint list
    const paths = raw.paths || {};
    for (const [pathStr, methods] of Object.entries(paths as Record<string, any>)) {
      if (!methods || typeof methods !== "object") continue;
      for (const [method, spec] of Object.entries(methods as Record<string, any>)) {
        if (["get", "post", "put", "patch", "delete"].includes(method) && spec) {
          catalog.endpoints.push({
            method: method.toUpperCase(),
            path: pathStr,
            tags: Array.isArray(spec.tags) ? spec.tags : [],
            summary: spec.summary || "",
            description: spec.description || "",
            security: spec.security ? true : false,
            parameters: spec.parameters || [],
            requestBody: spec.requestBody ? true : false,
            responses: Object.keys(spec.responses || {}),
          });
        }
      }
    }

    cachedSpec = { data: catalog, mtime };

    return NextResponse.json(catalog);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to parse OpenAPI spec" },
      { status: 500 }
    );
  }
}
