/**
 * Shared Amazon Q Developer (Kiro / AWS CodeWhisperer) region resolution.
 *
 * TWO DISTINCT REGIONS — verified against the AWS docs "Amazon Q Developer Pro Region support"
 * ("Supported Regions for the Q Developer console and Q Developer profile"):
 *
 *   • IdC / OIDC / token region — `providerSpecificData.region`. May be ANY of the ~30 IdC-
 *     supported AWS regions (us-east-1, us-west-2, ca-central-1, sa-east-1, eu-west-1/2/3,
 *     eu-central-1/2, eu-north-1, eu-south-1/2, ap-south-1/2, ap-east-1/2, ap-southeast-1..7,
 *     ap-northeast-1/2/3, me-central-1, me-south-1, af-south-1, il-central-1, …). Used ONLY for
 *     `oidc.{region}.amazonaws.com` token mint/refresh (see tokenRefresh.ts / oauth providers).
 *   • Q Developer PROFILE / RUNTIME region — where the `profileArn` lives and every CodeWhisperer
 *     runtime call is served (generateAssistantResponse, GetUsageLimits, ListAvailableModels,
 *     ListAvailableProfiles). AWS currently hosts the profile ONLY in us-east-1 and eu-central-1,
 *     REGARDLESS of the IdC region ("Regardless of the IAM Identity Center Region, data is stored
 *     in the Region where you create the Amazon Q Developer profile"). The AWS docs' own example:
 *     an IdC in us-west-1 → profile in us-east-1.
 *
 * Consequences enforced here:
 *   • The RUNTIME region is the region embedded in the `profileArn` (authoritative — whatever
 *     region AWS actually hosts the profile in), NOT the IdC region. Routing a runtime call to
 *     `q.{idcRegion}.amazonaws.com` for a non-profile IdC region (e.g. q.eu-north-1, which does
 *     not exist as a Q Developer runtime endpoint) is the root cause of the "Kiro IAM shows no
 *     limits + every request returns 502" failure.
 *   • profileArn discovery works for an IdC in ANY region: it probes the known profile regions
 *     (us-east-1 / eu-central-1) with the cross-region SSO token, AND the IdC's own region as a
 *     forward-compatible fallback (in case AWS ever co-locates or expands profile regions). The
 *     discovered ARN's region then drives every runtime call.
 */

// Canonical AWS region shape — kept local (identical to AWS_REGION_PATTERN in
// src/lib/oauth/constants/oauth.ts) so this open-sse module has no cross-tree import just to
// validate a string. Guards against SSRF via region injection (GHSA-6mwv-4mrm-5p3m): the value
// is interpolated into upstream URLs.
export const AWS_REGION_PATTERN = /^[a-z]{2}-[a-z]+-\d{1,2}$/;

/**
 * Regions where the Amazon Q Developer *profile* is currently hosted (AWS docs: "Supported
 * Regions for the Q Developer console and Q Developer profile"). These are the guaranteed
 * discovery targets and the only regions trusted as a runtime fallback when no profileArn is
 * known. The profileArn's own region is always honored above this list, so a future AWS
 * profile-region expansion works automatically once an ARN is discovered.
 */
export const KIRO_PROFILE_REGIONS = ["us-east-1", "eu-central-1"] as const;

/**
 * CodeWhisperer / Amazon Q runtime host for a region. us-east-1 keeps the legacy
 * codewhisperer.us-east-1 host (AWS Builder ID home region); other regions use the regional
 * Amazon Q endpoint `q.{region}.amazonaws.com` — codewhisperer.{region}.amazonaws.com does not
 * resolve for non-us-east-1 regions.
 */
export function kiroRuntimeHost(region: string): string {
  return region === "us-east-1"
    ? "https://codewhisperer.us-east-1.amazonaws.com"
    : `https://q.${region}.amazonaws.com`;
}

/** Extract the region from a CodeWhisperer profile ARN (`arn:aws:codewhisperer:{region}:...`). */
export function regionFromKiroProfileArn(profileArn?: string | null): string | undefined {
  if (typeof profileArn !== "string") return undefined;
  return profileArn.toLowerCase().match(/^arn:aws:codewhisperer:([a-z0-9-]+):/)?.[1];
}

function normalizeRegion(region: unknown): string {
  return typeof region === "string" ? region.trim().toLowerCase() : "";
}

/**
 * Resolve the RUNTIME region for CodeWhisperer / Amazon Q calls.
 *
 * Priority:
 *   1. The region embedded in the `profileArn` — authoritative, this is where the Q Developer
 *      profile (and thus the runtime) actually lives.
 *   2. A stored region ONLY when it is a valid Q Developer profile region (us-east-1 /
 *      eu-central-1). A stored IdC region that is not a Q profile region (e.g. eu-north-1) is
 *      deliberately IGNORED for runtime — it is a token/OIDC region, not a runtime region.
 *   3. us-east-1 (CodeWhisperer home region) as the final fallback.
 */
