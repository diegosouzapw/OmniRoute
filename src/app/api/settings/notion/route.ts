import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import {
  getNotionConfig,
  setNotionToken,
  clearNotionToken,
} from "@/lib/db/notion";
import { createNotionClient } from "@/lib/notion/api";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const setTokenSchema = z.object({
  token: z.string().min(1).max(500),
}).strict();

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const config = getNotionConfig();
    return NextResponse.json({
      connected: config.connected,
      hasToken: config.token !== null,
    });
  } catch (error) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = setTokenSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Missing or invalid token", details: parsed.error.issues },
      { status: 400 }
    );
  }

  try {
    setNotionToken(parsed.data.token);

    const client = createNotionClient(parsed.data.token);
    const result = await client.searchPagesAndDatabases("test", undefined, 1);
    if (result && typeof result === "object" && "object" in result && (result as Record<string, unknown>).object === "error") {
      clearNotionToken();
      return NextResponse.json(
        { error: "Token validation failed: invalid token", connected: false },
        { status: 400 }
      );
    }

    return NextResponse.json({
      connected: true,
      message: "Notion integration token saved and validated",
    });
  } catch (error) {
    clearNotionToken();
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: sanitizeErrorMessage(msg), connected: false }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    clearNotionToken();
    return NextResponse.json({
      connected: false,
      message: "Notion integration disconnected",
    });
  } catch (error) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}
