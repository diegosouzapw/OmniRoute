import { NextResponse } from "next/server";
import { z } from "zod";
import { skillRegistry } from "@/lib/skills/registry";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

const installManifestSchema = z.object({
  name: z.string().min(1).max(100),
  version: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/, "Version must be semver (e.g. 1.0.0)")
    .default("1.0.0"),
  description: z.string().max(500),
  schema: z.object({
    input: z.record(z.string(), z.unknown()).default({}),
    output: z.record(z.string(), z.unknown()).default({}),
  }),
  handlerCode: z.string().min(1).max(50000),
  apiKeyId: z.string().min(1).optional(),
});

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const rawBody = await request.json();
    const validation = validateBody(installManifestSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(validation.error, { status: 400 });
    }

    const { name, version, description, schema, handlerCode, apiKeyId } = validation.data;

    const skill = await skillRegistry.register({
      name,
      version,
      description,
      schema: { input: schema.input, output: schema.output },
      handler: handlerCode,
      apiKeyId: apiKeyId || "system",
      enabled: true,
    });

    return NextResponse.json({ success: true, id: skill.id });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}
