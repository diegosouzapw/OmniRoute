/**
 * MaxAI web-app signing — the `X-Authorization` per-request signature.
 *
 * The scheme (validated byte-exact against real captured `X-Authorization` blobs):
 *
 *   sign_str = `${appVersion}:${req_time}:${path}:${uid}`
 *   sha1     = HMAC_SHA1_hex(sign_str, key=`${req_time}:${hmacKey}`)
 *   p        = SM3_hex(`${req_time}:${sha1}:${hmacKey}`)
 *   payload  = { X-Client-Domain, X-Client-Path(page url), X-Random(6-digit),
 *               t(ms), p, d(device_id), <ctxKey>:{ a: context } }
 *   X-Authorization = base64( "Salted__" + salt8 + AES-256-CBC(payloadJSON) )
 *                     with key/iv from OpenSSL EVP_BytesToKey(MD5, aesKey, salt)
 *
 * All primitives are in `node:crypto` (HMAC-SHA1, SM3 via OpenSSL 3, MD5,
 * AES-256-CBC); no external dependency.
 *
 * KEYING MATERIAL IS NOT HARDCODED. The `hmacKey` and `aesKey` are the CLIENT-SIDE
 * constants MaxAI's own web app ships verbatim in its public JS bundle. Rather
 * than pin them here, OmniRoute extracts them live (see ./constants.ts) and passes
 * a `MaxaiSigningConstants` object into every signing call. There is deliberately
 * NO in-code default for the two keys: a signer with no extracted keys cannot sign
 * (the caller surfaces a clear auth error) — we never sign with a guessed secret.
 * The non-secret STRUCTURAL fields (appVersion, ctxKey, header names) carry safe
 * defaults so a transient parse miss can't break an otherwise-working signer.
 */
import { createHmac, createHash, createCipheriv, randomBytes, randomInt } from "node:crypto";
import type { MaxaiSigningConstants, MaxaiHeaderNames } from "./constants.ts";
import { MAXAI_DEFAULT_HEADER_NAMES } from "./constants.ts";

const CLIENT_DOMAIN = "maxai.co";
/** Default browser page URL recorded verbatim as X-Client-Path (NOT the API path). */
export const MAXAI_DEFAULT_PAGE = "https://www.maxai.co/app/";
/** Only /oauth/* routes blank the user_id inside the signature. */
const BLANK_USER_ROUTES = new Set([
  "/oauth/signin_with_email",
  "/oauth/signin_with_google",
  "/oauth/verify_secret_code",
]);

const MAGIC = Buffer.from("Salted__", "ascii");

/**
 * The wire `X-Random` slot: a 6-digit decimal string (100000-999999).
 *
 * Uses `crypto.randomInt`, which rejection-samples internally, instead of
 * `randomBytes(4) % 900000` — a plain modulo over a 32-bit draw does not divide
 * evenly by 900000, so the low ~4772 values of the range came out marginally
 * more often. The emitted shape is unchanged (always exactly 6 digits).
 */
export function maxaiRandomSlot(): string {
  return String(randomInt(100000, 1000000));
}

function hmacSha1Hex(message: string, key: string): string {
  return createHmac("sha1", Buffer.from(key, "utf8"))
    .update(Buffer.from(message, "utf8"))
    .digest("hex");
}

function sm3Hex(message: string): string {
  return createHash("sm3").update(Buffer.from(message, "utf8")).digest("hex");
}

/** OpenSSL EVP_BytesToKey with MD5 (CryptoJS default for a string passphrase). */
function evpBytesToKey(
  passphrase: string,
  salt: Buffer,
  keyLen = 32,
  ivLen = 16
): { key: Buffer; iv: Buffer } {
  let derived = Buffer.alloc(0);
  let block = Buffer.alloc(0);
  const pass = Buffer.from(passphrase, "utf8");
  while (derived.length < keyLen + ivLen) {
    block = createHash("md5")
      .update(Buffer.concat([block, pass, salt]))
      .digest();
    derived = Buffer.concat([derived, block]);
  }
  return { key: derived.subarray(0, keyLen), iv: derived.subarray(keyLen, keyLen + ivLen) };
}

