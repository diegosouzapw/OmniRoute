import { z } from "zod";
import {
  GROK_47_CONTEXTS,
  GROK_47_EFFORTS,
  cursorGrok47Variant,
} from "@omniroute/open-sse/config/providers/registry/cursor/grok47.ts";

const parameterSchema = z.object({ id: z.string(), value: z.string() });
const variantSchema = z.object({
  params: z.array(parameterSchema).length(3),
  isDefault: z.boolean().optional(),
  disabled: z.boolean().optional(),
  blockedByAdminAllowlist: z.boolean().optional(),
  blocked_by_admin_allowlist: z.boolean().optional(),
});
const valuesSchema = z
  .object({
    context: z.enum(["256k", "500k"]),
    reasoning_effort: z.enum(GROK_47_EFFORTS),
    fast: z.enum(["false", "true"]),
  })
  .strict();
const catalogSchema = z.object({ id: z.literal("grok-4.7"), variants: z.array(z.unknown()) });

function parseVariant(value: unknown) {
  const parsed = variantSchema.safeParse(value);
  if (!parsed.success) return null;
  const variant = parsed.data;
  if (variant.disabled || variant.blockedByAdminAllowlist || variant.blocked_by_admin_allowlist)
    return null;
  const values = valuesSchema.safeParse(
    Object.fromEntries(variant.params.map(({ id, value }) => [id, value]))
  );
  if (!values.success) return null;
  const { context, reasoning_effort: effort, fast } = values.data;
  return {
    ...cursorGrok47Variant(context, effort, fast === "true"),
    owned_by: "cursor" as const,
    effort,
    isDefault: variant.isDefault === true,
  };
}

/** Preserve only declared variants; omitted/admin-blocked combinations stay absent. */
export function cursorGrok47Catalog(value: unknown) {
  const parsed = catalogSchema.safeParse(value);
  if (!parsed.success) return null;
  const variants = parsed.data.variants.map(parseVariant).filter((variant) => variant !== null);
  const selected = variants.find((variant) => variant.isDefault) ?? variants[0];
  return {
    variants,
    contextLength: selected?.contextLength ?? GROK_47_CONTEXTS["256k"],
    supportedThinkingEfforts: [...new Set(variants.map((variant) => variant.effort))],
  };
}
