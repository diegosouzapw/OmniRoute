"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <main className="shell" style={{ padding: "64px 0" }}>
          <div className="card" style={{ padding: 24 }}>
            <span className="badge">Portal</span>
            <h1 style={{ marginTop: 18 }}>Algo saiu do trilho.</h1>
            <p className="lead">Recarregue a pagina ou tente novamente em alguns instantes.</p>
            <p className="muted" style={{ marginTop: 16 }}>
              {error?.message || "Erro inesperado no site Easy IA."}
            </p>
            <div className="hero-actions">
              <button className="cta" onClick={() => reset()}>
                Tentar de novo
              </button>
              <Link className="ghost" href="/">
                Voltar para a landing
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
