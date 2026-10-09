/** The result a video handler returns once the client has aborted the request. */
export function abortedVideoResult() {
  return { success: false as const, status: 499, error: "Request aborted" };
}
