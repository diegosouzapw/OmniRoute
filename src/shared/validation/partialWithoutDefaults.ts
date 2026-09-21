import { z } from "zod";

/**
 * `.partial()` for an update schema, without the creation defaults. zod 4 still applies a
 * field's `.default()` under `.partial()`, so a PATCH that omits the field gets the default
 * back and the merge that follows overwrites the stored value (renaming a disabled rule
 * turned it back on). Unwrapping the defaults first keeps an absent field absent.
 * `.extend()` keeps the source object's unknown-key policy (`.strict()` stays strict), and
 * the parsed type is the one `.partial()` already gives: every field optional.
 */
export function partialWithoutDefaults<Shape extends z.ZodRawShape>(
  schema: z.ZodObject<Shape>
): ReturnType<z.ZodObject<Shape>["partial"]> {
  const unwrapped: Record<string, z.core.$ZodType> = {};
  for (const [key, field] of Object.entries(schema.shape)) {
    if (field instanceof z.ZodDefault) unwrapped[key] = field.unwrap();
  }
  return schema.extend(unwrapped).partial() as ReturnType<z.ZodObject<Shape>["partial"]>;
}
