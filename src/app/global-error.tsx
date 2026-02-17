"use client";

/**
 * Global Error Page — FASE-04 Error Handling
 *
 * Root-level error boundary for unrecoverable errors.
 * This is the last resort — catches errors that the per-page
 * error.js boundaries don't handle.
 * Styled with TailwindCSS 4 (Phase 7.3).
 */

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#0a0a0f] text-[#e0e0e0] font-[system-ui,-apple-system,sans-serif] text-center m-0">
        <div className="text-[64px] mb-4">⚠️</div>
        <h1 className="text-[28px] font-bold mb-2">Something went wrong</h1>
        <p className="text-[15px] text-[#888] max-w-[400px] leading-relaxed mb-6">
          An unexpected error occurred. This has been logged and our team will investigate.
        </p>
        {process.env.NODE_ENV === "development" && error?.message && (
          <pre className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-xs max-w-[600px] overflow-auto text-left mb-6">
            {error.message}
          </pre>
        )}
        <button
          onClick={reset}
          className="px-8 py-3 rounded-[10px] text-white border-none text-sm font-semibold cursor-pointer transition-transform duration-200 shadow-[0_4px_16px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
