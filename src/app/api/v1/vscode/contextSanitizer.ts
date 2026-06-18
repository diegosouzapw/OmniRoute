type JsonObject = Record<string, unknown>;

const IMPLICIT_CONTEXT_KEYS = new Set([
  "activedocument",
  "activeeditor",
  "activetexteditor",
  "currenteditor",
  "currentfile",
  "currentselection",
  "editorcontext",
  "opentabs",
  "selectedtext",
  "selection",
  "visibleeditors",
]);

const EXPLICIT_CONTEXT_KEYS = new Set([
  "attachment",
  "attachments",
  "document",
  "documents",
  "file",
  "files",
  "reference",
  "references",
]);

const FILE_PATH_KEYS = ["filePath", "filepath", "path", "uri", "url"];
const CONTENT_KEYS = ["content", "contents", "text", "value", "data"];
const SENSITIVE_CONTEXT_REPLACEMENT = "[REDACTED SENSITIVE CONTEXT]";

// Path/extension patterns anchored to path separators or file extensions, so
// they only match actual file references. Safe to apply to free-form text.
const SENSITIVE_FILENAME_PATTERNS = [
  /(^|[\\/])\.env(\.|$)/i,
  /(^|[\\/])\.netrc$/i,
  /(^|[\\/])\.npmrc$/i,
  /(^|[\\/])\.pypirc$/i,
  /(^|[\\/])id_ed25519$/i,
  /(^|[\\/])id_rsa$/i,
  /(^|[\\/])local-docs[\\/]server-access\.md$/i,
  /(^|[\\/])server-access\.md$/i,
  /\.key$/i,
  /\.p12$/i,
  /\.pem$/i,
  /\.pfx$/i,
];

// Bare-word patterns. They correctly flag a sensitive *path segment* (e.g.
// `~/.aws/credentials`) at the object level, but the same words appear in
// legitimate prose ("how do I store API credentials?"). They must therefore be
// used ONLY for structured path detection, never to scrub free-form text.
const SENSITIVE_KEYWORD_PATTERNS = [/credentials/i, /kubeconfig/i, /secrets?/i];

// Object-level path detection (file path + content pairs) uses the full set.
const SENSITIVE_PATH_PATTERNS = [...SENSITIVE_FILENAME_PATTERNS, ...SENSITIVE_KEYWORD_PATTERNS];

// Free-form text scanning uses only the anchored filename patterns, so ordinary
// chat content mentioning words like "credentials" or "secrets" is preserved.
const SENSITIVE_TEXT_PATTERNS = SENSITIVE_FILENAME_PATTERNS;

const IMPLICIT_TEXT_BLOCK_PATTERN =
  /(^|\n)(active editor|current file|current selection|editor context|open tabs|selected text|visible editors):[\s\S]*?(?=\n\n(?:[A-Z][A-Za-z0-9 _-]{1,60}:|User request:|Request:)|$)/gi;

export type VscodeContextSanitizerAudit = {
  removedImplicitKeys: string[];
  redactedSensitivePaths: string[];
};

export type VscodeContextSanitizerResult<T> = {
  body: T;
  changed: boolean;
  audit: VscodeContextSanitizerAudit;
};

function isRecord(value: unknown): value is JsonObject {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizePath(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("file://")) {
    try {
      return decodeURIComponent(new URL(trimmed).pathname);
    } catch {
      return trimmed;
    }
  }

  return trimmed;
}

function getObjectPath(value: JsonObject): string | null {
  for (const key of FILE_PATH_KEYS) {
    const normalized = normalizePath(value[key]);
    if (normalized) return normalized;
  }

  return null;
}

function isSensitivePath(path: string): boolean {
  return SENSITIVE_PATH_PATTERNS.some((pattern) => pattern.test(path));
}

function collectExplicitPaths(
  value: unknown,
  parentKey = "",
  paths = new Set<string>()
): Set<string> {
  if (Array.isArray(value)) {
    for (const item of value) {
      collectExplicitPaths(item, parentKey, paths);
    }
    return paths;
  }

  if (!isRecord(value)) return paths;

  const lowerParentKey = parentKey.toLowerCase();
  const objectPath = getObjectPath(value);
  if (objectPath && EXPLICIT_CONTEXT_KEYS.has(lowerParentKey)) {
    paths.add(objectPath);
  }

  for (const [key, child] of Object.entries(value)) {
    collectExplicitPaths(child, key, paths);
  }

  return paths;
}

