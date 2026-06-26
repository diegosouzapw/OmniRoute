#!/usr/bin/env node
/**
 * On-call rotation calculator.
 *
 * PagerDuty-style rotation over a list of engineers with a configurable
 * shift length (hours). Pure Node stdlib — no `npm install`. File-based
 * state: the rotation definition lives in a JSON file, and the output
 * (handoffs, current on-call) is also a JSON file.
 *
 * Why a custom calculator instead of just `npm install pd-cli`:
 *   - We want the rotation to work offline (on the operator's laptop,
 *     before they have VPN).
 *   - The PagerDuty schedule XML format has corner cases (DST, week
 *     boundaries, mixed-timezone engineers) that we control here.
 *   - We need to be able to ask "who was on-call at 2026-06-12T07:00:00-07:00?"
 *     without depending on PagerDuty being reachable.
 *
 * CLI:
 *   node scripts/sre/oncall-rotation.mjs rotation.json current
 *   node scripts/sre/oncall-rotation.mjs rotation.json handoff --at 2026-06-25T09:00:00-07:00
 *   node scripts/sre/oncall-rotation.mjs rotation.json range --from 2026-06-01 --to 2026-06-30
 *
 * Rotation file format:
 *   {
 *     "timezone": "America/Los_Angeles",
 *     "shiftHours": 168,           // 1 week
 *     "startsAt": "2026-06-01T09:00:00-07:00",
 *     "members": ["alice", "bob", "carol", "dave"]
 *   }
 *
 * @see docs/sre/INDEX.md (PR-011)
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import process from "node:process";

// ── Library API ──────────────────────────────────────────────────────────────

/**
 * @typedef {Object} Rotation
 * @property {string} timezone   IANA timezone identifier (e.g. "America/Los_Angeles")
 * @property {number} shiftHours Hours per shift (168 = 1 week)
 * @property {string} startsAt   ISO-8601 datetime (the start of member[0]'s first shift)
 * @property {string[]} members   Ordered list of engineer handles
 */

/**
 * Format a Date in the given IANA timezone using `Intl.DateTimeFormat`.
 * Returns an ISO-8601 string with the timezone offset, e.g.
 * `2026-06-25T09:00:00-07:00`.
 *
 * @param {Date} date
 * @param {string} timezone
 * @returns {string}
 */
export function formatInTimezone(date, timezone) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "longOffset",
  });
  const parts = dtf.formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
  const year = get("year");
  const month = get("month");
  const day = get("day");
  const hour = get("hour");
  const minute = get("minute");
  const second = get("second");
  // `timeZoneName: "longOffset"` yields "GMT-07:00" — extract the offset.
  const tzName = get("timeZoneName").replace(/^GMT/, "");
  return `${year}-${month}-${day}T${hour}:${minute}:${second}${tzName || "Z"}`;
}

/**
 * Resolve a Date in the given timezone to the corresponding UTC ms.
 * We do this by formatting the date in the timezone, parsing the formatted
 * string as UTC, then computing the offset difference.
 *
 * @param {Date} utc
 * @param {string} timezone
 * @returns {number} UTC ms that, when formatted in `timezone`, equals `utc`
 */
export function utcForTimezone(utc, timezone) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = dtf.formatToParts(utc);
  const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
  // Build a UTC date from the formatted parts, then derive the offset.
  const asUtc = Date.UTC(
    Number(get("year")),
    Number(get("month")) - 1,
    Number(get("day")),
    Number(get("hour")),
    Number(get("minute")),
    Number(get("second"))
  );
  // The difference between `asUtc` and the wall clock in UTC ms gives the
  // timezone offset (in ms). Adding that offset to the wall-clock-interpreted-
  // as-UTC time gives the real UTC instant.
  const offsetMs = asUtc - Date.UTC(
    utc.getUTCFullYear(),
    utc.getUTCMonth(),
    utc.getUTCDate(),
    utc.getUTCHours(),
    utc.getUTCMinutes(),
    utc.getUTCSeconds()
  );
  return asUtc - offsetMs;
}

