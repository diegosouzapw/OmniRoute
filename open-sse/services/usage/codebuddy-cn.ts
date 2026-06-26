/**
 * CodeBuddy CN usage handler — scoped to the "codebuddy-cn" provider.
 *
 * Quota lives behind a Tencent billing endpoint (POST, payload wrapped twice
 * under data.Response.Data). It mixes two credit types that must NOT be merged:
 *
 *  - Refill / base ("基础体验包"): recurring allowance whose cycle resets long
 *    before the resource itself expires (CycleEndTime << DeductionEndTime).
 *    Live numbers in the *Cycle* fields; resetAt = next refresh.
 *  - Bonus ("活动赠送包"): one-shot credits that run a single cycle and expire
 *    (CycleEndTime ≈ DeductionEndTime). Numbers in the plain Capacity fields.
 *
 * One quota row per package — cadence label (Monthly/Weekly/Daily) for refill
 * packs, "Bonus Pack N" for bonus packs (soonest-expiring first).
 */

const USAGE_URL = "https://copilot.tencent.com/v2/billing/meter/get-user-resource";

interface TencentAccount {
  PackageName?: string;
  SubProductName?: string;
  CycleStartTime?: string | number;
  CycleEndTime?: string | number;
  DeductionEndTime?: string | number;
  CycleCapacitySize?: number | string;
  CycleCapacitySizePrecise?: string | number;
  CycleCapacityUsed?: number | string;
  CycleCapacityUsedPrecise?: string | number;
  CapacitySize?: number | string;
  CapacitySizePrecise?: string | number;
  CapacityUsed?: number | string;
  CapacityUsedPrecise?: string | number;
}

function parseResetTime(value: unknown): string | null {
  if (!value) return null;
  try {
    if (value instanceof Date) return value.toISOString();
    if (typeof value === "number") {
      const ts = value < 1e12 ? value * 1000 : value;
      const d = new Date(ts);
      return d.getTime() > 0 ? d.toISOString() : null;
    }
    if (typeof value === "string") {
      if (/^\d+$/.test(value)) {
        const n = Number(value);
        const d = new Date(n < 1e12 ? n * 1000 : n);
        return d.getTime() > 0 ? d.toISOString() : null;
      }
      const d = new Date(value);
      return Number.isNaN(d.getTime()) || d.getTime() <= 0 ? null : d.toISOString();
    }
    return null;
  } catch {
    return null;
  }
}

// Prefer the *Precise string fields (exact), fall back to the numeric ones.
function num(precise: unknown, plain: unknown): number {
  const n = Number(precise ?? plain);
  return Number.isFinite(n) ? n : 0;
}

// Label a refill pack by its cycle length (Monthly is the common CodeBuddy case).
function refillCadence(acc: TencentAccount): "Monthly" | "Weekly" | "Daily" {
  const start = parseResetTime(acc.CycleStartTime);
  const end = parseResetTime(acc.CycleEndTime);
  if (start && end) {
    const days = (new Date(end).getTime() - new Date(start).getTime()) / 86400000;
    if (days <= 1.5) return "Daily";
    if (days <= 10) return "Weekly";
  }
  return "Monthly";
}

function cycleEndMs(acc: TencentAccount): number {
  const r = parseResetTime(acc.CycleEndTime);
  return r ? new Date(r).getTime() : Number.POSITIVE_INFINITY;
}

function deductionEndMs(acc: TencentAccount): number {
  const v = acc.DeductionEndTime;
  if (typeof v === "number") return (v < 1e12 ? v * 1000 : v);
  if (typeof v === "string" && /^\d+$/.test(v)) {
    const n = Number(v);
    return n < 1e12 ? n * 1000 : n;
  }
  const r = parseResetTime(v);
  return r ? new Date(r).getTime() : Number.POSITIVE_INFINITY;
}

