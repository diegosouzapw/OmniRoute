/**
 * Args parser for feature-triage CLI.
 * Precedence: CLI flag > env var > default.
 */

const DEFAULTS = {
  quarantineDays: 14,
  overrideThumbs: 5,
  overrideCommenters: 3,
  staleNeedsDays: 30,
  staleDeferDays: 90,
  ideiaDir: "_ideia",
  changelog: "CHANGELOG.md",
  output: null,
  dryRun: false,
  verbose: false,
  onlyIssues: [],
};

const ENV_MAP = {
  quarantineDays: "FEATURE_QUARANTINE_DAYS",
  overrideThumbs: "FEATURE_OVERRIDE_THUMBS",
  overrideCommenters: "FEATURE_OVERRIDE_COMMENTERS",
  staleNeedsDays: "FEATURE_STALE_NEEDS_DAYS",
  staleDeferDays: "FEATURE_STALE_DEFER_DAYS",
};

function takeNext(argv, i) {
  if (i + 1 >= argv.length) {
    throw new Error(`${argv[i]} requires a value`);
  }
  return argv[i + 1];
}

export function parseArgs(argv, env = process.env) {
  const out = { ...DEFAULTS, owner: null, repo: null };

  for (const [key, envKey] of Object.entries(ENV_MAP)) {
    if (env[envKey] !== undefined) {
      const n = Number(env[envKey]);
      if (Number.isFinite(n)) out[key] = n;
    }
  }

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case "--owner":
        out.owner = takeNext(argv, i);
        i++;
        break;
      case "--repo":
        out.repo = takeNext(argv, i);
        i++;
        break;
      case "--quarantine-days":
        out.quarantineDays = Number(takeNext(argv, i));
        i++;
        break;
      case "--override-thumbs":
        out.overrideThumbs = Number(takeNext(argv, i));
        i++;
        break;
      case "--override-commenters":
        out.overrideCommenters = Number(takeNext(argv, i));
        i++;
        break;
      case "--stale-needs-days":
        out.staleNeedsDays = Number(takeNext(argv, i));
        i++;
        break;
      case "--stale-defer-days":
        out.staleDeferDays = Number(takeNext(argv, i));
        i++;
        break;
      case "--ideia-dir":
        out.ideiaDir = takeNext(argv, i);
        i++;
        break;
      case "--changelog":
        out.changelog = takeNext(argv, i);
        i++;
        break;
      case "--output":
        out.output = takeNext(argv, i);
        i++;
        break;
      case "--dry-run":
        out.dryRun = true;
        break;
      case "--verbose":
        out.verbose = true;
        break;
      case "--only-issues":
        out.onlyIssues = takeNext(argv, i)
          .split(",")
          .map((s) => Number(s.trim()))
          .filter(Number.isFinite);
        i++;
        break;
      default:
        throw new Error(`Unknown arg: ${a}`);
    }
  }

  if (!out.owner) throw new Error("--owner is required");
  if (!out.repo) throw new Error("--repo is required");

  return out;
}
