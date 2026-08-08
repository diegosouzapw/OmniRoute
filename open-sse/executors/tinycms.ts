import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult as makeErrorResult } from "../utils/error.ts";
import { initTinyCmsWasm, generateSecurePayload } from "./tinycmsSigner.ts";

const CHAT_URL = "https://gov.freegpt.win/api/openai/oneapi/v1/chat/completions";
const CHALLENGE_URL = "https://gov.freegpt.win/api/challenge";

let publicIp: string | null = null;
let lastIpFetch = 0;

async function getPublicIp(): Promise<string> {
  const now = Date.now();
  if (publicIp && now - lastIpFetch < 300000) {
    return publicIp;
  }
  try {
    const res = await fetch("https://api64.ipify.org?format=json");
    const json = (await res.json()) as { ip: string };
    publicIp = json.ip;
    lastIpFetch = now;
    return publicIp;
  } catch {
    return publicIp || "127.0.0.1";
  }
}

async function fetchChallenge(uuid: string): Promise<any> {
  const res = await fetch(CHALLENGE_URL, {
    method: "GET",
    headers: {
      "uuid": uuid,
      "x-origin": "https://gov.freegpt.win",
      "Accept": "application/json",
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch challenge: ${res.status}`);
  }
  return await res.json();
}

export class TinyCmsExecutor extends BaseExecutor {
  constructor() {
    super("tinycms-web", { id: "tinycms-web", baseUrl: CHAT_URL });
  }

  async execute(input: ExecuteInput) {
    const { body, credentials, signal } = input;
    const bodyObj = (body || {}) as Record<string, any>;

    // TinyCMS uses 'uuid' header for identification
    const uuid = String(credentials?.apiKey ?? "").trim();
    if (!uuid || !uuid.startsWith("R")) {
      return makeErrorResult(
        401,
        "TinyCMS: Invalid or missing device UUID (must start with 'R')",
        body,
        CHAT_URL
      );
    }

    try {
      await initTinyCmsWasm();

      const ip = await getPublicIp();
      const challengeObj = await fetchChallenge(uuid);

      const timestamp = Date.now().toString();
      const nonceJs =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      const securePayload = generateSecurePayload(
        uuid,
        timestamp,
        nonceJs,
        challengeObj.challenge,
        ip,
        challengeObj.difficulty
      );

      const signedHeaders: Record<string, string> = {
        uuid: uuid,
        "x-origin": "https://gov.freegpt.win",
        referer: "https://gov.freegpt.win/",
        "x-secure-challenge-id": challengeObj.challengeId,
        "x-secure-challenge-expires-at": String(challengeObj.expiresAt),
        "x-secure-challenge-version": challengeObj.version,
        "x-secure-signature": securePayload.signature,
        "x-secure-fingerprint": securePayload.fingerprint,
        "x-secure-client-ip": securePayload.client_ip,
        "x-secure-pow-seed-nonce": String(securePayload.pow.seed_nonce),
        "x-secure-pow-nonce": String(securePayload.pow.nonce),
        "x-secure-pow-hash": securePayload.pow.hash,
        "x-secure-pow-difficulty": String(securePayload.pow.difficulty),
        "x-secure-timestamp": timestamp,
        "x-secure-nonce": nonceJs,
        "x-secure-version": securePayload.v,
        "x-session-id": nonceJs,
        // Use configurable userid from providerSpecificData if present, otherwise generate one
        // from the UUID (the server uses it for request attribution, not auth).
        userid: String(credentials?.providerSpecificData?.userid ?? "") || uuid.slice(0, 20),
        Accept: bodyObj.stream ? "text/event-stream" : "application/json",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
      };

      const fetchOptions: RequestInit = {
        method: "POST",
        headers: signedHeaders,
        body: JSON.stringify(bodyObj),
        signal,
      };

      const response = await fetch(CHAT_URL, fetchOptions);
      return {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        body: response.body,
      };
    } catch (err: any) {
      return makeErrorResult(
        500,
        `TinyCMS Error: ${err.message}`,
        body,
        CHAT_URL
      );
    }
  }
}