// Refill packs roll into a new cycle before the resource expires; bonus packs
// end at expiry. >2d gap between cycle end and validity end = refill.
const REFILL_GAP_MS = 2 * 24 * 60 * 60 * 1000;
function isRefill(acc: TencentAccount): boolean {
  const ce = cycleEndMs(acc);
  const de = deductionEndMs(acc);
  return Number.isFinite(ce) && Number.isFinite(de) && de - ce > REFILL_GAP_MS;
}

interface CodeBuddyUsageResult {
  plan?: string;
  quotas?: Record<
    string,
    {
      used: number;
      total: number;
      resetAt: string | null;
      unlimited: boolean;
    }
  >;
  message?: string;
}

export async function getCodeBuddyCnUsage(
  accessToken?: string,
  apiKey?: string,
  _providerSpecificData?: unknown
): Promise<CodeBuddyUsageResult> {
  const token = accessToken || apiKey;
  if (!token) {
    return { message: "CodeBuddy CN credential not available." };
  }

  try {
    const response = await fetch(USAGE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "CLI/2.108.1 CodeBuddy/2.108.1",
        "X-Product": "SaaS",
        "X-IDE-Type": "CLI",
        "X-IDE-Name": "CLI",
        "x-requested-with": "XMLHttpRequest",
        "x-codebuddy-request": "1",
      },
      body: "{}",
    });

    if (response.status === 401 || response.status === 403) {
      return { message: "CodeBuddy CN credential invalid or expired." };
    }
    if (!response.ok) {
      return { message: `CodeBuddy CN quota API error (${response.status}).` };
    }

    const json: any = await response.json();
    if (json?.code !== 0) {
      return { message: `CodeBuddy CN quota error: ${json?.msg || "unknown"}` };
    }

    const data = json?.data?.Response?.Data || {};
    const accountsRaw: TencentAccount[] = Array.isArray(data.Accounts) ? data.Accounts : [];
    if (accountsRaw.length === 0) {
      return { message: "CodeBuddy CN connected. No credit package found." };
    }

    const byExpiry = (a: TencentAccount, b: TencentAccount) => cycleEndMs(a) - cycleEndMs(b);
    const refills = accountsRaw.filter(isRefill).sort(byExpiry);
    const bonuses = accountsRaw.filter((a) => !isRefill(a)).sort(byExpiry);

    const quotas: NonNullable<CodeBuddyUsageResult["quotas"]> = {};
    const seenRefill: Record<string, number> = {};
    refills.forEach((acc) => {
      const base = refillCadence(acc);
      seenRefill[base] = (seenRefill[base] || 0) + 1;
      const name = seenRefill[base] > 1 ? `${base} ${seenRefill[base]}` : base;
      quotas[name] = {
        used: num(acc.CycleCapacityUsedPrecise, acc.CycleCapacityUsed),
        total: num(acc.CycleCapacitySizePrecise, acc.CycleCapacitySize),
        resetAt: parseResetTime(acc.CycleEndTime),
        unlimited: false,
      };
    });
    bonuses.forEach((acc, i) => {
      quotas[`Bonus Pack ${i + 1}`] = {
        used: num(acc.CapacityUsedPrecise, acc.CapacityUsed),
        total: num(acc.CapacitySizePrecise, acc.CapacitySize),
        resetAt: parseResetTime(acc.CycleEndTime),
        unlimited: false,
      };
    });

    const basePkg = refills[0] || accountsRaw[0] || {};
    const plan = basePkg.PackageName || basePkg.SubProductName || "CodeBuddy CN";

    return { plan, quotas };
  } catch (error: any) {
    // Hard Rule #12: no raw err.message in any HTTP/SSE/executor response. Usage
    // handler returns a controlled string for the dashboard; do not include the
    // raw exception text in case it carries a path/stack snippet.
    return { message: "CodeBuddy CN error: failed to fetch quota." };
  }
}

export default getCodeBuddyCnUsage;
