import { NextResponse } from "next/server";
import { z } from "zod";
import { buildWorkContext } from "@/lib/omnicontext/workContext";
import { resolveScope } from "@/lib/omnicontext/scope";
import { getOmniContextSettings } from "@/lib/omnicontext/settings";
import { requireOmniContextApiKeyId } from "../_auth";
import { PROJECT_ID_HEADER, REPO_HEADER, TICKET_HEADER } from "@/lib/omnicontext/types";

const scopeRequestSchema = z.object({
  projectId: z.string().min(1).optional(),
  repo: z.string().trim().min(1).max(500).optional(),
  ticketId: z.string().trim().min(1).max(200).optional(),
  model: z.string().optional(),
});

export async function POST(request: Request) {
  const auth = await requireOmniContextApiKeyId(request);
  if (auth instanceof Response) return auth;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
  }

  const parsed = scopeRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const settings = await getOmniContextSettings();
  const headerBag = new Headers(request.headers);
  if (parsed.data.projectId) headerBag.set(PROJECT_ID_HEADER, parsed.data.projectId);
  if (parsed.data.repo) headerBag.set(REPO_HEADER, parsed.data.repo);
  if (parsed.data.ticketId) headerBag.set(TICKET_HEADER, parsed.data.ticketId);

  const workContext = await buildWorkContext({
    headers: headerBag,
    body: { model: parsed.data.model },
    gitProbeEnabled: settings.gitProbeEnabled,
  });

  const scope = resolveScope({
    headers: headerBag,
    workContext,
    apiKeyId: auth.apiKeyId,
    explicitProjectId: parsed.data.projectId,
  });

  return NextResponse.json({ workContext, scope });
}
