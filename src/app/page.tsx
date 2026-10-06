import { redirect } from "next/navigation";

/**
 * Root entry. Zed's native-app sign-in always redirects the browser to the
 * loopback ROOT (`http://127.0.0.1:<dashboard-port>/?user_id=...&access_token=...`),
 * ignoring any path — when the dashboard port is reused as native_app_port
 * (see zed-hosted.ts), that redirect lands HERE. Forward the payload to the
 * /callback relay (which postMessages it to the waiting OAuth modal) instead of
 * the plain /dashboard redirect below, which would drop the query string.
 */
export default async function InitPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = (await searchParams) || {};
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") {
      query.set(key, value);
    } else if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === "string") query.append(key, item);
      }
    }
  }
  if (query.get("user_id") && query.get("access_token")) {
    redirect(`/callback?${query.toString()}`);
  }
  redirect("/dashboard");
}
