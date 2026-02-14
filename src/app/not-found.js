"use client";

/**
 * Custom Not Found Page — FASE-04 Error Handling
 *
 * Displayed when a user navigates to a non-existent route.
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "24px",
        background: "var(--bg-primary, #0a0a0f)",
        color: "var(--text-primary, #e0e0e0)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "96px",
          fontWeight: 800,
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1,
          marginBottom: "8px",
        }}
      >
        404
      </div>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: 600,
          marginBottom: "8px",
        }}
      >
        Page not found
      </h1>
      <p
        style={{
          fontSize: "15px",
          color: "var(--text-secondary, #888)",
          maxWidth: "400px",
          lineHeight: 1.5,
          marginBottom: "32px",
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/dashboard"
        style={{
          padding: "12px 32px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "#fff",
          fontSize: "14px",
          fontWeight: 600,
          textDecoration: "none",
          transition: "all 0.2s",
          boxShadow: "0 4px 16px rgba(99, 102, 241, 0.3)",
        }}
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
