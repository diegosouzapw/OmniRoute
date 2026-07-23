/**
 * /auth/callback — OAuth callback endpoint for providers that use the
 * `/auth/callback` path (including the Devin PKCE compatibility flow).
 *
 * Reuses the same logic as /callback:
 *  - postMessage to opener (popup mode)
 *  - BroadcastChannel (same-origin tabs)
 *  - localStorage fallback
 *
 * On true localhost the random-port callback server intercepts this path first,
 * so this page is only reached in the LAN / popup-without-callback-server case.
 */
export { default } from "@/app/callback/page";
