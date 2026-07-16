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
import { useTranslations } from "next-intl";

const PATH_LABELS = {
  dashboard: "dashboard",
  providers: "providers",
  combos: "combos",
  settings: "settings",
  general: "general",
  appearance: "appearance",
  ai: "ai",
  routing: "routing",
  resilience: "resilience",
  advanced: "advanced",
  "access-tokens": "accessTokens",
  "feature-flags": "featureFlags",
  logs: "logs",
  "audit-log": "auditLog",
  console: "console",
  logger: "logger",
  translator: "translator",
  playground: "playground",
  add: "add",
  edit: "edit",
  keys: "apiKeys",
  models: "models",
  "cli-code": "cliCode",
  "cli-agents": "cliAgents",
  "acp-agents": "acpAgents",
  endpoint: "endpoint",
  "api-manager": "apiManager",
  context: "context",
  compression: "compression",
  services: "services",
  analytics: "analytics",
  costs: "costs",
  health: "health",
  runtime: "runtime",
  webhooks: "webhooks",
  home: "home",
  activity: "activity",
  "agent-skills": "agentSkills",
  "combo-health": "comboHealth",
  evals: "evals",
  search: "search",
  utilization: "utilization",
  "api-endpoints": "apiEndpoints",
  audit: "audit",
  a2a: "a2a",
  mcp: "mcp",
  batch: "batch",
  files: "files",
  media: "media",
  cache: "cache",
  changelog: "changelog",
  chaos: "chaos",
  "cloud-agents": "cloudAgents",
  live: "live",
  studio: "studio",
  aggressive: "aggressive",
  caveman: "caveman",
  ccr: "ccr",
  headroom: "headroom",
  lite: "lite",
  llmlingua: "llmlingua",
  omniglyph: "omniglyph",
  rtk: "rtk",
  "session-dedup": "sessionDedup",
  ultra: "ultra",
  budget: "budget",
  pricing: "pricing",
  "quota-share": "quotaShare",
  discovery: "discovery",
  "free-provider-rankings": "freeProviderRankings",
  "free-tiers": "freeTiers",
  gamification: "gamification",
  leaderboard: "leaderboard",
  limits: "limits",
  profile: "profile",
  plugins: "plugins",
  "provider-stats": "providerStats",
  new: "new",
  quota: "quota",
  relay: "relay",
  "search-tools": "searchTools",
  security: "security",
  sidebar: "sidebar",
  tokens: "tokens",
  tools: "tools",
  "agent-bridge": "agentBridge",
  "traffic-inspector": "trafficInspector",
  usage: "usage",
};

/**
 * Get a friendly label for a path segment.
 * @param {string} segment
 * @returns {string}
 */
function getLabel(segment, t) {
  const key = PATH_LABELS[segment];
  return key ? t(key) : segment.charAt(0).toUpperCase() + segment.slice(1);
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations("breadcrumbs");
  if (!pathname || pathname === "/dashboard") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, idx) => ({
    label: getLabel(seg, t),
    href: "/" + segments.slice(0, idx + 1).join("/"),
    isLast: idx === segments.length - 1,
  }));

  return (
    <nav
      aria-label={t("ariaLabel")}
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
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--accent, #818cf8)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary, #888)")
              }
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
