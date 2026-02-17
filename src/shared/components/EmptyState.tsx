"use client";

/**
 * EmptyState — FASE-07 UX
 *
 * Reusable empty state component for dashboard sections when no data
 * is available. Provides visual feedback and optional action button.
 *
 * Usage:
 *   <EmptyState
 *     icon="📡"
 *     title="No providers yet"
 *     description="Add your first API provider to get started."
 *     actionLabel="Add Provider"
 *     onAction={() => router.push('/providers/add')}
 *   />
 */

interface EmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: (() => void) | null;
}

export default function EmptyState({
  icon = "📭",
  title = "Nothing here yet",
  description = "",
  actionLabel = "",
  onAction = null,
}: EmptyStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        textAlign: "center",
        minHeight: "200px",
      }}
    >
      <div
        style={{
          fontSize: "48px",
          marginBottom: "16px",
          opacity: 0.8,
          animation: "emptyBounce 2s ease-in-out infinite",
        }}
        role="img"
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: "18px",
          fontWeight: 600,
          color: "var(--text-primary, #e0e0e0)",
          marginBottom: "8px",
          margin: 0,
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-secondary, #888)",
            maxWidth: "320px",
            lineHeight: 1.5,
            marginTop: "8px",
          }}
        >
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          style={{
            marginTop: "20px",
            padding: "10px 24px",
            borderRadius: "8px",
            border: "1px solid rgba(99, 102, 241, 0.4)",
            background: "rgba(99, 102, 241, 0.15)",
            color: "#818cf8",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(99, 102, 241, 0.25)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(99, 102, 241, 0.15)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          {actionLabel}
        </button>
      )}
      <style>{`
        @keyframes emptyBounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
