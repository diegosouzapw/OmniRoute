import { redirect } from "next/navigation";

/**
 * /dashboard/media-providers
 * Default redirect to the embedding kind list.
 */
export default function MediaProvidersPage() {
  redirect("/dashboard/media-providers/embedding");
}
