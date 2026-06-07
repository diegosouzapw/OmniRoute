import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import {
  clearObsidianToken,
  getObsidianConfig,
  getObsidianBaseUrl,
  getObsidianVaultPath,
  setObsidianToken,
  setObsidianBaseUrl,
  setObsidianVaultPath,
} from "@/lib/db/obsidian";
import { createObsidianClient } from "@/lib/obsidian/api";

const setTokenSchema = z.object({
  token: z.string().min(1).max(5000),
  baseUrl: z.string().url().optional(),
}).strict();

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const config = getObsidianConfig();
    return NextResponse.json({
      connected: config.connected,
      hasToken: config.token !== null,
      baseUrl: config.baseUrl,
      vaultPath: config.vaultPath,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
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

  let urlToUse = parsed.data.baseUrl;

  if (!urlToUse) {
    urlToUse = getObsidianBaseUrl();
  }

  if (urlToUse && /:27124(?:\/|$)/.test(urlToUse)) {
    return NextResponse.json(
      {
        error:
          "URL uses port 27124, which is the MCP endpoint (HTTPS, self-signed cert). " +
          "The Obsidian Local REST API uses plain HTTP on port 27123. " +
          "Please use http://<ip>:27123 instead.",
        connected: false,
      },
      { status: 400 }
    );
  }

  try {
    const client = createObsidianClient(parsed.data.token, urlToUse);
    const result = await client.checkStatus();
    const authResult = result as Record<string, unknown>;
    if (authResult?.authenticated === false) {
      return NextResponse.json(
        { error: "Token validation failed: invalid token", connected: false },
        { status: 400 }
      );
    }

    setObsidianToken(parsed.data.token);
    if (parsed.data.baseUrl) {
      setObsidianBaseUrl(parsed.data.baseUrl);
    }

    return NextResponse.json({
      connected: true,
      message: "Obsidian API token saved and validated",
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg, connected: false }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    clearObsidianToken();
    return NextResponse.json({
      connected: false,
      message: "Obsidian integration disconnected",
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
