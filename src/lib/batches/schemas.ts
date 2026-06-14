import { z } from "zod";
import { SUPPORTED_BATCH_ENDPOINTS } from "@/shared/constants/batchEndpoints";
import { BATCH_SUPPORTED_PROVIDERS } from "./types";

export const wizardDestinationSchema = z.object({
  provider: z.enum(BATCH_SUPPORTED_PROVIDERS),
  endpoint: z.enum(SUPPORTED_BATCH_ENDPOINTS),
  model: z.string().min(1).max(128),
});

export const wizardCsvMappingSchema = z
  .record(z.string().max(256), z.string().max(256))
  .refine((m) => Object.values(m).includes("custom_id"), {
    message: "CSV mapping must include a column → custom_id",
  })
  .refine(
    (m) =>
      Object.values(m).some((v) =>
        v.startsWith("body.messages[") || v === "body.input" || v === "body.prompt"
      ),
    { message: "CSV mapping must produce request body content" }
  );

// Used only for client-side parsing — backend keeps using v1BatchCreateSchema.
// Zod 4 note: `.required()` was removed from `defaults`; in Zod 4 it strips
// `.default()` making the field required with no fallback — breaking `method`.
// All non-optional fields are already required by z.object without `.required()`.
export const csvToJsonlInputSchema = z.object({
  csv: z.string().min(1),
  mapping: wizardCsvMappingSchema,
  defaults: z.object({
    model: z.string().min(1),
    method: z.literal("POST").default("POST"),
    url: z.enum(SUPPORTED_BATCH_ENDPOINTS),
  }),
});

export type CsvToJsonlInput = z.infer<typeof csvToJsonlInputSchema>;