function redactSensitiveObject(value: JsonObject, audit: VscodeContextSanitizerAudit): boolean {
  const objectPath = getObjectPath(value);
  if (!objectPath || !isSensitivePath(objectPath)) return false;

  audit.redactedSensitivePaths.push(objectPath);
  let changed = false;

  for (const key of CONTENT_KEYS) {
    if (key in value && value[key] !== SENSITIVE_CONTEXT_REPLACEMENT) {
      value[key] = SENSITIVE_CONTEXT_REPLACEMENT;
      changed = true;
    }
  }

  return changed;
}

function sanitizeString(
  value: string,
  explicitPaths: Set<string>,
  audit: VscodeContextSanitizerAudit,
  parentKey = ""
) {
  let changed = false;
  let sanitized = value.replace(IMPLICIT_TEXT_BLOCK_PATTERN, (block, leadingNewline = "") => {
    const referencesExplicitPath = [...explicitPaths].some((path) => path && block.includes(path));
    if (referencesExplicitPath) return block;

    changed = true;
    audit.removedImplicitKeys.push("text:implicit-editor-context");
    return leadingNewline || "";
  });

  if (!FILE_PATH_KEYS.includes(parentKey)) {
    for (const pattern of SENSITIVE_TEXT_PATTERNS) {
      if (pattern.test(sanitized)) {
        sanitized = sanitized.replace(pattern, SENSITIVE_CONTEXT_REPLACEMENT);
        changed = true;
        audit.redactedSensitivePaths.push("text:sensitive-path");
      }
    }
  }

  return { value: sanitized, changed };
}

function sanitizeValue(
  value: unknown,
  explicitPaths: Set<string>,
  audit: VscodeContextSanitizerAudit,
  parentKey = ""
): { value: unknown; changed: boolean } {
  if (typeof value === "string") {
    return sanitizeString(value, explicitPaths, audit, parentKey);
  }

  if (Array.isArray(value)) {
    let changed = false;
    const sanitizedItems = value.map((item) => {
      const result = sanitizeValue(item, explicitPaths, audit, parentKey);
      changed ||= result.changed;
      return result.value;
    });

    return { value: changed ? sanitizedItems : value, changed };
  }

  if (!isRecord(value)) {
    return { value, changed: false };
  }

  let changed = false;
  const sanitized: JsonObject = { ...value };

  for (const key of Object.keys(sanitized)) {
    if (IMPLICIT_CONTEXT_KEYS.has(key.toLowerCase())) {
      delete sanitized[key];
      audit.removedImplicitKeys.push(key);
      changed = true;
    }
  }

  changed = redactSensitiveObject(sanitized, audit) || changed;

  for (const [key, child] of Object.entries(sanitized)) {
    const result = sanitizeValue(child, explicitPaths, audit, key);
    if (result.changed) {
      sanitized[key] = result.value;
      changed = true;
    }
  }

  if (!changed) return { value, changed: false };
  return { value: sanitized, changed: true };
}

function shouldSanitizeVscodeContext(): boolean {
  return process.env.OMNIROUTE_VSCODE_SANITIZE_CONTEXT !== "0";
}

export function sanitizeVscodeRequestBody<T>(body: T): VscodeContextSanitizerResult<T> {
  const audit: VscodeContextSanitizerAudit = {
    removedImplicitKeys: [],
    redactedSensitivePaths: [],
  };

  if (!shouldSanitizeVscodeContext()) {
    return { body, changed: false, audit };
  }

  const explicitPaths = collectExplicitPaths(body);
  const result = sanitizeValue(body, explicitPaths, audit);

  return {
    body: result.value as T,
    changed: result.changed,
    audit,
  };
}

export async function sanitizeVscodeRequest(request: Request): Promise<Request> {
  if (!["PATCH", "POST", "PUT"].includes(request.method.toUpperCase())) {
    return request;
  }

  const body = await request
    .clone()
    .json()
    .catch(() => null);

  if (!body || typeof body !== "object") {
    return request;
  }

  const result = sanitizeVscodeRequestBody(body);
  if (!result.changed) {
    return request;
  }

  const headers = new Headers(request.headers);
  headers.delete("content-length");

  return new Request(request.url, {
    method: request.method,
    headers,
    body: JSON.stringify(result.body),
  });
}
