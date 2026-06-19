/**
 * API: OpenAPI Spec
 * GET — returns the parsed openapi.yaml as structured JSON catalog
 */

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

let cachedSpec: { data: any; mtime: number } | null = null;
const OPENAPI_SPEC_CANDIDATES = [
  path.join(/* turbopackIgnore: true */ process.cwd(), "docs", "reference", "openapi.yaml"),
  path.join(/* turbopackIgnore: true */ process.cwd(), "app", "docs", "reference", "openapi.yaml"),
  // Legacy locations kept as fallback for old standalone bundles.
  path.join(/* turbopackIgnore: true */ process.cwd(), "docs", "openapi.yaml"),
  path.join(/* turbopackIgnore: true */ process.cwd(), "app", "docs", "openapi.yaml"),
];

/**
 * Generate example value from OpenAPI schema.
 *
 * Exported for unit testing: the dashboard "Try It" panel pre-fills request
 * bodies from this. Bounded to depth 3 to prevent infinite recursion on
 * self-referential `$ref` schemas.
 */
export function generateExampleFromSchema(
  schema: any,
  components: any,
  depth = 0,
  propertyName = ""
): any {
  if (!schema || depth > 3) return null; // Prevent infinite recursion

  // Use example if provided
  if (schema.example !== undefined) return schema.example;
  if (schema.default !== undefined) return schema.default;
  if (Array.isArray(schema.oneOf) && schema.oneOf.length > 0) {
    return generateExampleFromSchema(schema.oneOf[0], components, depth + 1, propertyName);
  }
  if (Array.isArray(schema.anyOf) && schema.anyOf.length > 0) {
    return generateExampleFromSchema(schema.anyOf[0], components, depth + 1, propertyName);
  }
  if (Array.isArray(schema.allOf) && schema.allOf.length > 0) {
    return schema.allOf.reduce((acc: any, item: any) => {
      const value = generateExampleFromSchema(item, components, depth + 1, propertyName);
      return value && typeof value === "object" && !Array.isArray(value)
        ? { ...acc, ...value }
        : acc;
    }, {});
  }

  // Handle $ref
  if (schema.$ref) {
    const refPath = schema.$ref.replace("#/components/schemas/", "");
    return generateExampleFromSchema(components[refPath], components, depth + 1, propertyName);
  }

  // Handle type
  switch (schema.type) {
    case "string":
      if (schema.enum) return schema.enum[0];
      if (schema.format === "date-time") return "2024-01-01T00:00:00Z";
      if (schema.format === "email") return "user@example.com";
      if (schema.format === "uri") return "https://example.com";
      if (/model/i.test(propertyName)) return "openai/gpt-4o";
      if (/prompt/i.test(propertyName)) return "Write a function to sort an array";
      if (/system/i.test(propertyName)) return "You are a concise, helpful assistant.";
      if (/query/i.test(propertyName)) return "What is the capital of France?";
      if (/input|text|content/i.test(propertyName)) return "Sample text";
      if (/provider/i.test(propertyName)) return "openai";
      if (/url/i.test(propertyName)) return "https://example.com";
      return "string";

    case "number":
    case "integer":
      return schema.default !== undefined ? schema.default : schema.minimum || 0;

    case "boolean":
      return schema.default !== undefined ? schema.default : false;

    case "array":
      if (schema.items) {
        const item = generateExampleFromSchema(schema.items, components, depth + 1, propertyName);
        return item ? [item] : [];
      }
      return [];

    case "object":
      const obj: any = {};
      if (schema.properties) {
        const required = schema.required || [];
        // Include required fields + first 3 optional fields
        const propsToInclude = [
          ...required,
          ...Object.keys(schema.properties)
            .filter((k) => !required.includes(k))
            .slice(0, 3),
        ];

        for (const key of propsToInclude) {
          const propSchema = schema.properties[key];
          obj[key] = generateExampleFromSchema(propSchema, components, depth + 1, key);
        }
      }
      return obj;

    default:
      return null;
  }
}

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
          // Extract example from request body schema if available
          let exampleBody: any = null;
          const jsonBody = spec.requestBody?.content?.["application/json"];
          if (jsonBody?.example !== undefined) {
            exampleBody = jsonBody.example;
          } else if (jsonBody?.examples && typeof jsonBody.examples === "object") {
            const firstExample = Object.values(jsonBody.examples)[0] as any;
            exampleBody = firstExample?.value ?? firstExample;
          } else if (jsonBody?.schema) {
            exampleBody = generateExampleFromSchema(jsonBody.schema, raw.components?.schemas || {});
          }

          catalog.endpoints.push({
            method: method.toUpperCase(),
            path: pathStr,
            tags: Array.isArray(spec.tags) ? spec.tags : [],
            summary: spec.summary || "",
            description: spec.description || "",
            security: spec.security ? true : false,
            parameters: spec.parameters || [],
            requestBody: spec.requestBody ? true : false,
            exampleBody,
            responses: Object.keys(spec.responses || {}),
            loopbackOnly: spec["x-loopback-only"] === true,
            alwaysProtected: spec["x-always-protected"] === true,
            internal: spec["x-internal"] === true,
          });
        }
      }
    }

    cachedSpec = { data: catalog, mtime };

    return NextResponse.json(catalog);
  } catch (error: any) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(error) || "Failed to parse OpenAPI spec" },
      { status: 500 }
    );
  }
}
