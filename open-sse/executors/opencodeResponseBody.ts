/**
 * opencodeResponseBody.ts — body hygiene for the opencode rotation loop.
 *
 * Leaf module: zero imports. An upstream response the loop decides not to
 * return (a refusal it rotates away from, a failure it pauses after) keeps its
 * connection busy until the body is consumed or cancelled. Cancelling releases
 * the socket right away instead of whenever the Response is garbage-collected.
 */

/**
 * Cancel a response body nobody will read. Never throws. A body that is already
 * locked (a reader holds it) is left to that reader.
 */
export function discardResponseBody(response: Response | null | undefined): void {
  const body = response?.body;
  if (!body || body.locked) return;
  void body.cancel().catch(() => undefined);
}
