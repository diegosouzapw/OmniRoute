/** Browser-safe credential parsing shared by HAR import, validation and execution. */
export interface M365CredentialParts {
  accessToken?: string;
  chathubPath?: string;
  host?: string;
}

const CHATHUB_PATH = "/m365Copilot/Chathub/";
const TRUSTED_HOST =
  /^(?:[a-z0-9-]+\.)*(?:m365\.cloud\.microsoft|copilot\.microsoft\.com|substrate\.office\.com)$/i;

export type M365ChatHubUrlResult =
  | { credential: Required<M365CredentialParts> }
  | { error: "noChathubUrl" | "missingFields" | "unparsableUrl" };

/** Never infer a destination from an arbitrary pasted URL or HAR entry. */
export function inspectM365ChatHubUrl(raw: string): M365ChatHubUrlResult {
  let trustedPath = false;
  try {
    const url = new URL(raw);
    if (
      url.protocol !== "wss:" ||
      !TRUSTED_HOST.test(url.hostname) ||
      url.port ||
      url.username ||
      url.password ||
      url.hash ||
      !url.pathname.startsWith(CHATHUB_PATH)
    )
      return { error: "noChathubUrl" };
    trustedPath = true;
    const chathubPath = decodeURIComponent(url.pathname.slice(CHATHUB_PATH.length));
    const accessToken = url.searchParams.get("access_token");
    if (!accessToken || !chathubPath) return { error: "missingFields" };
    // A ChatHub identity is one user@tenant segment, never URL or key/value syntax.
    if (!/^[\w.-]+@[\w.-]+$/.test(chathubPath)) return { error: "unparsableUrl" };
    return { credential: { accessToken, chathubPath, host: url.hostname } };
  } catch {
    return { error: trustedPath ? "unparsableUrl" : "noChathubUrl" };
  }
}

export function parseM365ChatHubUrl(raw: string): Required<M365CredentialParts> | null {
  const result = inspectM365ChatHubUrl(raw);
  return "credential" in result ? result.credential : null;
}

export function parseM365PastedCredential(raw: string): M365CredentialParts {
  const value = raw.trim();
  if (/^[a-z][a-z\d+.-]*:\/\//i.test(value)) return parseM365ChatHubUrl(value) || {};
  const parts: Record<string, string> = {};
  for (const segment of value.split(/[;\n]/)) {
    const separator = segment.indexOf("=");
    if (separator <= 0) continue;
    const key = segment.slice(0, separator).trim();
    const partValue = segment.slice(separator + 1).trim();
    if (key && partValue) parts[key] = partValue;
  }
  return {
    accessToken: parts.access_token || parts.accessToken,
    chathubPath: parts.chathubPath || parts.userTenant,
  };
}

/** Keep legacy credentials stable; URL form carries a validated nondefault host. */
export function serializeM365Credential(parts: Required<M365CredentialParts>): string {
  const token = parts.accessToken || "";
  if (parts.host === "substrate.office.com" && !/[;\r\n]/.test(token) && token.trim() === token) {
    return `access_token=${token}; chathubPath=${parts.chathubPath}`;
  }
  const url = new URL(`wss://${parts.host}${CHATHUB_PATH}${parts.chathubPath}`);
  url.searchParams.set("access_token", token);
  return url.toString();
}
