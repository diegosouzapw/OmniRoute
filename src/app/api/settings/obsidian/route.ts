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
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import {
  CLOUD_METADATA_BLOCKED_MESSAGE,
  parseAndValidateNonMetadataUrl,
} from "@/shared/network/outboundUrlGuard";

// GHSA-474q-g63r-w4rr: the base URL is an outbound target. Loopback / LAN / Tailscale
// hosts are legitimate (the Local REST API runs next to the vault), cloud-metadata and
// link-local never are — and the check runs here, before any fetch and before the URL
// is persisted for the /api/obsidian/* routes to reuse.
const obsidianBaseUrlSchema = z
  .string()
  .url()
  .refine(
    (value) => {
      try {
        parseAndValidateNonMetadataUrl(value);
        return true;
      } catch {
        return false;
      }
    },
    { message: CLOUD_METADATA_BLOCKED_MESSAGE }
  );

const setTokenSchema = z
  .object({
    token: z.string().min(1).max(5000),
    baseUrl: obsidianBaseUrlSchema.optional(),
  })
  .strict();

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
    const baseUrlIssue = parsed.error.issues.find((issue) => issue.path[0] === "baseUrl");
    return NextResponse.json(
      {
        error: baseUrlIssue
          ? `Invalid baseUrl: ${baseUrlIssue.message}`
          : "Missing or invalid token",
        details: parsed.error.issues,
      },
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
    return NextResponse.json(
      { error: sanitizeErrorMessage(msg), connected: false },
      { status: 400 }
    );
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
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}
