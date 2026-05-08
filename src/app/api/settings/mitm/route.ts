export const runtime = "nodejs";

import fs from "fs";
import path from "path";
import { z } from "zod";
import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { resolveApiKey } from "@/shared/services/apiKeyResolver";
import { resolveMitmDataDir } from "@/mitm/dataDir";
import { KIRO_MITM_PROFILE } from "@/mitm/targets/kiro";

type MitmTargetRoute = {
  id: string;
  name: string;
  targetHost: string;
  targetPort: number;
  localPort: number;
  endpoints: string[];
  enabled: boolean;
};

type MitmStats = {
  startedAt: string | null;
  totalRequests: number;
  interceptedRequests: number;
  activeConnections: number;
  lastRequestAt: string | null;
  lastInterceptAt: string | null;
};

type MitmConfig = {
  port: number;
  targets: MitmTargetRoute[];
};

const DEFAULT_PORT = 443;
const MITM_PORT_ERROR =
  "Transparent MITM interception currently requires port 443 because DNS override does not redirect destination ports.";

const updateMitmSchema = z.object({
  enabled: z.boolean().optional(),
  apiKey: z.string().optional(),
  keyId: z.string().optional(),
  sudoPassword: z.string().optional(),
  port: z.coerce.number().int().min(1).max(65535).optional(),
});

const regenerateSchema = z.object({
  action: z.literal("regenerate-cert").optional(),
});

function getMitmDir() {
  return path.join(resolveMitmDataDir(), "mitm");
}

function getConfigPath() {
  return path.join(getMitmDir(), "settings.json");
}

function getStatsPath() {
  return path.join(getMitmDir(), "stats.json");
}

function getCertPath() {
  return path.join(getMitmDir(), "server.crt");
}

function getKeyPath() {
  return path.join(getMitmDir(), "server.key");
}

function defaultTargets(port = DEFAULT_PORT): MitmTargetRoute[] {
  return [
    {
      id: "antigravity",
      name: "Antigravity",
      targetHost: "daily-cloudcode-pa.googleapis.com",
      targetPort: 443,
      localPort: port,
      endpoints: [":generateContent", ":streamGenerateContent"],
      enabled: true,
    },
    {
      id: KIRO_MITM_PROFILE.id,
      name: KIRO_MITM_PROFILE.name,
      targetHost: KIRO_MITM_PROFILE.targetHost,
      targetPort: KIRO_MITM_PROFILE.targetPort,
      localPort: KIRO_MITM_PROFILE.localPort,
      endpoints: KIRO_MITM_PROFILE.apiEndpoints,
      enabled: false,
    },
  ];
}

function readConfig(): MitmConfig {
  try {
    JSON.parse(fs.readFileSync(getConfigPath(), "utf8"));
    return {
      port: DEFAULT_PORT,
      targets: defaultTargets(DEFAULT_PORT),
    };
  } catch {
    return {
      port: DEFAULT_PORT,
      targets: defaultTargets(DEFAULT_PORT),
    };
  }
}

function writeConfig() {
  const mitmDir = getMitmDir();
  fs.mkdirSync(mitmDir, { recursive: true });
  fs.writeFileSync(getConfigPath(), JSON.stringify({ port: DEFAULT_PORT }, null, 2));
}

function readStats(): MitmStats {
  try {
    const raw = JSON.parse(fs.readFileSync(getStatsPath(), "utf8"));
    return {
      startedAt: typeof raw.startedAt === "string" ? raw.startedAt : null,
      totalRequests: Number(raw.totalRequests || 0),
      interceptedRequests: Number(raw.interceptedRequests || 0),
      activeConnections: Number(raw.activeConnections || 0),
      lastRequestAt: typeof raw.lastRequestAt === "string" ? raw.lastRequestAt : null,
      lastInterceptAt: typeof raw.lastInterceptAt === "string" ? raw.lastInterceptAt : null,
    };
  } catch {
    return {
      startedAt: null,
      totalRequests: 0,
      interceptedRequests: 0,
      activeConnections: 0,
      lastRequestAt: null,
      lastInterceptAt: null,
    };
  }
}

async function buildMitmResponse() {
  const { getMitmStatus, getCachedPassword } = await import("@/mitm/manager");
  const status = await getMitmStatus();
  const config = readConfig();
  const stats = readStats();

  return {
    running: status.running,
    pid: status.pid || null,
    dnsConfigured: status.dnsConfigured || false,
    certExists: status.certExists || fs.existsSync(getCertPath()),
    hasCachedPassword: !!getCachedPassword(),
    port: config.port,
    targets: config.targets,
    stats,
  };
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.get("download") === "cert") {
      const certPath = getCertPath();
      if (!fs.existsSync(certPath)) {
        return NextResponse.json({ error: "MITM certificate not found" }, { status: 404 });
      }
      return new NextResponse(fs.readFileSync(certPath), {
        headers: {
          "Content-Type": "application/x-pem-file",
          "Content-Disposition": 'attachment; filename="omniroute-mitm-ca.crt"',
        },
      });
    }

    return NextResponse.json(await buildMitmResponse());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load MITM settings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const rawBody = await request.json().catch(() => ({}));
    const parsed = updateMitmSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const config = readConfig();
    if (parsed.data.port !== undefined && parsed.data.port !== DEFAULT_PORT) {
      return NextResponse.json({ error: MITM_PORT_ERROR }, { status: 400 });
    }

    if (parsed.data.port !== undefined) {
      config.port = DEFAULT_PORT;
      config.targets = defaultTargets(config.port);
      writeConfig();
    }

    if (typeof parsed.data.enabled === "boolean") {
      const { getCachedPassword, setCachedPassword, startMitm, stopMitm } =
        await import("@/mitm/manager");
      const isWin = process.platform === "win32";
      const sudoPassword = parsed.data.sudoPassword || getCachedPassword() || "";

      if (parsed.data.enabled) {
        const apiKey = await resolveApiKey(parsed.data.keyId || null, parsed.data.apiKey || null);
        if (!apiKey || (!isWin && !sudoPassword)) {
          return NextResponse.json(
            { error: isWin ? "Missing apiKey" : "Missing apiKey or sudoPassword" },
            { status: 400 }
          );
        }
        await startMitm(apiKey, sudoPassword, { port: config.port });
        if (!isWin) setCachedPassword(sudoPassword);
      } else {
        if (!isWin && !sudoPassword) {
          return NextResponse.json({ error: "Missing sudoPassword" }, { status: 400 });
        }
        await stopMitm(sudoPassword);
        if (!isWin && parsed.data.sudoPassword) setCachedPassword(parsed.data.sudoPassword);
      }
    }

    return NextResponse.json(await buildMitmResponse());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update MITM settings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const rawBody = await request.json().catch(() => ({}));
    const parsed = regenerateSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { getMitmStatus } = await import("@/mitm/manager");
    const status = await getMitmStatus();
    if (status.running) {
      return NextResponse.json(
        { error: "Stop the MITM proxy before regenerating certificates" },
        { status: 409 }
      );
    }

    for (const filePath of [getCertPath(), getKeyPath()]) {
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch {
        /* ignore */
      }
    }

    const { generateCert } = await import("@/mitm/cert/generate");
    await generateCert();

    return NextResponse.json(await buildMitmResponse());
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to regenerate MITM certificate";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
