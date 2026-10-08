import { Suspense } from "react";
import RoutingPageClient from "./RoutingPageClient";

export default function ApiKeyRoutingPage() {
  return (
    <Suspense>
      <RoutingPageClient />
    </Suspense>
  );
}
