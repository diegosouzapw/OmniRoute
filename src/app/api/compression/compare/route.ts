import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  benchmarkEngines,
  compareReports,
  DEFAULT_BENCHMARK_ENGINES,
} from "@omniroute/open-sse/services/compression/harness/benchmark";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export const dynamic = "force-dynamic";

const CompareRequestSchema = z.object({
  messages: z
    .array(z.object({ role: z.string(), content: z.union([z.string(), z.array(z.unknown())]) }))
    .min(1),
  engineIds: z.array(z.string()).min(1).optional(),
});

function messagesToText(messages: Array<{ role: string; content: unknown }>): string {
  return messages
    .map((m) => `${m.role}: ${typeof m.content === "string" ? m.content : JSON.stringify(m.content)}`)
    .join("\n");
}

export async function POST(req: Request) {
  const authError = await requireManagementAuth(req);
  if (authError) return authError;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = CompareRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request", details: parsed.error.issues }, { status: 400 });
  }
  const { messages, engineIds } = parsed.data;
  const text = messagesToText(messages);
  const ids = engineIds ?? DEFAULT_BENCHMARK_ENGINES;
  try {
    const reports = await benchmarkEngines([{ id: "input", input: text }], ids);
    const rows = compareReports(reports);
    return NextResponse.json({ rows });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/api/compression/compare]", msg);
    return NextResponse.json({ error: "Compare failed", details: sanitizeErrorMessage(msg) }, { status: 500 });
  }
}
