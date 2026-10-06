import type { Buffer } from "node:buffer";
import type { Page } from "playwright";

export interface BrowserBackedChatRequest {
  /**
   * Pool key — typically a provider id, optionally suffixed by user/account id
   * when browser state differs.
   */
  poolKey: string;
  /** Chat endpoint whose response should be captured after submission. */
  chatUrl: string;
  /** Provider page to navigate to before entering the prompt. */
  chatPageUrl: string;
  /** Literal text typed into the provider composer. */
  userMessage: string;
  /** Raw cookies to inject into the browser context. */
  cookieString?: string | null;
  /** Values injected into localStorage before the provider page initializes. */
  localStorage?: Record<string, string>;
  /** Origin whose localStorage receives the injected values. */
  localStorageOrigin?: string;
  /** Cookie domain used with cookieString. */
  cookieDomain?: string;
  /** Domain used to recognize the provider chat request. */
  chatUrlMatchDomain: string;
  /** Browser User-Agent override. */
  userAgent?: string;
  /** Browser locale (BCP 47). Defaults to en-US. */
  locale?: string;
  /** Browser IANA timezone. Defaults to America/New_York. */
  timezone?: string;
  /** Launch a headed browser when the provider rejects true headless mode. */
  headless?: boolean;
  /** Selector for the provider chat input. */
  inputSelector: string;
  /** Optional selector for the provider submit button. */
  submitButtonSelector?: string;
  /**
   * Use a DOM click when an animated overlay makes coordinate-based
   * actionability unreliable even though the provider button is enabled.
   */
  submitButtonMode?: "playwright" | "dom";
  /**
   * Optional in-memory files to attach through the provider page's native
   * upload input before submission.
   */
  attachments?: Array<{
    name: string;
    mimeType: string;
    buffer: Buffer;
  }>;
  /** Provider-specific UI configuration performed before prompt submission. */
  beforeSubmit?: (page: Page) => Promise<void>;
  /** Wait after submit for SSE/JSON to arrive. Default 15 seconds. */
  postSubmitWaitMs?: number;
  /** Optional signal that cancels navigation and submission. */
  signal?: AbortSignal | null;
  /** Reuse the same browser context across requests. Defaults to true. */
  reuseContext?: boolean;
}

export interface BrowserBackedChatResult {
  status: number;
  contentType: string | null;
  body: Buffer;
  isStealth: boolean;
  /** Sanitized POST targets observed while submitting. */
  observedPostUrls?: string[];
  /** Sanitized POST response targets and statuses observed while submitting. */
  observedPostResponses?: Array<{ url: string; status: number }>;
  timing: {
    acquireContextMs: number;
    navigateMs: number;
    submitMs: number;
    captureResponseMs: number;
    totalMs: number;
  };
}
