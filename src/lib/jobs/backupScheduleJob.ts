import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { matchesCron } from "@/lib/jobs/cronMatch";
// Reuses the CLI's own backup implementation rather than duplicating it — the
// `omniroute backup auto enable` schedule this job executes is written by
// exactly that CLI, with the exact same cloud/encrypt/retention semantics.
// `runBackupCommand`/`resolveDataDir` are plain functions with no Commander
// or process.exit() coupling (verified), and `resolveDataDir()` here is
// algorithmically identical to `src/lib/dataPaths.ts`'s server-side resolver
// (same DATA_DIR/XDG/legacy-dir precedence) — both agree on where
// `backup-schedule.json` lives.
import { runBackupCommand } from "../../../bin/cli/commands/backup.mjs";
import { resolveDataDir } from "../../../bin/cli/data-dir.mjs";

const DEFAULT_INTERVAL_MS = 30 * 1000;

let timer: NodeJS.Timeout | null = null;

function getIntervalMs() {
  const raw = process.env.OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS;
  const parsed = raw ? Number(raw) : Number.NaN;
  // Floor at 5s (not the usual 60s+ floor used by the other jobs in this
  // directory): cron granularity is 1 minute, so the tick must be
  // meaningfully shorter than that to reliably land inside the matching
  // minute at all.
  return Number.isFinite(parsed) && parsed >= 5_000 ? parsed : DEFAULT_INTERVAL_MS;
}

function getSchedulePath() {
  return join(resolveDataDir(), "backup-schedule.json");
}

function minuteKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;
}

type BackupSchedule = {
  enabled?: boolean;
  cron?: string;
  cloud?: boolean;
  encrypt?: boolean;
  retention?: number | null;
  updatedAt?: string;
  lastRunAt?: string;
};

function readSchedule(): BackupSchedule | null {
  const schedulePath = getSchedulePath();
  if (!existsSync(schedulePath)) return null;
  try {
    return JSON.parse(readFileSync(schedulePath, "utf8"));
  } catch {
    return null;
  }
}

function writeLastRunAt(schedule: BackupSchedule, at: Date) {
  const schedulePath = getSchedulePath();
  const updated = { ...schedule, lastRunAt: at.toISOString() };
  writeFileSync(schedulePath, JSON.stringify(updated, null, 2), "utf8");
}

/**
 * Evaluates the persisted `backup-schedule.json` against `now` and, if due,
 * runs the backup. Returns whether a backup was actually triggered — used
 * directly by tests (with an explicit `now`) and by the interval tick below
 * (with the real current time).
 */
export async function runBackupScheduleTick(now: Date = new Date()): Promise<boolean> {
  const schedule = readSchedule();
  if (!schedule || !schedule.enabled || !schedule.cron) return false;
  if (!matchesCron(schedule.cron, now)) return false;

  // `runBackupCommand({ encrypt: true })` without a key file prompts for a
  // passphrase on stdin (`promptPassphrase()`) — fine for an interactive CLI
  // run, but this tick has no TTY to read from and would hang forever. And
  // `backup auto enable` doesn't even expose `--key-file` today, so there is
  // currently no way to configure a non-interactive passphrase for a
  // scheduled encrypted backup. Refuse rather than hang; --encrypt on the
  // schedule needs a follow-up (`--key-file` on `auto enable`) before this
  // can run unattended.
  if (schedule.encrypt) {
    console.error(
      "[BackupSchedule] Schedule has encrypt:true but no non-interactive passphrase source exists yet " +
        "(backup auto enable has no --key-file) — skipping this run rather than blocking on stdin."
    );
    return false;
  }

  // A tick shorter than 60s means multiple ticks can land inside the same
  // matching minute — without this guard the backup would fire once per
  // tick for the whole minute instead of once for the whole day.
  if (schedule.lastRunAt) {
    const lastRun = new Date(schedule.lastRunAt);
    if (!Number.isNaN(lastRun.getTime()) && minuteKey(lastRun) === minuteKey(now)) {
      return false;
    }
  }

  writeLastRunAt(schedule, now);
  try {
    await runBackupCommand({
      cloud: !!schedule.cloud,
      encrypt: !!schedule.encrypt,
      retention: schedule.retention || undefined,
    });
  } catch (error) {
    console.error("[BackupSchedule] Job failed:", error);
  }
  return true;
}

export function startBackupScheduleJob() {
  if (timer) {
    return timer;
  }

  const run = () => {
    runBackupScheduleTick().catch((error) => {
      console.error("[BackupSchedule] Tick failed:", error);
    });
  };

  timer = setInterval(run, getIntervalMs());
  timer.unref?.();
  return timer;
}

export function stopBackupScheduleJob() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}
