import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import {
  getObsidianSyncStatus,
  enableObsidianVaultSync,
  disableObsidianVaultSync,
} from "@/lib/obsidianSync";

const enableSchema = z
  .object({
    vaultPath: z.string().min(1).max(4096),
  })
  .strict();

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json(buildErrorBody(401, "Authentication required"), { status: 401 });
  }

  try {
    const status = await getObsidianSyncStatus();
    // GHSA-62vw: the WebDAV password is reusable authentication material. Return
    // the plaintext only to a genuine management principal (dashboard session or
    // manage-scope key), never to an anonymous caller that reached this handler
    // through the requireLogin=false open mode. The dashboard's authenticated
    // reveal-password view is unaffected; anonymous callers get a set/unset flag.
    const hasManagement =
      (await requireManagementAuth(request, { alwaysRequireAuth: true })) === null;
    return NextResponse.json({
      webdavEnabled: status.webdavEnabled,
      webdavUsername: status.webdavEnabled ? status.webdavUsername : null,
      webdavPassword:
        status.webdavEnabled && hasManagement ? status.webdavPassword : null,
      webdavPasswordSet: status.webdavEnabled && Boolean(status.webdavPassword),
      vaultPath: status.vaultPath,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(buildErrorBody(500, msg), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json(buildErrorBody(401, "Authentication required"), { status: 401 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(buildErrorBody(400, "Invalid JSON body"), { status: 400 });
  }

  const parsed = enableSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      buildErrorBody(400, "Missing or invalid vaultPath"),
      { status: 400 }
    );
  }

  const result = await enableObsidianVaultSync(parsed.data.vaultPath);
  if (!result.success) {
    return NextResponse.json(buildErrorBody(400, result.error), { status: 400 });
  }

  return NextResponse.json({
    username: result.username,
    password: result.password,
    vaultPath: result.vaultPath,
  });
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json(buildErrorBody(401, "Authentication required"), { status: 401 });
  }

  const result = await disableObsidianVaultSync();
  if (!result.success) {
    return NextResponse.json(buildErrorBody(500, result.error ?? "Failed to disable WebDAV sync"), {
      status: 500,
    });
  }

  return NextResponse.json({ success: true });
}
