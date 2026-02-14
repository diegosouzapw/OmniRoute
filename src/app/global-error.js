"use client";

/**
 * Global Error Page — FASE-04 Error Handling
 *
 * Root-level error boundary for unrecoverable errors.
 * This is the last resort — catches errors that the per-page
 * error.js boundaries don't handle.
 */

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "24px",
          background: "#0a0a0f",
          color: "#e0e0e0",
          fontFamily: "system-ui, -apple-system, sans-serif",
          textAlign: "center",
          margin: 0,
        }}
      >
        <div
          style={{
            fontSize: "64px",
            marginBottom: "16px",
          }}
        >
          ⚠️
        </div>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "8px",
          }}
        >
          Something went wrong
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#888",
            maxWidth: "400px",
            lineHeight: 1.5,
            marginBottom: "24px",
          }}
        >
          An unexpected error occurred. This has been logged and our team will investigate.
        </p>
        {process.env.NODE_ENV === "development" && error?.message && (
          <pre
            style={{
              padding: "16px",
              borderRadius: "8px",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#ef4444",
              fontSize: "12px",
              maxWidth: "600px",
              overflow: "auto",
              textAlign: "left",
              marginBottom: "24px",
            }}
          >
            {error.message}
          </pre>
        )}
        <button
          onClick={reset}
          style={{
            padding: "12px 32px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            border: "none",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "transform 0.2s",
            boxShadow: "0 4px 16px rgba(99, 102, 241, 0.3)",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
