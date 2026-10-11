export interface TencentAccount {
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

export function parseResetTime(value: unknown): string | null {
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

export function num(precise: unknown, plain: unknown): number {
  const n = Number(precise ?? plain);
  return Number.isFinite(n) ? n : 0;
}

export function refillCadence(acc: TencentAccount): "Monthly" | "Weekly" | "Daily" {
  const start = parseResetTime(acc.CycleStartTime);
  const end = parseResetTime(acc.CycleEndTime);
  if (start && end) {
    const days = (new Date(end).getTime() - new Date(start).getTime()) / 86400000;
    if (days <= 1.5) return "Daily";
    if (days <= 10) return "Weekly";
  }
  return "Monthly";
}

export function cycleEndMs(acc: TencentAccount): number {
  const r = parseResetTime(acc.CycleEndTime);
  return r ? new Date(r).getTime() : Number.POSITIVE_INFINITY;
}

export function deductionEndMs(acc: TencentAccount): number {
  const v = acc.DeductionEndTime;
  if (typeof v === "number") return v < 1e12 ? v * 1000 : v;
  if (typeof v === "string" && /^\d+$/.test(v)) {
    const n = Number(v);
    return n < 1e12 ? n * 1000 : n;
  }
  const r = parseResetTime(v);
  return r ? new Date(r).getTime() : Number.POSITIVE_INFINITY;
}

export const REFILL_GAP_MS = 2 * 24 * 60 * 60 * 1000;
export function isRefill(acc: TencentAccount): boolean {
  const ce = cycleEndMs(acc);
  const de = deductionEndMs(acc);
  return Number.isFinite(ce) && Number.isFinite(de) && de - ce > REFILL_GAP_MS;
}

export interface CodeBuddyUsageResult {
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

export interface CodeBuddyQuotaOptions {
  url: string;
  userAgent: string;
  ideType: string;
  label: string;
}

export async function fetchCodeBuddyQuotaFromEndpoint(
  accessToken: string | undefined,
  apiKey: string | undefined,
  options: CodeBuddyQuotaOptions
): Promise<CodeBuddyUsageResult> {
  const token = accessToken || apiKey;
  const { url, userAgent, ideType, label } = options;
  if (!token) {
    return { message: `${label} credential not available.` };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": userAgent,
        "X-Product": "SaaS",
        "X-IDE-Type": ideType,
        "X-IDE-Name": ideType,
        "x-requested-with": "XMLHttpRequest",
        "x-codebuddy-request": "1",
      },
      body: "{}",
    });

    if (response.status === 401 || response.status === 403) {
      return { message: `${label} credential invalid or expired.` };
    }
    if (!response.ok) {
      return { message: `${label} quota API error (${response.status}).` };
    }

    const json = (await response.json()) as {
      code?: number;
      msg?: string;
      data?: {
        Response?: {
          Data?: {
            Accounts?: TencentAccount[];
          };
        };
      };
    };
    if (json?.code !== 0) {
      return { message: `${label} quota error: ${json?.msg || "unknown"}` };
    }

    const data = json?.data?.Response?.Data || {};
    const accountsRaw: TencentAccount[] = Array.isArray(data.Accounts) ? data.Accounts : [];
    if (accountsRaw.length === 0) {
      return { message: `${label} connected. No credit package found.` };
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
    const plan = basePkg.PackageName || basePkg.SubProductName || label;

    return { plan, quotas };
  } catch (_error: unknown) {
    return { message: `${label} error: failed to fetch quota.` };
  }
}
