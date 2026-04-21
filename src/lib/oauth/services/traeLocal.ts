import { readFile, readdir } from "fs/promises";
import { homedir } from "os";
import { join } from "path";
import { isKnownInvalidTraeChatBaseUrl, normalizeTraeChatBaseUrl } from "./trae";

const TRAE_AUTH_KEY_PREFIX = "iCubeAuthInfo://";
const TRAE_SERVER_KEY_PREFIX = "iCubeServerData://";
const TRAE_ENTITLEMENT_KEY_PREFIX = "iCubeEntitlementInfo://";
const TRAE_LOG_FILE_CANDIDATES = [
  "sharedprocess.log",
  "main.log",
  "window1/renderer.log",
  "window1/exthost/trae.ai-code-completion/Trae AI Code Client.log",
  "window1/exthost/trae.ai-code-completion/Trae AI Code Completion.log",
  "window1/exthost/trae.ai-code-completion/completion.log",
];
const TRAE_CHAT_URL_PATTERN =
  /https?:\/\/[^\s"'<>]+(?:\/v1\/chat\/completions|\/chat\/completions)(?:\?[^\s"'<>]*)?/gi;

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function normalizeNonEmptyString(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function pickString(root: unknown, paths: string[][]): string {
  const record = asRecord(root);
  if (!record) return "";

  for (const path of paths) {
    let current: unknown = record;
    for (const key of path) {
      const next = asRecord(current);
      if (!next) {
        current = null;
        break;
      }
      current = next[key];
    }

    const normalized = normalizeNonEmptyString(current);
    if (normalized) return normalized;
  }

  return "";
}

function parseValueOrJsonString(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!(trimmed.startsWith("{") || trimmed.startsWith("["))) return trimmed;

  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed;
  }
}

function getFirstStorageObject(root: JsonRecord, prefix: string): unknown {
  for (const [key, value] of Object.entries(root)) {
    if (key.startsWith(prefix)) {
      return parseValueOrJsonString(value);
    }
  }
  return null;
}

function getTraeStorageRoot(value: unknown): JsonRecord | null {
  return asRecord(parseValueOrJsonString(value));
}

export function getDefaultTraeStoragePath() {
  if (process.platform === "darwin") {
    return join(homedir(), "Library/Application Support/Trae/User/globalStorage/storage.json");
  }
  if (process.platform === "win32") {
    return join(process.env.APPDATA || "", "Trae/User/globalStorage/storage.json");
  }
  if (process.platform === "linux") {
    return join(homedir(), ".config/Trae/User/globalStorage/storage.json");
  }
  throw new Error("Unsupported platform for Trae auto-import");
}

export function getDefaultTraeLogsPath() {
  if (process.platform === "darwin") {
    return join(homedir(), "Library/Application Support/Trae/logs");
  }
  if (process.platform === "win32") {
    return join(process.env.APPDATA || "", "Trae/logs");
  }
  if (process.platform === "linux") {
    return join(homedir(), ".config/Trae/logs");
  }
  throw new Error("Unsupported platform for Trae log discovery");
}

export type TraeStoredSession = {
  accessToken: string;
  refreshToken: string | null;
  loginHost: string;
  email: string | null;
  userId: string | null;
  nickname: string | null;
  authRaw: unknown;
  serverRaw: unknown;
  entitlementRaw: unknown;
  usertagRaw: string | null;
};

