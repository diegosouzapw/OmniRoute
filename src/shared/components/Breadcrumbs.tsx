"use client";

/**
 * Breadcrumbs — FASE-07 UX
 *
 * Dashboard breadcrumb navigation component. Automatically generates
 * breadcrumbs from the current path with friendly labels.
 * Uses usePathname() internally — no props needed.
 *
 * Usage:
 *   <Breadcrumbs />
 */

import { usePathname } from "next/navigation";
import Link from "next/link";

const PATH_LABELS = {
  dashboard: "Dashboard",
  providers: "Providers",
  combos: "Combos",
  settings: "Settings",
  usage: "Usage",
  logger: "Logger",
  translator: "Translator",
  playground: "Playground",
  add: "Add",
  edit: "Edit",
  keys: "API Keys",
  models: "Models",
  logs: "Logs",
};

/**
 * Get a friendly label for a path segment.
 * @param {string} segment
 * @returns {string}
 */
function getLabel(segment) {
  return PATH_LABELS[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (!pathname || pathname === "/dashboard") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, idx) => ({
    label: getLabel(seg),
    href: "/" + segments.slice(0, idx + 1).join("/"),
    isLast: idx === segments.length - 1,
  }));

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "13px",
        color: "var(--text-secondary, #888)",
        padding: "8px 0",
        marginBottom: "8px",
      }}
    >
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {i > 0 && (
            <span style={{ opacity: 0.4, fontSize: "11px" }} aria-hidden="true">
              ›
            </span>
          )}
          {crumb.isLast ? (
            <span
              aria-current="page"
              style={{ color: "var(--text-primary, #e0e0e0)", fontWeight: 500 }}
            >
              {crumb.label}
            </span>
          ) : (
            <Link
              href={crumb.href}
              style={{
                color: "var(--text-secondary, #888)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--accent, #818cf8)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--text-secondary, #888)")}
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
