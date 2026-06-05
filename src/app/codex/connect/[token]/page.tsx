import CodexConnectClient from "./CodexConnectClient";

/**
 * Public Codex connect page (outside the dashboard auth gate).
 *
 * A third party opens the shared `/codex/connect/{token}` link and completes the
 * Codex device flow in their own browser. Server component only resolves the
 * route token and hands it to the client component that drives the flow.
 */
export const dynamic = "force-dynamic";

export default async function CodexConnectPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <CodexConnectClient token={token} />;
}
