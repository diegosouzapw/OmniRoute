/**
 * Release channel of a running OmniRoute version, plus the published channel
 * heads, for `GET /api/system/version` (docs/ops/RELEASE_STRATEGY.md):
 *
 *   latest  — the current stable major (v3 until the 4.0 GA)
 *   next    — release candidates / betas / alphas
 *   nightly — `<core>-nightly.<YYYYMMDD>.<sha7>` builds of `develop`
 *   lts     — stable releases of the previous major once a newer major is `latest`
 *
 * The rules mirror `resolveDistTag()` in scripts/release/dist-tag.mjs — the
 * script the publish workflows use to pick the npm dist-tag. They are duplicated
 * (the app bundle does not import from scripts/) and kept identical by the
 * parity test in tests/unit/release-channel.test.ts.
 */

export type ReleaseChannel = "latest" | "next" | "nightly" | "lts";

/** Published head of each npm dist-tag (`npm view omniroute dist-tags`). */
export type ReleaseChannels = {
  latest: string;
  next?: string;
  nightly?: string;
  lts?: string;
};

const SEMVER_RE =
  /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z.-]+)?$/;
const NIGHTLY_PRERELEASE_RE = /^nightly(\.|$)/;

function parse(version: string | null | undefined) {
  const match = SEMVER_RE.exec(String(version ?? "").trim());
  if (!match) return null;
  return { major: Number(match[1]), prerelease: match[4] ?? null };
}

/**
 * Channel a version belongs to. `latestMajor` is the major currently published
 * on the `latest` dist-tag; without it a stable version is always `latest`.
 * An unparsable version (local dev build) is reported as `latest`.
 */
export function resolveReleaseChannel(
  version: string,
  opts: { latestMajor?: number | null } = {}
): ReleaseChannel {
  const parsed = parse(version);
  if (!parsed) return "latest";
  if (parsed.prerelease) {
    return NIGHTLY_PRERELEASE_RE.test(parsed.prerelease) ? "nightly" : "next";
  }
  const { latestMajor } = opts;
  if (Number.isInteger(latestMajor) && parsed.major < (latestMajor as number)) return "lts";
  return "latest";
}

/**
 * `releaseChannel` + `channels` for `GET /api/system/version`. `channels.latest`
 * is always present: the `latest` dist-tag when known, else the separately
 * resolved latest version, else "unavailable". The running version is `lts`
 * only when `channels.latest` is a newer major.
 */
export function describeReleaseChannels(
  current: string,
  distTags: Partial<Record<ReleaseChannel, string>> | null,
  latestFallback: string | null
): { releaseChannel: ReleaseChannel; channels: ReleaseChannels } {
  const channels: ReleaseChannels = {
    latest: distTags?.latest ?? latestFallback ?? "unavailable",
  };
  for (const key of ["next", "nightly", "lts"] as const) {
    if (distTags?.[key]) channels[key] = distTags[key];
  }
  const latestMajor = parse(channels.latest)?.major ?? null;
  return { releaseChannel: resolveReleaseChannel(current, { latestMajor }), channels };
}
