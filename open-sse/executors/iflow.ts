import crypto from "crypto";
import { BaseExecutor } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";

/**
 * IFlowExecutor - Executor for iFlow API with HMAC-SHA256 signature.
 *
 * iFlow requires custom headers including a session ID, timestamp,
 * and an HMAC-SHA256 signature for request authentication.
 * Without these headers, the API returns a 406 error.
 *
 * Fixes: https://github.com/diegosouzapw/OmniRoute/issues/114
 */
export class IFlowExecutor extends BaseExecutor {
  constructor() {
    super("iflow", PROVIDERS.iflow);
  }

  /**
   * Create iFlow signature using HMAC-SHA256
   * @param userAgent - User agent string
   * @param sessionID - Session ID
   * @param timestamp - Unix timestamp in milliseconds
   * @param apiKey - API key for signing
   * @returns Hex-encoded signature
   */
  createIFlowSignature(
    userAgent: string,
    sessionID: string,
    timestamp: number,
    apiKey: string
  ): string {
    if (!apiKey) return "";
    const payload = `${userAgent}:${sessionID}:${timestamp}`;
    const hmac = crypto.createHmac("sha256", apiKey);
    hmac.update(payload);
    return hmac.digest("hex");
  }

  /**
   * Build headers with iFlow-specific HMAC-SHA256 signature.
   * Includes session-id, x-iflow-timestamp, and x-iflow-signature.
   */
  buildHeaders(credentials: any, stream = true) {
    // Generate session ID and timestamp
    const sessionID = `session-${crypto.randomUUID()}`;
    const timestamp = Date.now();

    // Get user agent from config
    const userAgent = this.config.headers?.["User-Agent"] || "iFlow-Cli";

    // Get API key (prefer apiKey, fallback to accessToken)
    const apiKey = credentials.apiKey || credentials.accessToken || "";

    // Create HMAC-SHA256 signature
    const signature = this.createIFlowSignature(userAgent, sessionID, timestamp, apiKey);

    // Build headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...this.config.headers,
      "session-id": sessionID,
      "x-iflow-timestamp": timestamp.toString(),
      "x-iflow-signature": signature,
    };

    // Add authorization
    if (credentials.apiKey) {
      headers["Authorization"] = `Bearer ${credentials.apiKey}`;
    } else if (credentials.accessToken) {
      headers["Authorization"] = `Bearer ${credentials.accessToken}`;
    }

    // Add streaming header
    if (stream) {
      headers["Accept"] = "text/event-stream";
    }

    return headers;
  }

  /**
   * Build URL for iFlow API — uses baseUrl directly.
   */
  buildUrl(model: string, stream: boolean, urlIndex = 0, credentials: any = null) {
    return this.config.baseUrl;
  }

  /**
   * Transform request body (passthrough for iFlow).
   */
  transformRequest(model: string, body: any, stream: boolean, credentials: any) {
    return body;
  }
}

export default IFlowExecutor;
