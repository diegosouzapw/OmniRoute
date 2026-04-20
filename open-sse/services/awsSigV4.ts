import { createHash, createHmac } from "node:crypto";

type JsonRecord = Record<string, unknown>;

export type AwsResolvedCredentials = {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
  region: string;
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNonEmptyString(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function extractAwsRegionFromBaseUrl(baseUrl: string): string {
  if (!baseUrl) return "";

  try {
    const host = new URL(baseUrl).host.toLowerCase();
    const match = host.match(/^[^.]+\.([a-z0-9-]+)\.amazonaws\.com$/);
    return match?.[1] || "";
  } catch {
    return "";
  }
}

function parseEnvStyleCredentials(raw: string): JsonRecord {
  const result: JsonRecord = {};
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.+?)\s*$/);
    if (!match) continue;
    result[match[1]] = match[2];
  }
  return result;
}

function readCredentialFields(source: JsonRecord) {
  return {
    accessKeyId:
      toNonEmptyString(source.accessKeyId) ||
      toNonEmptyString(source.awsAccessKeyId) ||
      toNonEmptyString(source.AWS_ACCESS_KEY_ID),
    secretAccessKey:
      toNonEmptyString(source.secretAccessKey) ||
      toNonEmptyString(source.awsSecretAccessKey) ||
      toNonEmptyString(source.AWS_SECRET_ACCESS_KEY),
    sessionToken:
      toNonEmptyString(source.sessionToken) ||
      toNonEmptyString(source.awsSessionToken) ||
      toNonEmptyString(source.AWS_SESSION_TOKEN),
    region:
      toNonEmptyString(source.region) ||
      toNonEmptyString(source.awsRegion) ||
      toNonEmptyString(source.AWS_REGION) ||
      toNonEmptyString(source.AWS_DEFAULT_REGION),
  };
}

export function parseAwsCredentialInput(
  rawToken: string | null | undefined,
  providerSpecificData: unknown = null
): AwsResolvedCredentials | null {
  const raw = typeof rawToken === "string" ? rawToken.trim() : "";
  if (!raw) return null;

  const providerData = asRecord(providerSpecificData);
  const baseUrlRegion = extractAwsRegionFromBaseUrl(toNonEmptyString(providerData.baseUrl));
  let parsed: JsonRecord | null = null;

  if (raw.startsWith("{")) {
    try {
      parsed = asRecord(JSON.parse(raw));
    } catch {
      parsed = null;
    }
  }

  if (!parsed && raw.includes("\n") && raw.includes("=")) {
    parsed = parseEnvStyleCredentials(raw);
  }

  let accessKeyId = "";
  let secretAccessKey = "";
  let sessionToken = "";
  let region = "";

  if (parsed) {
    const fields = readCredentialFields(parsed);
    accessKeyId = fields.accessKeyId;
    secretAccessKey = fields.secretAccessKey;
    sessionToken = fields.sessionToken;
    region = fields.region;
  } else {
    const segments = raw.split(":");
    accessKeyId = segments[0]?.trim() || "";
    secretAccessKey = segments[1]?.trim() || "";
    sessionToken = segments[2]?.trim() || "";
    region = segments[3]?.trim() || "";
  }

  const providerFields = readCredentialFields(providerData);
  region =
    region ||
    providerFields.region ||
    baseUrlRegion ||
    toNonEmptyString(process.env.AWS_REGION) ||
    toNonEmptyString(process.env.AWS_DEFAULT_REGION) ||
    "us-east-1";

  if (!accessKeyId || !secretAccessKey) {
    return null;
  }

  return {
    accessKeyId,
    secretAccessKey,
    ...(sessionToken ? { sessionToken } : {}),
    region,
  };
}

function encodeRfc3986(value: string): string {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

function buildCanonicalUri(pathname: string): string {
  return pathname
    .split("/")
    .map((segment) => encodeRfc3986(segment))
    .join("/");
}

function buildCanonicalQuery(searchParams: URLSearchParams): string {
  return [...searchParams.entries()]
    .sort(([leftKey, leftValue], [rightKey, rightValue]) => {
      if (leftKey === rightKey) {
        return leftValue.localeCompare(rightValue);
      }
      return leftKey.localeCompare(rightKey);
    })
    .map(([key, value]) => `${encodeRfc3986(key)}=${encodeRfc3986(value)}`)
    .join("&");
}

function sha256Hex(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function hmac(key: string | Buffer, value: string): Buffer {
  return createHmac("sha256", key).update(value, "utf8").digest();
}

function toAmzDate(date: Date): { amzDate: string; dateStamp: string } {
  const iso = date.toISOString().replace(/[:-]|\.\d{3}/g, "");
  return {
    amzDate: iso,
    dateStamp: iso.slice(0, 8),
  };
}

function deriveSigningKey(
  secretAccessKey: string,
  dateStamp: string,
  region: string,
  service: string
) {
  const dateKey = hmac(`AWS4${secretAccessKey}`, dateStamp);
  const regionKey = hmac(dateKey, region);
  const serviceKey = hmac(regionKey, service);
  return hmac(serviceKey, "aws4_request");
}

export function signAwsRequest({
  method,
  url,
  headers = {},
  body = "",
  service,
  region,
  credentials,
  now = new Date(),
}: {
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: string;
  service: string;
  region: string;
  credentials: AwsResolvedCredentials;
  now?: Date;
}): Record<string, string> {
  const parsedUrl = new URL(url);
  const { amzDate, dateStamp } = toAmzDate(now);
  const payloadHash = sha256Hex(body);
  const requestHeaders: Record<string, string> = {
    ...headers,
    Host: parsedUrl.host,
    "X-Amz-Date": amzDate,
    "X-Amz-Content-Sha256": payloadHash,
  };

  if (credentials.sessionToken) {
    requestHeaders["X-Amz-Security-Token"] = credentials.sessionToken;
  }

  const canonicalHeaderEntries = Object.entries(requestHeaders)
    .map(([key, value]) => [key.toLowerCase(), value.trim().replace(/\s+/g, " ")] as const)
    .sort(([left], [right]) => left.localeCompare(right));

  const canonicalHeaders = canonicalHeaderEntries
    .map(([key, value]) => `${key}:${value}\n`)
    .join("");
  const signedHeaders = canonicalHeaderEntries.map(([key]) => key).join(";");
  const canonicalRequest = [
    method.toUpperCase(),
    buildCanonicalUri(parsedUrl.pathname || "/"),
    buildCanonicalQuery(parsedUrl.searchParams),
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join("\n");

  const signature = createHmac(
    "sha256",
    deriveSigningKey(credentials.secretAccessKey, dateStamp, region, service)
  )
    .update(stringToSign, "utf8")
    .digest("hex");

  requestHeaders.Authorization =
    `AWS4-HMAC-SHA256 Credential=${credentials.accessKeyId}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return requestHeaders;
}
