import { Suspense } from "react";
import PortalClient from "./PortalClient";

export default function PortalPage() {
  return (
    <Suspense
      fallback={
        <main className="portal-wrap">
          <section className="shell portal-card">
            <span className="badge">Portal</span>
            <h1 style={{ fontSize: 58 }}>Carregando sua area do cliente...</h1>
          </section>
        </main>
      }
    >
      <PortalClient />
    </Suspense>
  );
}
