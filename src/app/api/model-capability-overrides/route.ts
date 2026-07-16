import { NextResponse } from "next/server";
import { z } from "zod";
import { resolveProviderAlias } from "@omniroute/open-sse/services/model.ts";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  listModelCapabilityOverrides,
  removeModelCapabilityOverride,
  setModelCapabilityOverride,
  type ModelCapabilityOverrideKey,
} from "@/lib/db/modelCapabilityOverrides";

const overrideKeySchema = z.enum(["max_token"]);

const upsertOverrideSchema = z.object({
  target: z.string().min(3),
  key: overrideKeySchema,
  value: z.coerce.number().int().positive(),
});

function canonicalizeTarget(target: string): string | null {
  const raw = target.trim();
  const slashIndex = raw.indexOf("/");
  if (slashIndex <= 0 || slashIndex === raw.length - 1) return null;

  const provider = raw.slice(0, slashIndex).trim();
  const modelId = raw.slice(slashIndex + 1).trim();
  if (!provider || !modelId) return null;

  return `${resolveProviderAlias(provider) || provider}/${modelId}`;
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  return NextResponse.json({ overrides: listModelCapabilityOverrides() });
}

export async function PATCH(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = upsertOverrideSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  }

  const target = canonicalizeTarget(parsed.data.target);
  if (!target) {
    return NextResponse.json({ error: "Invalid model capability override" }, { status: 400 });
  }

  const written = setModelCapabilityOverride(target, parsed.data.key, parsed.data.value);
  if (!written) {
    return NextResponse.json({ error: "Invalid model capability override" }, { status: 400 });
  }

  return NextResponse.json({ overrides: listModelCapabilityOverrides() });
}

export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const target = canonicalizeTarget(searchParams.get("target") || "");
  const key = searchParams.get("key") || "";
  const parsedKey = overrideKeySchema.safeParse(key);

  if (!target || !parsedKey.success) {
    return NextResponse.json({ error: "target and key are required" }, { status: 400 });
  }

  removeModelCapabilityOverride(target, parsedKey.data as ModelCapabilityOverrideKey);
  return NextResponse.json({ overrides: listModelCapabilityOverrides() });
}
