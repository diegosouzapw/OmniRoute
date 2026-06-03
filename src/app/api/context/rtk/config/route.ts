import { NextResponse } from "next/server";
import { getCompressionSettings, updateCompressionSettings } from "@/lib/db/compression";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { rtkConfigSchema } from "@/shared/validation/compressionConfigSchemas";

export { rtkConfigSchema };

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const settings = await getCompressionSettings();
  return NextResponse.json(settings.rtkConfig);
}

export async function PUT(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const validation = validateBody(rtkConfigSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }
  const current = await getCompressionSettings();
  const settings = await updateCompressionSettings({
    rtkConfig: { ...current.rtkConfig, ...validation.data },
  });
  return NextResponse.json(settings.rtkConfig);
}
