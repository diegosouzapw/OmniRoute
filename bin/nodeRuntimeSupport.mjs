#!/usr/bin/env node

export const SECURE_NODE_LINES = Object.freeze([
  Object.freeze({ major: 20, minor: 20, patch: 2 }),
  Object.freeze({ major: 22, minor: 22, patch: 2 }),
]);

export const RECOMMENDED_NODE_VERSION = "22.22.2";
export const SUPPORTED_NODE_RANGE = ">=20.20.2 <21 || >=22.22.2 <23";
export const SUPPORTED_NODE_DISPLAY = "Node.js 20.20.2+ (20.x LTS) or 22.22.2+ (22.x LTS)";

function formatVersion(version) {
  return `${version.major}.${version.minor}.${version.patch}`;
}

export function parseNodeVersion(version = process.versions.node) {
  const rawInput = String(version || process.versions.node || "0.0.0").trim();
  const normalized = rawInput.replace(/^v/i, "");
  const parts = normalized.split(".");
  const major = Number.parseInt(parts[0] || "0", 10);
  const minor = Number.parseInt(parts[1] || "0", 10);
  const patch = Number.parseInt(parts[2] || "0", 10);

  return {
    raw: normalized ? `v${normalized}` : "v0.0.0",
    normalized: normalized || "0.0.0",
    major: Number.isFinite(major) ? major : 0,
    minor: Number.isFinite(minor) ? minor : 0,
    patch: Number.isFinite(patch) ? patch : 0,
  };
}

export function compareNodeVersions(a, b) {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  return a.patch - b.patch;
}

export function getSecureFloorForMajor(major) {
  return SECURE_NODE_LINES.find((line) => line.major === major) || null;
}

export function getNodeRuntimeSupport(version = process.versions.node) {
  const parsed = parseNodeVersion(version);
  const secureFloor = getSecureFloorForMajor(parsed.major);
  const nodeCompatible = secureFloor ? compareNodeVersions(parsed, secureFloor) >= 0 : false;

  let reason = "unsupported-major";
  if (nodeCompatible) {
    reason = "supported";
  } else if (secureFloor) {
    reason = "below-security-floor";
  } else if (parsed.major >= 24) {
    reason = "native-addon-incompatible";
  }

  return {
    nodeVersion: parsed.raw,
    nodeCompatible,
    reason,
    supportedRange: SUPPORTED_NODE_RANGE,
    supportedDisplay: SUPPORTED_NODE_DISPLAY,
    recommendedVersion: `v${RECOMMENDED_NODE_VERSION}`,
    minimumSecureVersion: secureFloor ? `v${formatVersion(secureFloor)}` : null,
  };
}

export function getNodeRuntimeWarning(version = process.versions.node) {
  const support = getNodeRuntimeSupport(version);
  if (support.nodeCompatible) return null;

  if (support.reason === "below-security-floor" && support.minimumSecureVersion) {
    return `Node.js ${support.nodeVersion} is below the patched minimum ${support.minimumSecureVersion} for this LTS line.`;
  }

  if (support.reason === "native-addon-incompatible") {
    return `Node.js ${support.nodeVersion} is outside the supported LTS lines and may fail at runtime because better-sqlite3 does not support Node.js 24+ here.`;
  }

  return `Node.js ${support.nodeVersion} is outside OmniRoute's approved secure runtime policy.`;
}
