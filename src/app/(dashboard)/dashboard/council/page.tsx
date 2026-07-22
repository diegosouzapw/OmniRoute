/**
 * /dashboard/council/page.tsx — AI Council console.
 *
 * Thin server wrapper: sets page metadata and renders the client console that
 * drives the /api/v1/council SSE endpoint (multi-round multi-model debate).
 */
import CouncilPageClient from "./CouncilPageClient";

export const metadata = {
  title: "AI Council — OmniRoute",
};

export default function Page() {
  return <CouncilPageClient />;
}
