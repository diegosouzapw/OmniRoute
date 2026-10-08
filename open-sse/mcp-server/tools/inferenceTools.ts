/**
 * Inference-surface MCP tool handlers: route a chat request, report cost, list
 * the models catalog.
 *
 * #15159 M-01 — "file = register + wrap. handle* -> tools/canonical/*.ts".
 *
 * Extracted verbatim from `server.ts`; no behavioural change. See the header of
 * `opsTools.ts` for why the handlers are grouped by surface and why the imports
 * must stay strictly downward.
 *
 * Note `handleRouteRequest`'s explicit `mcpFetchTimeoutSignal("upstream")`: this
 * hop waits on an upstream provider (and on auto-combo candidate probing before
 * one is even chosen), so it must not inherit the management-read budget the
 * shared hop defaults to. #9717 was filed for exactly that confusion.
 */

import { logToolCall } from "../audit.ts";
import { analyticsRangeForPeriod, readAnalyticsTotals } from "../analyticsShape.ts";
import { getMcpModelsCatalog } from "../catalog.ts";
import { toArray, toFiniteNumber, toRecord, toString, type JsonRecord } from "../coercions.ts";
import { toSafeMcpErrorMessage } from "../errorMessage.ts";
import { mcpFetchTimeoutSignal } from "../fetchTimeout.ts";
import { omniRouteFetch } from "../internalFetch.ts";

export async function handleRouteRequest(args: {
  model: string;
  messages: Array<{ role: string; content: string }>;
  combo?: string;
  budget?: number;
  role?: string;
  stream?: boolean;
}) {
  const start = Date.now();
  try {
    const body: Record<string, unknown> = {
      model: args.model,
      messages: args.messages,
      stream: false, // MCP tool always returns non-streaming
    };
    if (args.combo) {
      body["x-combo"] = args.combo;
    }

    const raw = (await omniRouteFetch("/v1/chat/completions", {
      method: "POST",
      body: JSON.stringify(body),
      // #9717: this hop waits on an upstream provider (and on auto-combo
      // candidate probing before one is even chosen), so it must not inherit
      // the management-read budget.
      signal: mcpFetchTimeoutSignal("upstream"),
    })) as JsonRecord;
    const choices = toArray(raw.choices);
    const firstChoice = toRecord(choices[0]);
    const firstMessage = toRecord(firstChoice.message);
    const usage = toRecord(raw.usage);

    const result = {
      response: {
        content: toString(firstMessage.content, ""),
        model: toString(raw.model, args.model),
        tokens: {
          prompt: toFiniteNumber(usage.prompt_tokens, 0),
          completion: toFiniteNumber(usage.completion_tokens, 0),
        },
      },
      routing: {
        provider: toString(raw.provider, "unknown"),
        combo: raw.combo ?? null,
        fallbacksTriggered: toFiniteNumber(raw.fallbacksTriggered, 0),
        cost: toFiniteNumber(raw.cost, 0),
        latencyMs: Date.now() - start,
        routingExplanation: toString(
          raw.routingExplanation,
          "Request routed through primary provider"
        ),
      },
    };

    await logToolCall(
      "omniroute_route_request",
      { model: args.model, messageCount: args.messages.length },
      result.routing,
      Date.now() - start,
      true
    );
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = toSafeMcpErrorMessage(err);
    await logToolCall(
      "omniroute_route_request",
      { model: args.model },
      null,
      Date.now() - start,
      false,
      msg
    );
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleCostReport(args: { period?: string }) {
  const start = Date.now();
  try {
    const period = args.period || "session";
    const range = analyticsRangeForPeriod(period);
    const raw = toRecord(
      await omniRouteFetch(`/api/usage/analytics?range=${encodeURIComponent(range)}`)
    );
    const totals = readAnalyticsTotals(raw);
    const budget = toRecord(raw.budget);

    const result = {
      period,
      totalCost: totals.totalCost,
      requestCount: totals.requestCount,
      tokenCount: {
        prompt: totals.promptTokens,
        completion: totals.completionTokens,
      },
      byProvider: toArray(raw.byProvider),
      byModel: toArray(raw.byModel),
      budget: {
        limit: budget.limit ?? null,
        remaining: budget.remaining ?? null,
      },
    };

    await logToolCall("omniroute_cost_report", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = toSafeMcpErrorMessage(err);
    await logToolCall("omniroute_cost_report", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleListModelsCatalog(args: { provider?: string; capability?: string }) {
  const start = Date.now();
  try {
    const result = await getMcpModelsCatalog(args);

    await logToolCall(
      "omniroute_list_models_catalog",
      args,
      { modelCount: result.models.length },
      Date.now() - start,
      true
    );
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = toSafeMcpErrorMessage(err);
    await logToolCall("omniroute_list_models_catalog", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}
