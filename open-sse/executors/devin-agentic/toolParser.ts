import { createHash } from "node:crypto";
import { asRecord, DevinAgenticBridgeError, type AnthropicTool, type JsonRecord } from "./types.ts";

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map((item) => stableJson(item)).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.entries(value as JsonRecord)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, val]) => `${JSON.stringify(key)}:${stableJson(val)}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function typeOf(value: unknown): string {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

function validateSchema(value: unknown, schema: JsonRecord, path: string): string[] {
  const errors: string[] = [];
  const expectedType = schema.type;
  if (typeof expectedType === "string") {
    const actual = typeOf(value);
    if (expectedType === "integer") {
      if (!Number.isInteger(value)) errors.push(`${path} must be integer`);
    } else if (actual !== expectedType) {
      errors.push(`${path} must be ${expectedType}, got ${actual}`);
    }
  }

  if (Array.isArray(schema.enum) && !schema.enum.some((item) => item === value)) {
    errors.push(
      `${path} must be one of ${schema.enum.map((item) => JSON.stringify(item)).join(", ")}`
    );
  }

  if (schema.type === "object" || (value && typeof value === "object" && !Array.isArray(value))) {
    const record = asRecord(value);
    const required = Array.isArray(schema.required) ? schema.required.map(String) : [];
    for (const key of required) {
      if (!(key in record)) errors.push(`${path}.${key} is required`);
    }

    const properties = asRecord(schema.properties);
    for (const [key, propSchema] of Object.entries(properties)) {
      if (key in record)
        errors.push(...validateSchema(record[key], asRecord(propSchema), `${path}.${key}`));
    }

    if (schema.additionalProperties === false) {
      for (const key of Object.keys(record)) {
        if (!(key in properties)) errors.push(`${path}.${key} is not allowed`);
      }
    }
  }

  if (Array.isArray(value) && schema.items) {
    const itemSchema = asRecord(schema.items);
    value.forEach((item, index) =>
      errors.push(...validateSchema(item, itemSchema, `${path}[${index}]`))
    );
  }

  return errors;
}

export function parseDevinToolRequest(text: string, tools: AnthropicTool[], idSeed = "") {
  const matches = [...text.matchAll(/<tool>\s*([\s\S]*?)\s*<\/tool>/g)];
  if (matches.length === 0) return null;
  if (matches.length > 1) {
    throw new DevinAgenticBridgeError(
      "Devin response contained more than one tool request; parallel tool use is not supported",
      "multiple_tool_requests"
    );
  }

  if (text.trim() !== matches[0][0].trim()) {
    throw new DevinAgenticBridgeError(
      "Devin tool request must be a standalone tool envelope without narrative text",
      "mixed_tool_narrative"
    );
  }

  let payload: JsonRecord;
  try {
    payload = asRecord(JSON.parse(matches[0][1] || "{}"));
  } catch {
    throw new DevinAgenticBridgeError("Devin tool request was not valid JSON", "invalid_tool_json");
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  if (!name)
    throw new DevinAgenticBridgeError("Devin tool request is missing name", "missing_tool_name");

  const tool = tools.find((candidate) => candidate.name === name);
  if (!tool) {
    throw new DevinAgenticBridgeError(`Devin requested unknown tool: ${name}`, "unknown_tool");
  }

  const input = asRecord(payload.arguments);
  const schema = tool.input_schema || { type: "object", properties: {} };
  const errors = validateSchema(input, schema, "arguments");
  if (errors.length > 0) {
    throw new DevinAgenticBridgeError(
      `Devin tool arguments failed schema validation: ${errors.join("; ")}`,
      "invalid_tool_arguments"
    );
  }

  const digest = createHash("sha256")
    .update(`${idSeed}:${name}:${stableJson(input)}`)
    .digest("hex")
    .slice(0, 16);
  return { id: `tool_devin_${digest}`, name, input };
}
