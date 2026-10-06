export interface KimiJwtPayload {
  sub?: string;
  iss?: string;
  aud?: string[];
  exp?: number;
  iat?: number;
  region?: string;
  space_id?: string;
  typ?: string;
  membership?: { level?: number };
  [key: string]: unknown;
}

export function parseKimiJwt(token: string): KimiJwtPayload | null {
  if (!token || typeof token !== "string") return null;
  const parts = token.trim().split(".");
  if (parts.length !== 3) return null;
  try {
    const payloadJson = Buffer.from(parts[1], "base64url").toString("utf8");
    const payload = JSON.parse(payloadJson);
    if (typeof payload !== "object" || payload === null) return null;
    return payload as KimiJwtPayload;
  } catch {
    return null;
  }
}

export function getKimiTokenExpiration(token: string): {
  expiresAtSec: number;
  issuedAtSec: number;
  remainingSec: number;
  isExpired: boolean;
} | null {
  const payload = parseKimiJwt(token);
  if (!payload || typeof payload.exp !== "number") return null;

  const nowSec = Math.floor(Date.now() / 1000);
  const remainingSec = payload.exp - nowSec;
  return {
    expiresAtSec: payload.exp,
    issuedAtSec: typeof payload.iat === "number" ? payload.iat : 0,
    remainingSec,
    isExpired: remainingSec <= 0,
  };
}

export function isKimiTokenExpiringSoon(token: string, thresholdSec = 240): boolean {
  const exp = getKimiTokenExpiration(token);
  if (!exp) return false;
  return exp.remainingSec <= thresholdSec;
}
