/**
 * GET  /api/system/version  — Returns current version and latest available on npm
 * POST /api/system/version  — Triggers a deployment-aware background update
 *
 * Security: Requires admin authentication (same as other management routes).
 * Safety: Update only runs if a newer version is available on npm.
 */
import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import {
  ensureGitTagExists,
  getAutoUpdateConfig,
  launchAutoUpdate,
  validateAutoUpdateRuntime,
} from "@/lib/system/autoUpdate";

const execFileAsync = promisify(execFile);

export const dynamic = "force-dynamic";

async function getLatestNpmVersion(): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("npm", ["info", "omniroute", "version", "--json"], {
      timeout: 10000,
    });
    const parsed = JSON.parse(stdout.trim());
    return typeof parsed === "string" ? parsed : null;
  } catch {
    return null;
  }
}

function getCurrentVersion(): string {
  try {
    return require("../../../../../package.json").version as string;
  } catch {
    return "unknown";
  }
}

function isNewer(a: string | null, b: string): boolean {
  if (!a) return false;
  const parse = (v: string) => v.split(".").map(Number);
  const [aMaj, aMin, aPat] = parse(a);
  const [bMaj, bMin, bPat] = parse(b);
  if (aMaj !== bMaj) return aMaj > bMaj;
  if (aMin !== bMin) return aMin > bMin;
  return aPat > bPat;
}

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const current = getCurrentVersion();
  const latest = await getLatestNpmVersion();
  const updateAvailable = isNewer(latest, current);
  const config = getAutoUpdateConfig();
  const validation = await validateAutoUpdateRuntime(config);

  return NextResponse.json({
    current,
    latest: latest ?? "unavailable",
    updateAvailable,
    channel: config.mode,
    autoUpdateSupported: validation.supported,
    autoUpdateError: validation.reason,
  });
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const current = getCurrentVersion();
  const latest = await getLatestNpmVersion();

  if (!latest) {
    return NextResponse.json(
      { success: false, error: "Could not reach npm registry" },
      { status: 503 }
    );
  }

  const resolvedTargetTag = latest.startsWith("v") ? latest : `v${latest}`;

  if (!isNewer(latest, current)) {
    return NextResponse.json({
      success: false,
      error: `Already on latest version (${current})`,
      current,
      latest,
    });
  }

  const config = getAutoUpdateConfig();
  const validation = await validateAutoUpdateRuntime(config);

  if (!validation.supported) {
    return NextResponse.json(
      {
        success: false,
        error: validation.reason || "Auto-update is not supported in this environment.",
      },
      { status: 400 }
    );
  }

  // If we are in docker-compose mode, use the detached shell script background updates
  if (config.mode === "docker-compose") {
    const launched = await launchAutoUpdate({ latest });
    if (!launched.started) {
      return NextResponse.json(
        {
          success: false,
          error: launched.error || "Failed to start auto-update.",
          channel: launched.channel,
          logPath: launched.logPath,
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Update to v${latest} started. Docker rebuild is running in the background.`,
      from: current,
      to: latest,
      channel: launched.channel,
      logPath: launched.logPath,
    });
  }

  if (config.mode === "source") {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const send = (data: Record<string, unknown>) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        };

        try {
          send({
            step: "install",
            status: "running",
            message: `Fetching latest tags from ${config.gitRemote}...`,
          });
          await execFileAsync("git", ["fetch", "--tags", config.gitRemote], {
            timeout: 60_000,
            cwd: process.cwd(),
          });
          send({ step: "install", status: "done", message: "Tags fetched" });

          send({
            step: "install",
            status: "running",
            message: `Validating ${resolvedTargetTag}...`,
          });
          await ensureGitTagExists(resolvedTargetTag, execFileAsync, process.cwd());
          send({
            step: "install",
            status: "done",
            message: `Validated ${resolvedTargetTag}`,
          });

          send({
            step: "install",
            status: "running",
            message: `Checking out ${resolvedTargetTag}...`,
          });
          try {
            await execFileAsync("git", ["stash", "--include-untracked"], {
              timeout: 30_000,
              cwd: process.cwd(),
            });
          } catch {
            // No local changes to stash.
          }

          const shortHead = (
            await execFileAsync("git", ["rev-parse", "--short", "HEAD"], {
              timeout: 10_000,
              cwd: process.cwd(),
            })
          ).stdout.trim();
          const backupBranch = `pre-update/${shortHead}-${new Date().toISOString().replace(/[:.]/g, "-")}`;

          try {
            await execFileAsync("git", ["branch", backupBranch], {
              timeout: 10_000,
              cwd: process.cwd(),
            });
          } catch {
            // Backup branch is best-effort only.
          }

          await execFileAsync("git", ["checkout", resolvedTargetTag], {
            timeout: 30_000,
            cwd: process.cwd(),
          });
          send({ step: "install", status: "done", message: `Checked out ${resolvedTargetTag}` });

          send({
            step: "rebuild",
            status: "running",
            message: "Installing dependencies...",
          });
          await execFileAsync("npm", ["install", "--legacy-peer-deps"], {
            timeout: 300_000,
            cwd: process.cwd(),
          });
          send({ step: "rebuild", status: "done", message: "Dependencies installed" });

          try {
            await execFileAsync("node", ["scripts/sync-env.mjs"], {
              timeout: 15_000,
              cwd: process.cwd(),
            });
          } catch {
            // .env sync is non-fatal during update.
          }

          send({
            step: "rebuild",
            status: "running",
            message: "Building application...",
          });
          await execFileAsync("npm", ["run", "build"], {
            timeout: 600_000,
            cwd: process.cwd(),
          });
          send({ step: "rebuild", status: "done", message: "Build complete" });

          send({ step: "restart", status: "running", message: "Restarting service..." });
          try {
            await execFileAsync("pm2", ["restart", "omniroute", "--update-env"], {
              timeout: 30_000,
              cwd: process.cwd(),
            });
            send({ step: "restart", status: "done", message: "Service restarted" });
          } catch {
            send({
              step: "restart",
              status: "skipped",
              message: "PM2 not available — manual restart needed",
            });
          }

          send({
            step: "complete",
            status: "done",
            from: current,
            to: latest,
            message: `Update to ${resolvedTargetTag} complete!`,
          });
          console.log(`[AutoUpdate] Successfully updated to ${resolvedTargetTag} via source mode`);
        } catch (err: any) {
          const errMsg = err?.stderr || err?.message || String(err);
          send({ step: "error", status: "failed", message: errMsg });
          console.error("[AutoUpdate] Source update failed:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  // Stream progress events so the frontend can show real-time status for NPM/PM2 mode
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        // Step 1: Install
        send({ step: "install", status: "running", message: `Installing omniroute@${latest}...` });
        await execFileAsync(
          "npm",
          ["install", "-g", `omniroute@${latest}`, "--ignore-scripts", "--legacy-peer-deps"],
          {
            timeout: 300000,
          }
        );
        send({ step: "install", status: "done", message: `Installed omniroute@${latest}` });

        // Step 2: Rebuild native modules (critical for better-sqlite3)
        send({
          step: "rebuild",
          status: "running",
          message: "Rebuilding native modules (better-sqlite3)...",
        });
        const globalRoot = (
          await execFileAsync("npm", ["root", "-g"], { timeout: 10000 })
        ).stdout.trim();
        const omniPath = `${globalRoot}/omniroute/app`;
        await execFileAsync("npm", ["rebuild", "better-sqlite3"], {
          cwd: omniPath,
          timeout: 120000,
        });
        send({ step: "rebuild", status: "done", message: "Native modules rebuilt" });

        // Step 3: Restart PM2
        send({ step: "restart", status: "running", message: "Restarting service via PM2..." });
        try {
          await execFileAsync("pm2", ["restart", "omniroute", "--update-env"], { timeout: 30000 });
          send({ step: "restart", status: "done", message: "Service restarted" });
        } catch {
          // PM2 may not be available (Docker/manual setups)
          send({
            step: "restart",
            status: "skipped",
            message: "PM2 not available — manual restart needed",
          });
        }

        send({
          step: "complete",
          status: "done",
          from: current,
          to: latest,
          message: `Update to v${latest} complete!`,
        });
        console.log(`[AutoUpdate] Successfully updated to v${latest}`);
      } catch (err: any) {
        const errMsg = err?.stderr || err?.message || String(err);
        send({ step: "error", status: "failed", message: errMsg });
        console.error(`[AutoUpdate] Update failed:`, err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
