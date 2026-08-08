export const DEVIN_ALLOWED_SUFFIXES = Object.freeze([".devin.ai", ".cognition.ai"]);
export const DEVIN_ALLOWED_EXACT_HOSTS = Object.freeze([
  "server.codeium.com",
  "unleash.codeium.com",
]);

function normalizeHostname(hostname) {
  return String(hostname || "")
    .trim()
    .toLowerCase()
    .replace(/\.$/, "");
}

export function isAllowedGuardHostname(hostname, policy = "deny-all") {
  if (policy !== "devin") return false;
  const value = normalizeHostname(hostname);
  if (!value) return false;
  if (DEVIN_ALLOWED_EXACT_HOSTS.includes(value)) return true;
  return DEVIN_ALLOWED_SUFFIXES.some(
    (suffix) => value === suffix.slice(1) || value.endsWith(suffix)
  );
}

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "proxy-connection",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

export function sanitizeForwardHeaders(headers, target) {
  const connectionTokens = String(headers.connection || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  const blocked = new Set([...HOP_BY_HOP_HEADERS, ...connectionTokens]);
  const sanitized = {};
  for (const [name, value] of Object.entries(headers)) {
    if (value === undefined || blocked.has(name.toLowerCase()) || name.toLowerCase() === "host") {
      continue;
    }
    sanitized[name] = value;
  }
  sanitized.host = target.host;
  return sanitized;
}

export function parseConnectAuthority(authority) {
  const value = String(authority || "");
  const match = value.match(/^(?:\[([^\]]+)\]|([^:]+)):(\d+)$/);
  if (!match) return null;
  const hostname = normalizeHostname(match[1] || match[2]);
  const port = Number(match[3]);
  if (!hostname || port !== 443) return null;
  return { hostname, port };
}

function readUint24(buffer, offset) {
  return (buffer[offset] << 16) | (buffer[offset + 1] << 8) | buffer[offset + 2];
}

export function parseTlsClientHelloSni(buffer) {
  if (!Buffer.isBuffer(buffer)) return { status: "invalid", reason: "not_buffer" };
  let offset = 0;
  const handshakeParts = [];
  while (offset < buffer.length) {
    if (buffer.length - offset < 5) return { status: "need-more" };
    if (buffer[offset] !== 22) return { status: "invalid", reason: "not_handshake_record" };
    const recordLength = buffer.readUInt16BE(offset + 3);
    if (recordLength <= 0 || recordLength > 18432) {
      return { status: "invalid", reason: "invalid_record_length" };
    }
    if (buffer.length - offset - 5 < recordLength) return { status: "need-more" };
    handshakeParts.push(buffer.subarray(offset + 5, offset + 5 + recordLength));
    offset += 5 + recordLength;
  }
  const handshake = Buffer.concat(handshakeParts);
  if (handshake.length < 4) return { status: "need-more" };
  if (handshake[0] !== 1) return { status: "invalid", reason: "not_client_hello" };
  const helloLength = readUint24(handshake, 1);
  if (helloLength > 65531) return { status: "invalid", reason: "client_hello_too_large" };
  if (handshake.length - 4 < helloLength) return { status: "need-more" };
  const hello = handshake.subarray(4, 4 + helloLength);
  let cursor = 34;
  if (hello.length < cursor + 1) return { status: "invalid", reason: "truncated_hello" };
  const sessionLength = hello[cursor++];
  cursor += sessionLength;
  if (hello.length < cursor + 2) return { status: "invalid", reason: "truncated_ciphers" };
  const cipherLength = hello.readUInt16BE(cursor);
  cursor += 2 + cipherLength;
  if (hello.length < cursor + 1) return { status: "invalid", reason: "truncated_compression" };
  const compressionLength = hello[cursor++];
  cursor += compressionLength;
  if (hello.length < cursor + 2) return { status: "invalid", reason: "missing_extensions" };
  const extensionsLength = hello.readUInt16BE(cursor);
  cursor += 2;
  const extensionsEnd = cursor + extensionsLength;
  if (extensionsEnd > hello.length) return { status: "invalid", reason: "truncated_extensions" };
  while (cursor < extensionsEnd) {
    if (extensionsEnd - cursor < 4) return { status: "invalid", reason: "truncated_extension" };
    const type = hello.readUInt16BE(cursor);
    const length = hello.readUInt16BE(cursor + 2);
    cursor += 4;
    if (cursor + length > extensionsEnd) {
      return { status: "invalid", reason: "invalid_extension_length" };
    }
    if (type === 0) {
      const data = hello.subarray(cursor, cursor + length);
      if (data.length < 5 || data.readUInt16BE(0) !== data.length - 2 || data[2] !== 0) {
        return { status: "invalid", reason: "invalid_server_name" };
      }
      const nameLength = data.readUInt16BE(3);
      if (nameLength !== data.length - 5) {
        return { status: "invalid", reason: "invalid_server_name_length" };
      }
      const serverName = normalizeHostname(data.subarray(5).toString("ascii"));
      if (!/^[a-z0-9.-]+$/.test(serverName)) {
        return { status: "invalid", reason: "invalid_server_name_value" };
      }
      return { status: "ok", serverName };
    }
    cursor += length;
  }
  return { status: "invalid", reason: "missing_sni" };
}
