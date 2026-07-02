/**
 * zodToTsSignature — converts a Zod v4 object schema into a compact one-line
 * TypeScript function signature string. Never throws.
 *
 * Example output: `omniroute_tool_search(args: { query: string; limit?: number })`
 */

type ZodLike = { type?: string; _def?: Record<string, unknown>; shape?: Record<string, ZodLike> };

function unwrap(field: ZodLike): ZodLike {
  const t = field.type ?? (field._def as Record<string, unknown> | undefined)?.type;
  if (t === "optional" || t === "default" || t === "nullable") {
    const inner = (field._def as Record<string, unknown> | undefined)?.innerType;
    if (inner && typeof inner === "object") return unwrap(inner as ZodLike);
  }
  return field;
}

function isOptional(field: ZodLike): boolean {
  const t = field.type ?? (field._def as Record<string, unknown> | undefined)?.type;
  return t === "optional";
}

function zodTypeToTs(field: ZodLike, depth = 0): string {
  const core = unwrap(field);
  const t = core.type ?? (core._def as Record<string, unknown> | undefined)?.type;

  if (t === "string") return "string";
  if (t === "number") return "number";
  if (t === "boolean") return "boolean";
  if (t === "enum") {
    const entries = (core._def as Record<string, unknown> | undefined)?.entries;
    if (entries && typeof entries === "object") {
      const vals = Object.keys(entries as Record<string, unknown>);
      return vals.map((v) => `'${v}'`).join(" | ");
    }
    return "string";
  }
  if (t === "array") {
    const element = (core._def as Record<string, unknown> | undefined)?.element;
    if (element && typeof element === "object") {
      return `${zodTypeToTs(element as ZodLike, depth)}[]`;
    }
    return "unknown[]";
  }
  if (t === "object" && depth < 2) {
    const shape =
      core.shape ?? ((core._def as Record<string, unknown> | undefined)?.shape as Record<string, ZodLike> | undefined);
    if (shape && typeof shape === "object") {
      const fields = Object.entries(shape)
        .map(([k, v]) => {
          const opt = isOptional(v as ZodLike) ? "?" : "";
          return `${k}${opt}: ${zodTypeToTs(v as ZodLike, depth + 1)}`;
        })
        .join("; ");
      return `{ ${fields} }`;
    }
  }
  return "unknown";
}

/**
 * Converts `name` + optional Zod object schema into a one-line TS signature.
 * Falls back to `name(args: object)` on introspection errors.
 */
export function zodToTsSignature(name: string, inputSchema?: unknown): string {
  if (!inputSchema) return `${name}()`;

  try {
    const schema = inputSchema as ZodLike;
    const t = schema.type ?? (schema._def as Record<string, unknown> | undefined)?.type;
    if (t !== "object") return `${name}()`;

    const shape =
      schema.shape ??
      ((schema._def as Record<string, unknown> | undefined)?.shape as Record<string, ZodLike> | undefined);
    if (!shape || typeof shape !== "object" || Object.keys(shape).length === 0) {
      return `${name}()`;
    }

    const fields = Object.entries(shape)
      .map(([k, v]) => {
        const opt = isOptional(v as ZodLike) ? "?" : "";
        return `${k}${opt}: ${zodTypeToTs(v as ZodLike)}`;
      })
      .join("; ");

    return `${name}(args: { ${fields} })`;
  } catch {
    return `${name}(args: object)`;
  }
}
