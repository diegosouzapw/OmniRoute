/**
 * Strict recognizer for the UC (uncensored.com) Clerk session-token mint call,
 * shared by the uc-image / uc-video mock `fetch` routers.
 *
 * The mock routers used to dispatch on `url.includes("clerk.uncensored.com")`.
 * That is a substring test over a whole URL, so ANY host answers as long as the
 * name appears somewhere in it — `https://evil.example/?next=clerk.uncensored.com`
 * would have been served the mint response. A test whose router accepts a
 * malformed URL cannot fail when the executor builds one, which is exactly the
 * regression such a test exists to catch (and CodeQL flags it as
 * `js/incomplete-url-substring-sanitization`).
 *
 * This matches the real shape instead:
 *   POST https://clerk.uncensored.com/v1/client/sessions/{sid}/tokens?_clerk_js_version=…
 * comparing the parsed origin against the production constant and pinning the
 * path shape.
 */
import { UC_CLERK_FAPI } from "../../../open-sse/executors/uc/constants.ts";

const MINT_PATH = /^\/v1\/client\/sessions\/[^/]+\/tokens$/;

/** True only for the Clerk mint endpoint on the real Clerk FAPI origin. */
export function isUcClerkMintUrl(raw: unknown): boolean {
  let parsed: URL;
  try {
    parsed = new URL(String(raw));
  } catch {
    return false;
  }
  return parsed.origin === UC_CLERK_FAPI && MINT_PATH.test(parsed.pathname);
}