/**
 * Compute the rotation index for a given UTC instant.
 *
 * The rotation index is `floor((utcMs - startMs) / shiftMs) mod members.length`.
 * Negative mod in JS is tricky — we add `members.length` and mod again to keep
 * the index non-negative.
 *
 * @param {number} utcMs         UTC millisecond timestamp
 * @param {Rotation} rotation
 * @returns {number} index into `rotation.members`
 */
export function rotationIndex(utcMs, rotation) {
  const startMs = utcForTimezone(new Date(rotation.startsAt), rotation.timezone);
  const shiftMs = rotation.shiftHours * 60 * 60 * 1000;
  const elapsed = utcMs - startMs;
  const rawIndex = Math.floor(elapsed / shiftMs);
  const len = rotation.members.length;
  return ((rawIndex % len) + len) % len;
}

/**
 * Compute the start and end UTC ms of the shift that contains `utcMs`.
 *
 * @param {number} utcMs
 * @param {Rotation} rotation
 * @returns {{ startsAt: string, endsAt: string, member: string, index: number }}
 */
export function shiftFor(utcMs, rotation) {
  const startMs = utcForTimezone(new Date(rotation.startsAt), rotation.timezone);
  const shiftMs = rotation.shiftHours * 60 * 60 * 1000;
  const elapsed = utcMs - startMs;
  const shiftIndex = Math.floor(elapsed / shiftMs);
  const shiftStart = startMs + shiftIndex * shiftMs;
  const shiftEnd = shiftStart + shiftMs;
  const memberIndex = ((shiftIndex % rotation.members.length) + rotation.members.length) % rotation.members.length;
  return {
    startsAt: new Date(shiftStart).toISOString(),
    endsAt: new Date(shiftEnd).toISOString(),
    member: rotation.members[memberIndex],
    index: memberIndex,
    shiftNumber: shiftIndex,
  };
}

/**
 * List every shift in the rotation between two ISO-8601 datetimes.
 *
 * @param {string} fromIso
 * @param {string} toIso
 * @param {Rotation} rotation
 * @returns {Array<{ startsAt: string, endsAt: string, member: string, index: number, shiftNumber: number }>}
 */
export function shiftsInRange(fromIso, toIso, rotation) {
  const fromMs = Date.parse(fromIso);
  const toMs = Date.parse(toIso);
  if (!Number.isFinite(fromMs) || !Number.isFinite(toMs)) {
    throw new Error(`invalid date: from=${fromIso} to=${toIso}`);
  }
  if (toMs <= fromMs) {
    throw new Error(`range is empty or reversed: ${fromIso} >= ${toIso}`);
  }
  const startMs = utcForTimezone(new Date(rotation.startsAt), rotation.timezone);
  const shiftMs = rotation.shiftHours * 60 * 60 * 1000;
  const len = rotation.members.length;
  const halfShift = shiftMs / 2;
  const out = [];
  // Start at the first shift whose end is >= fromMs.
  const firstShift = Math.floor((fromMs - startMs) / shiftMs);
  const lastShift = Math.ceil((toMs - startMs) / shiftMs);
  for (let i = firstShift; i < lastShift; i += 1) {
    const sStart = startMs + i * shiftMs;
    const sEnd = sStart + shiftMs;
    // Skip shifts that start before the rotation was ever defined — they
    // would resolve to a member, but the rotation didn't exist yet so
    // there's no handoff record to point at.
    if (sStart < startMs) continue;
    // A shift is included if it overlaps the range AND either
    //   - it started before the range and is still ongoing at fromMs, OR
    //   - it started inside the range AND less than half of it extends past toMs.
    // The half-shift gate prevents a "next-cycle" shift from leaking into a
    // range that just barely clips its start.
    if (sEnd <= fromMs) continue;
    if (sStart >= toMs) break;
    const startedBeforeRange = sStart < fromMs;
    const overshoots = sEnd - toMs;
    if (!startedBeforeRange && overshoots >= halfShift) continue;
    const memberIndex = ((i % len) + len) % len;
    out.push({
      startsAt: new Date(sStart).toISOString(),
      endsAt: new Date(sEnd).toISOString(),
      member: rotation.members[memberIndex],
      index: memberIndex,
      shiftNumber: i,
    });
  }
  return out;
}

// ── CLI ──────────────────────────────────────────────────────────────────────

