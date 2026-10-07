import { createHash } from "node:crypto";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";

import { atomicWriteFile, getConfigDir } from "../../vendor/codex-chatgpt-web/config.ts";
import { loginVerificationMarkerPath } from "../../vendor/codex-chatgpt-web/browser-login.ts";

function connectionSegment(connectionId: string): string {
  return createHash("sha256").update(connectionId).digest("hex").slice(0, 32);
}

export function connectionRuntimePaths(connectionId: string) {
  const root = join(getConfigDir(), "connections", connectionSegment(connectionId));
  return {
    root,
    storageStatePath: join(root, "storage-state.json"),
    brokerSocketPath: join(getConfigDir(), "runtime", "turn-broker.sock"),
    threadEnvironmentStatePath: join(root, "thread-environments.json"),
    lunaCheckpointStatePath: join(root, "luna-checkpoints.json"),
  };
}

function cookieHeaderValue(raw: string): string {
  return raw.trim().replace(/^cookie\s*:\s*/i, "");
}

function parseCookies(raw: string): Array<Record<string, unknown>> {
  const header = cookieHeaderValue(raw);
  const pairs = header
    .split(/;\s*/)
    .map((part) => {
      const separator = part.indexOf("=");
      return separator > 0 ? [part.slice(0, separator).trim(), part.slice(separator + 1)] : null;
    })
    .filter((pair): pair is [string, string] => Boolean(pair?.[0]));
  if (!pairs.some(([name]) => /^__Secure-next-auth\.session-token(?:\.\d+)?$/.test(name))) {
    if (header.includes(";") || header.includes("=")) {
      throw new Error("ChatGPT Cookie header is missing __Secure-next-auth.session-token");
    }
    pairs.push(["__Secure-next-auth.session-token", header]);
  }
  return pairs.map(([name, value]) => ({
    name,
    value,
    domain: name.startsWith("__Host-") ? "chatgpt.com" : ".chatgpt.com",
    path: "/",
    expires: -1,
    secure: true,
    httpOnly: name.startsWith("__Secure-") || name.startsWith("__Host-"),
    sameSite: "Lax",
  }));
}

function cookieFingerprint(raw: string): string {
  return createHash("sha256").update(cookieHeaderValue(raw)).digest("hex");
}

function stateFingerprint(state: Record<string, unknown>): string {
  return createHash("sha256").update(JSON.stringify(state)).digest("hex");
}

function validStorageState(value: unknown): value is Record<string, unknown> {
  return (
    !!value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Array.isArray((value as Record<string, unknown>).cookies) &&
    Array.isArray((value as Record<string, unknown>).origins)
  );
}

export function readConnectionStorageState(path: string): Record<string, unknown> {
  const parsed = JSON.parse(readFileSync(path, "utf8")) as unknown;
  if (!validStorageState(parsed)) throw new Error("ChatGPT browser storage state is invalid");
  return parsed;
}

export function ensureConnectionStorageState(connectionId: string, rawCookie: string): string {
  const paths = connectionRuntimePaths(connectionId);
  const markerPath = loginVerificationMarkerPath(paths.storageStatePath);
  const fingerprint = cookieFingerprint(rawCookie);
  if (existsSync(paths.storageStatePath) && existsSync(markerPath)) {
    try {
      const marker = JSON.parse(readFileSync(markerPath, "utf8")) as Record<string, unknown>;
      if (
        marker.version === 1 &&
        marker.authenticated === true &&
        marker.cookieFingerprint === fingerprint
      ) {
        return paths.storageStatePath;
      }
    } catch {
      // Rebuild the state below.
    }
  }

  atomicWriteFile(
    paths.storageStatePath,
    `${JSON.stringify({ cookies: parseCookies(rawCookie), origins: [] })}\n`
  );
  atomicWriteFile(
    markerPath,
    `${JSON.stringify({
      version: 1,
      authenticated: true,
      verifiedAt: new Date().toISOString(),
      cookieFingerprint: fingerprint,
      pendingBrowserVerification: true,
    })}\n`
  );
  return paths.storageStatePath;
}

export function ensureConnectionStorageStateFromCredential(
  connectionId: string,
  credential: { cookie?: string; storageState?: Record<string, unknown> }
): string {
  if (credential.storageState) {
    if (!validStorageState(credential.storageState)) {
      throw new Error("Encrypted ChatGPT browser storage state is invalid");
    }
    const paths = connectionRuntimePaths(connectionId);
    const markerPath = loginVerificationMarkerPath(paths.storageStatePath);
    const fingerprint = stateFingerprint(credential.storageState);
    if (existsSync(paths.storageStatePath) && existsSync(markerPath)) {
      try {
        const marker = JSON.parse(readFileSync(markerPath, "utf8")) as Record<string, unknown>;
        if (
          marker.version === 1 &&
          marker.authenticated === true &&
          marker.pendingBrowserVerification !== true &&
          marker.storageStateFingerprint === fingerprint
        ) {
          return paths.storageStatePath;
        }
      } catch {
        // Rebuild the protected local working copy below.
      }
    }
    atomicWriteFile(paths.storageStatePath, `${JSON.stringify(credential.storageState)}\n`);
    atomicWriteFile(
      markerPath,
      `${JSON.stringify({
        version: 1,
        authenticated: true,
        verifiedAt: new Date().toISOString(),
        storageStateFingerprint: fingerprint,
        pendingBrowserVerification: false,
      })}\n`
    );
    return paths.storageStatePath;
  }
  if (!credential.cookie) throw new Error("ChatGPT browser credentials are missing");
  return ensureConnectionStorageState(connectionId, credential.cookie);
}

export function finalizeValidatedChatGptWebCodexSecrets(
  encodedCredential: string,
  validationId: string
): { encodedCredential: string; storageState: Record<string, unknown> } {
  const parsed = JSON.parse(encodedCredential) as Record<string, unknown>;
  const rawCookie = typeof parsed.cookie === "string" ? cookieHeaderValue(parsed.cookie) : "";
  if (!rawCookie) throw new Error("A fresh ChatGPT Cookie is required for browser validation");
  if (!/^validation-[a-f0-9]{24}$/.test(validationId)) {
    throw new Error("ChatGPT browser validation reference is invalid");
  }
  const paths = connectionRuntimePaths(validationId);
  const markerPath = loginVerificationMarkerPath(paths.storageStatePath);
  const marker = JSON.parse(readFileSync(markerPath, "utf8")) as Record<string, unknown>;
  if (
    marker.version !== 1 ||
    marker.authenticated !== true ||
    marker.pendingBrowserVerification === true ||
    marker.cookieFingerprint !== cookieFingerprint(rawCookie)
  ) {
    throw new Error("ChatGPT browser validation does not match the supplied Cookie");
  }
  const storageState = readConnectionStorageState(paths.storageStatePath);
  const runtimeKey = typeof parsed.runtimeKey === "string" ? parsed.runtimeKey.trim() : "";
  const next = JSON.stringify({
    version: 2,
    storageState,
    ...(runtimeKey ? { runtimeKey } : {}),
  });
  rmSync(paths.root, { recursive: true, force: true });
  return { encodedCredential: next, storageState };
}