/**
 * Reproduce CryptoJS.AES.encrypt(text, passphrase).toString() (OpenSSL Salted__
 * envelope). `passphrase` (the extracted aesKey) is REQUIRED — there is no default.
 */
export function maxaiAesEncrypt(plaintext: string, passphrase: string, salt?: Buffer): string {
  if (!passphrase) throw new Error("maxaiAesEncrypt: missing aesKey");
  const s = salt ?? randomBytes(8);
  const { key, iv } = evpBytesToKey(passphrase, s);
  const cipher = createCipheriv("aes-256-cbc", key, iv); // PKCS7 padding is the default
  const body = Buffer.concat([cipher.update(Buffer.from(plaintext, "utf8")), cipher.final()]);
  return Buffer.concat([MAGIC, s, body]).toString("base64");
}

/**
 * Compute the SM3 `p` proof for an API `path` at `reqTime` ms. `hmacKey` and
 * `appVersion` (both extracted) are REQUIRED — there is no in-code default.
 */
export function computeMaxaiProof(
  path: string,
  reqTime: number,
  userId: string,
  hmacKey: string,
  appVersion: string
): string {
  if (!hmacKey) throw new Error("computeMaxaiProof: missing hmacKey");
  if (!appVersion) throw new Error("computeMaxaiProof: missing appVersion");
  const p = path.endsWith("?") ? path.slice(0, -1) : path;
  const uid = BLANK_USER_ROUTES.has(p) ? "" : userId;
  const signStr = `${appVersion}:${reqTime}:${p}:${uid}`;
  const sha1 = hmacSha1Hex(signStr, `${reqTime}:${hmacKey}`);
  return sm3Hex(`${reqTime}:${sha1}:${hmacKey}`);
}

export interface MaxaiSignInput {
  /** API path being signed, e.g. "/gpt/cwc/chat". */
  path: string;
  userId: string;
  deviceId: string;
  /** Browser page URL for X-Client-Path (defaults to the app page). */
  pageUrl?: string;
  /** Context slot value (defaults to "" — the wire default). */
  context?: string;
  /** Injectable clock/random for deterministic tests. */
  now?: () => number;
  random?: () => string;
}

/**
 * Build the signing headers (X-Authorization plus the X-App and X-Browser
 * companions) for one request. `device_id` MUST match the device that minted the
 * token, or the server rejects the signature.
 *
 * `constants` carries the extracted keying material + structural labels. It is
 * REQUIRED: callers resolve it via `ensureMaxaiConstants()` before signing.
 */
export function buildMaxaiSignedHeaders(
  input: MaxaiSignInput,
  constants: MaxaiSigningConstants
): Record<string, string> {
  const reqTime = (input.now ?? (() => Date.now()))();
  const random = input.random?.() ?? maxaiRandomSlot();
  const h: MaxaiHeaderNames = { ...MAXAI_DEFAULT_HEADER_NAMES, ...constants.headerNames };
  const ctxKey = constants.ctxKey;
  const appVersion = constants.appVersion;
  // Key ORDER matters — it is signed as a compact JSON string.
  const payload: Record<string, unknown> = {
    [h.clientDomain]: CLIENT_DOMAIN,
    [h.clientPath]: input.pageUrl ?? MAXAI_DEFAULT_PAGE,
    [h.random]: random,
    [h.tSlot]: reqTime,
    [h.pSlot]: computeMaxaiProof(input.path, reqTime, input.userId, constants.hmacKey, appVersion),
    [h.dSlot]: input.deviceId,
    [ctxKey]: { a: input.context ?? "" },
  };
  const blob = maxaiAesEncrypt(JSON.stringify(payload), constants.aesKey);
  return {
    [h.browserName]: "Firefox",
    [h.browserVersion]: "150.0",
    [h.browserMajor]: "150",
    [h.appVersionHeader]: appVersion,
    [h.appEnvHeader]: h.appEnvValue,
    [h.authorization]: blob,
  };
}