function loadRotation(path) {
  if (!existsSync(path)) {
    process.stderr.write(`oncall-rotation: file not found: ${path}\n`);
    process.exit(2);
  }
  const raw = readFileSync(path, "utf8");
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    process.stderr.write(`oncall-rotation: invalid JSON in ${path}: ${err.message}\n`);
    process.exit(2);
  }
  // Minimal validation — keep the script forgiving but loud.
  for (const key of ["timezone", "shiftHours", "startsAt", "members"]) {
    if (!(key in parsed)) {
      process.stderr.write(`oncall-rotation: missing field "${key}" in ${path}\n`);
      process.exit(2);
    }
  }
  if (!Array.isArray(parsed.members) || parsed.members.length === 0) {
    process.stderr.write(`oncall-rotation: "members" must be a non-empty array\n`);
    process.exit(2);
  }
  if (typeof parsed.shiftHours !== "number" || parsed.shiftHours <= 0) {
    process.stderr.write(`oncall-rotation: "shiftHours" must be a positive number\n`);
    process.exit(2);
  }
  return parsed;
}

function printHelp() {
  process.stdout.write(`Usage: oncall-rotation.mjs <rotation.json> <command> [options]

Commands:
  current                       Print the shift that contains "now" (UTC).
  handoff --at <iso>            Print the shift containing the given instant.
  range --from <iso> --to <iso> List every shift overlapping the range.
  validate                      Validate the rotation file and print a summary.

Rotation file format (JSON):
  {
    "timezone": "America/Los_Angeles",
    "shiftHours": 168,
    "startsAt": "2026-06-01T09:00:00-07:00",
    "members": ["alice", "bob", "carol"]
  }
`);
}

function parseCommandArgs(argv) {
  const out = { command: null, from: null, at: null, to: null };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--from") {
      out.from = argv[++i];
    } else if (a === "--to") {
      out.to = argv[++i];
    } else if (a === "--at") {
      out.at = argv[++i];
    }
  }
  out.command = argv[0] ?? null;
  return out;
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    printHelp();
    return;
  }
  const [rotationPath, ...rest] = args;
  if (!rotationPath || rest.length === 0) {
    printHelp();
    process.exit(2);
  }
  const rotation = loadRotation(rotationPath);
  const cmd = parseCommandArgs(rest);

  if (cmd.command === "current") {
    const nowMs = Date.now();
    const shift = shiftFor(nowMs, rotation);
    process.stdout.write(`${JSON.stringify({ now: new Date(nowMs).toISOString(), ...shift }, null, 2)}\n`);
    return;
  }
  if (cmd.command === "handoff") {
    if (!cmd.at) {
      process.stderr.write("oncall-rotation: handoff requires --at <iso>\n");
      process.exit(2);
    }
    const atMs = Date.parse(cmd.at);
    if (!Number.isFinite(atMs)) {
      process.stderr.write(`oncall-rotation: invalid --at datetime: ${cmd.at}\n`);
      process.exit(2);
    }
    const shift = shiftFor(atMs, rotation);
    process.stdout.write(`${JSON.stringify({ at: new Date(atMs).toISOString(), ...shift }, null, 2)}\n`);
    return;
  }
  if (cmd.command === "range") {
    if (!cmd.from || !cmd.to) {
      process.stderr.write("oncall-rotation: range requires --from <iso> --to <iso>\n");
      process.exit(2);
    }
    const shifts = shiftsInRange(cmd.from, cmd.to, rotation);
    process.stdout.write(`${JSON.stringify({ from: cmd.from, to: cmd.to, shifts }, null, 2)}\n`);
    return;
  }
  if (cmd.command === "validate") {
    const summary = {
      timezone: rotation.timezone,
      shiftHours: rotation.shiftHours,
      startsAt: rotation.startsAt,
      members: rotation.members,
      firstShift: shiftFor(Date.parse(rotation.startsAt), rotation),
      lastShift: shiftFor(Date.parse(rotation.startsAt) + rotation.members.length * rotation.shiftHours * 3600_000 - 1, rotation),
    };
    process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
    return;
  }

  process.stderr.write(`oncall-rotation: unknown command: ${cmd.command}\n`);
  printHelp();
  process.exit(2);
}

import { pathToFileURL } from "node:url";
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}