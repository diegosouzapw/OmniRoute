import { getApiKeyMetadata } from "@/lib/db/apiKeys";
import {
  cancelQuotaRecoveryTicket,
  getQuotaRecoveryTicket,
  readQuotaRecoveryResult,
} from "@/lib/db/quotaRecoveryTickets";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { CORS_HEADERS } from "@/shared/utils/cors";

type RouteContext = { params: Promise<{ id: string }> };

async function principal(request: Request): Promise<string | null> {
  const apiKey = extractApiKey(request, { allowUrl: false });
  if (!apiKey || !(await isValidApiKey(apiKey))) return null;
  const metadata = await getApiKeyMetadata(apiKey);
  if (!metadata?.id || metadata.isActive === false || metadata.isBanned === true) return null;
  if (metadata.expiresAt && Date.now() > Date.parse(metadata.expiresAt)) return null;
  return metadata.id;
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function GET(request: Request, context: RouteContext): Promise<Response> {
  const apiKeyId = await principal(request);
  if (!apiKeyId) return json({ error: "Unauthorized" }, 401);
  const { id } = await context.params;
  const ticket = getQuotaRecoveryTicket(id, apiKeyId);
  if (!ticket) return json({ error: "Recovery ticket not found" }, 404);
  if (ticket.state === "completed") {
    const result = readQuotaRecoveryResult(id, apiKeyId);
    if (result === null) return json({ error: "Recovered response unavailable" }, 500);
    return new Response(result, {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json",
        "X-OmniRoute-Recovery-State": "completed",
      },
    });
  }
  return json(
    { recovery: ticket },
    ticket.state === "pending" || ticket.state === "running" ? 202 : 200
  );
}

export async function DELETE(request: Request, context: RouteContext): Promise<Response> {
  const apiKeyId = await principal(request);
  if (!apiKeyId) return json({ error: "Unauthorized" }, 401);
  const { id } = await context.params;
  if (!getQuotaRecoveryTicket(id, apiKeyId))
    return json({ error: "Recovery ticket not found" }, 404);
  if (!cancelQuotaRecoveryTicket(id, apiKeyId)) {
    return json({ error: "Only pending or confirmation-required tickets can be cancelled" }, 409);
  }
  return json({ recovery: { id, state: "cancelled" } }, 200);
}