export function extractTraeStoredSession(raw: unknown): TraeStoredSession {
  const root = getTraeStorageRoot(raw);
  if (!root) {
    throw new Error("Trae storage root must be a JSON object");
  }

  const authRaw =
    getFirstStorageObject(root, TRAE_AUTH_KEY_PREFIX) ||
    parseValueOrJsonString(root["iCubeAuthInfo://icube.cloudide"]);
  const serverRaw =
    getFirstStorageObject(root, TRAE_SERVER_KEY_PREFIX) ||
    parseValueOrJsonString(root["iCubeServerData://icube.cloudide"]);
  const entitlementRaw =
    getFirstStorageObject(root, TRAE_ENTITLEMENT_KEY_PREFIX) ||
    parseValueOrJsonString(root["iCubeEntitlementInfo://icube.cloudide"]);

  const accessToken =
    pickString(authRaw, [
      ["accessToken"],
      ["access_token"],
      ["token"],
      ["data", "accessToken"],
      ["data", "access_token"],
      ["auth", "accessToken"],
      ["auth", "token"],
    ]) ||
    pickString(serverRaw, [
      ["accessToken"],
      ["access_token"],
      ["token"],
      ["data", "accessToken"],
      ["data", "token"],
    ]);

  if (!accessToken) {
    throw new Error("Trae local storage does not contain an access token");
  }

  const refreshToken =
    pickString(authRaw, [
      ["refreshToken"],
      ["refresh_token"],
      ["RefreshToken"],
      ["exchangeResponse", "Result", "RefreshToken"],
      ["data", "refreshToken"],
      ["data", "refresh_token"],
    ]) || null;

  const loginHost =
    pickString(authRaw, [
      ["loginHost"],
      ["host"],
      ["callbackQuery", "host"],
      ["exchangeResponse", "Result", "loginHost"],
      ["data", "loginHost"],
    ]) ||
    pickString(serverRaw, [["loginHost"], ["host"], ["data", "host"]]) ||
    "https://www.trae.ai";

  const email =
    pickString(authRaw, [
      ["email"],
      ["account", "email"],
      ["account", "nonPlainTextEmail"],
      ["NonPlainTextEmail"],
      ["user", "email"],
    ]) || null;

  const userId =
    pickString(authRaw, [["userId"], ["uid"], ["id"], ["account", "uid"]]) ||
    pickString(serverRaw, [["userId"], ["uid"], ["id"]]) ||
    null;

  const nickname =
    pickString(authRaw, [["account", "username"], ["nickname"], ["name"]]) ||
    pickString(serverRaw, [["nickname"], ["name"]]) ||
    null;

  const usertagRaw = normalizeNonEmptyString(root["iCubeAuthInfo://usertag"]) || null;

  return {
    accessToken,
    refreshToken,
    loginHost,
    email,
    userId,
    nickname,
    authRaw,
    serverRaw,
    entitlementRaw,
    usertagRaw,
  };
}

export async function readTraeStoredSession(storagePath = getDefaultTraeStoragePath()) {
  const raw = await readFile(storagePath, "utf-8").catch((error: unknown) => {
    throw new Error(
      `Failed to read Trae storage.json at ${storagePath}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  });

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error(
      `Failed to parse Trae storage.json at ${storagePath}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }

  return {
    storagePath,
    session: extractTraeStoredSession(parsed),
  };
}

export function extractTraeChatBaseUrlFromLogText(text: string): string {
  if (!text) return "";

  let match: RegExpExecArray | null;
  let candidate = "";
  TRAE_CHAT_URL_PATTERN.lastIndex = 0;

  while ((match = TRAE_CHAT_URL_PATTERN.exec(text))) {
    const normalized = normalizeTraeChatBaseUrl(match[0]);
    if (!normalized || isKnownInvalidTraeChatBaseUrl(normalized)) {
      continue;
    }
    candidate = normalized;
  }

  return candidate;
}

export async function discoverTraeChatBaseUrl(logsPath = getDefaultTraeLogsPath()) {
  const logDirEntries = await readdir(logsPath, { withFileTypes: true }).catch(() => []);
  const logDirs = logDirEntries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => right.localeCompare(left))
    .slice(0, 10);

  for (const logDir of logDirs) {
    for (const relativePath of TRAE_LOG_FILE_CANDIDATES) {
      const fullPath = join(logsPath, logDir, relativePath);
      const text = await readFile(fullPath, "utf-8").catch(() => "");
      const baseUrl = extractTraeChatBaseUrlFromLogText(text);
      if (baseUrl) {
        return {
          baseUrl,
          source: fullPath,
        };
      }
    }
  }

  return null;
}