export function resolveKiroRuntimeRegion(
  providerSpecificData: { region?: unknown; profileArn?: unknown } | null | undefined
): string {
  const fromArn = regionFromKiroProfileArn(
    typeof providerSpecificData?.profileArn === "string"
      ? providerSpecificData.profileArn
      : undefined
  );
  if (fromArn) return fromArn;

  const stored = normalizeRegion(providerSpecificData?.region);
  if (stored && (KIRO_PROFILE_REGIONS as readonly string[]).includes(stored)) return stored;

  return "us-east-1";
}

/**
 * Build the ordered list of regions to probe for `ListAvailableProfiles`.
 *
 * The Amazon Q Developer profile (and thus every runtime endpoint) is currently hosted only in
 * KIRO_PROFILE_REGIONS (us-east-1 / eu-central-1) regardless of the IdC region, so those are
 * probed FIRST — EU-first when the IdC region is in EMEA (eu-, af-, me-, il- prefixes) to
 * minimize latency. The IdC/stored region is then appended as a forward-compatible fallback: if
 * AWS ever co-locates the profile with the IdC, or expands the profile-region list, a same-region
 * probe still finds it. It is only appended when it is a valid AWS region distinct from the known
 * profile regions; probing a region with no profile simply returns nothing and we fall through.
 * This makes discovery work for an IdC in ANY region (us-west-2, ap-southeast-2, me-central-1,
 * af-south-1, …), not just eu-north-1.
 */
export function buildKiroProfileDiscoveryRegions(storedRegion?: string | null): string[] {
  const stored = normalizeRegion(storedRegion);
  const preferEu = /^(eu|af|me|il)-/.test(stored);
  const regions: string[] = preferEu
    ? ["eu-central-1", "us-east-1"]
    : ["us-east-1", "eu-central-1"];

  if (stored && AWS_REGION_PATTERN.test(stored) && !regions.includes(stored)) {
    regions.push(stored);
  }
  return regions;
}

async function listKiroProfileArnForRegion(
  accessToken: string,
  region: string,
  fetchImpl: typeof fetch
): Promise<string | undefined> {
  // Defensive: region comes from a hardcoded allowlist here, but validate before it is
  // interpolated into the runtime host (SSRF guard, GHSA-6mwv-4mrm-5p3m).
  if (!AWS_REGION_PATTERN.test(region)) return undefined;
  try {
    const response = await fetchImpl(`${kiroRuntimeHost(region)}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-amz-json-1.0",
        Accept: "application/json",
        "x-amz-target": "AmazonCodeWhispererService.ListAvailableProfiles",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ maxResults: 10 }),
      // Never let a hung/region-mismatched profile lookup block login or the quota refresh.
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return undefined;

    const data = (await response.json()) as { profiles?: unknown };
    const profiles = Array.isArray(data?.profiles) ? data.profiles : [];
    // Prefer a profile whose ARN region matches the region we queried; else take the first.
    const matched =
      profiles.find((profile: unknown) => {
        const arn = (profile as { arn?: unknown })?.arn;
        return typeof arn === "string" && regionFromKiroProfileArn(arn) === region;
      }) || profiles[0];
    const arn = (matched as { arn?: unknown })?.arn;
    return typeof arn === "string" && arn.length > 0 ? arn : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Discover a Kiro/CodeWhisperer profile ARN by probing the Q Developer profile regions
 * (us-east-1 / eu-central-1) AND the IdC/stored region with the account's access token. The SSO
 * bearer token minted from the IdC region works cross-region against the Q Developer profile's
 * region (AWS's documented multi-region IdC ⇄ profile setup), so an IdC in ANY region resolves.
 * Returns the first ARN found (its embedded region is the authoritative runtime region), or
 * undefined when no profile is available (e.g. AWS Builder ID accounts, or an org/token with no
 * Kiro entitlement). Best-effort: never throws.
 */
export async function discoverKiroProfileArnAcrossRegions(
  accessToken: string | null | undefined,
  storedRegion?: string | null,
  fetchImpl?: typeof fetch
): Promise<string | undefined> {
  const token = typeof accessToken === "string" ? accessToken.trim() : "";
  if (!token) return undefined;

  // Resolve fetch at call time (not module-load) so callers/tests that swap globalThis.fetch
  // are honored when no explicit implementation is injected.
  const doFetch = fetchImpl ?? globalThis.fetch;

  for (const region of buildKiroProfileDiscoveryRegions(storedRegion)) {
    const arn = await listKiroProfileArnForRegion(token, region, doFetch);
    if (arn) return arn;
  }
  return undefined;
}
