"use client";

import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import TokenHealthBadge from "./TokenHealthBadge";
import DegradationBadge from "./DegradationBadge";
import LanguageSelector from "./LanguageSelector";
import ProviderIcon from "./ProviderIcon";
import { useTranslations } from "next-intl";
import {
  OAUTH_PROVIDERS,
  APIKEY_PROVIDERS,
  FREE_PROVIDERS,
  CLAUDE_CODE_COMPATIBLE_PREFIX,
  OPENAI_COMPATIBLE_PREFIX,
  ANTHROPIC_COMPATIBLE_PREFIX,
} from "@/shared/constants/providers";
import {
  SIDEBAR_SECTIONS,
  getSectionItems,
  type SidebarItemDefinition,
  type HideableSidebarItemId,
} from "@/shared/constants/sidebarVisibility";
import { useIsElectron } from "@/shared/hooks/useElectron";

const isE2EMode = process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE === "1";

// Map sidebar item id → header description i18n key
const HEADER_DESCRIPTIONS: Partial<Record<HideableSidebarItemId, string>> = {
  home: "homeDescription",
  endpoints: "endpointDescription",
  "api-manager": "apiManagerDescription",
  providers: "providerDescription",
  combos: "comboDescription",
  batch: "batchDescription",
  costs: "costsDescription",
  analytics: "analyticsDescription",
  cache: "cacheDescription",
  limits: "limitsDescription",
  media: "mediaDescription",
  agents: "agentsDescription",
  "cloud-agents": "cloudAgentsDescription",
  memory: "memoryDescription",
  skills: "skillsDescription",
  "agent-skills": "agentSkillsDescription",
  settings: "settingsDescription",
  "context-caveman": "contextCavemanDescription",
  "context-rtk": "contextRtkDescription",
  "context-combos": "contextCombosDescription",
  translator: "translatorDescription",
  playground: "playgroundDescription",
  "search-tools": "searchToolsDescription",
  logs: "logsDescription",
  audit: "auditDescription",
  webhooks: "webhooksDescription",
  health: "healthDescription",
  proxy: "proxyDescription",
  changelog: "changelogDescription",
  // Protocols
  mcp: "mcpDescription",
  a2a: "a2aDescription",
  "api-endpoints": "apiEndpointsDescription",
  // Agents & AI sub-pages
  "batch-files": "batchFilesDescription",
  // Analytics sub-pages
  "analytics-evals": "analyticsEvalsDescription",
  "analytics-search": "analyticsSearchDescription",
  "analytics-utilization": "analyticsUtilizationDescription",
  "analytics-combo-health": "analyticsComboHealthDescription",
  "analytics-compression": "analyticsCompressionDescription",
  // Costs sub-pages
  "costs-budget": "costsBudgetDescription",
  "costs-pricing": "costsPricingDescription",
  // Logs sub-pages
  "logs-proxy": "logsProxyDescription",
  "logs-console": "logsConsoleDescription",
  "logs-activity": "logsActivityDescription",
  // Audit sub-pages
  "audit-mcp": "auditMcpDescription",
  // Settings sub-pages
  "settings-general": "settingsGeneralDescription",
  "settings-appearance": "settingsAppearanceDescription",
  "settings-ai": "settingsAiDescription",
  "settings-security": "settingsSecurityDescription",
  "settings-routing": "settingsRoutingDescription",
  "settings-resilience": "settingsResilienceDescription",
  "settings-advanced": "settingsAdvancedDescription",
  // Proxy sub-pages
  "mitm-proxy": "mitmProxyDescription",
  "1proxy": "oneProxyDescription",
  // OmniProxy items
  "cli-tools": "cliToolsDescription",
  agents: "agentsDescription",
  "cloud-agents": "cloudAgentsDescription",
  "api-endpoints": "apiEndpointsDescription",
  webhooks: "webhooksDescription",
};

// Build href → sidebar item lookup (non-external items only)
const sidebarByHref = new Map<string, SidebarItemDefinition>();
for (const section of SIDEBAR_SECTIONS) {
  for (const item of getSectionItems(section)) {
    if (!item.external) sidebarByHref.set(item.href, item);
  }
}

function getSidebarItem(pathname: string): SidebarItemDefinition | undefined {
  const exact = sidebarByHref.get(pathname);
  if (exact) return exact;
  // Longest prefix match
  let best: SidebarItemDefinition | undefined;
  let bestLen = 0;
  for (const [href, item] of sidebarByHref) {
    if (pathname.startsWith(href) && href.length > bestLen) {
      best = item;
      bestLen = href.length;
    }
  }
  return best;
}

type HeaderProps = {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
};

type PageInfo = {
  title: string;
  description: string;
  icon?: string;
  providerId?: string;
};

function usePageInfo(pathname: string | null): PageInfo {
  const ts = useTranslations("sidebar");
  const th = useTranslations("header");

  if (!pathname) return { title: "", description: "" };

  // Special: provider detail page /dashboard/providers/[id]
  const providerMatch = pathname.match(/\/providers\/([^/]+)$/);
  if (providerMatch) {
    const pid = providerMatch[1];
    const info = OAUTH_PROVIDERS[pid] || FREE_PROVIDERS[pid] || APIKEY_PROVIDERS[pid];
    if (info) return { title: info.name, description: "", providerId: info.id };
    if (pid.startsWith(CLAUDE_CODE_COMPATIBLE_PREFIX))
      return { title: "CC Compatible", description: "", providerId: "claude" };
    if (pid.startsWith(OPENAI_COMPATIBLE_PREFIX))
      return { title: th("openaiCompatible"), description: "", providerId: "oai-cc" };
    if (pid.startsWith(ANTHROPIC_COMPATIBLE_PREFIX))
      return { title: th("anthropicCompatible"), description: "", providerId: "anthropic-m" };
  }

  // Derive from sidebar
  const item = getSidebarItem(pathname);
  if (item) {
    const descKey = HEADER_DESCRIPTIONS[item.id];
    return {
      title: ts(item.i18nKey),
      description: descKey ? th(descKey) : "",
      icon: item.icon,
    };
  }

  return { title: "", description: "" };
}

export default function Header({ onMenuClick, showMenuButton = true }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isElectron = useIsElectron();
  const t = useTranslations("header");
  const { title, description, icon, providerId } = usePageInfo(pathname);
  const isMacElectron =
    isElectron &&
    typeof window !== "undefined" &&
    (window as any).electronAPI?.platform === "darwin";

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <header
      className="sticky top-0 z-10 flex items-center justify-between border-b border-black/5 bg-bg px-8 py-4 dark:border-white/5"
      style={{
        paddingTop: isMacElectron ? "calc(1rem + var(--desktop-safe-top))" : undefined,
      }}
    >
      {/* Mobile menu button */}
      <div className="flex items-center gap-3 lg:hidden">
        {showMenuButton && (
          <button
            onClick={onMenuClick}
            className="text-text-main hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        )}
      </div>

      {/* Page title with icon - desktop */}
      <div className="hidden lg:flex items-center gap-3">
        {(icon || providerId) && (
          <div className="flex items-center justify-center size-9 rounded-lg bg-primary/10 shrink-0">
            {icon ? (
              <span className="material-symbols-outlined text-primary text-[20px]">{icon}</span>
            ) : (
              providerId && <ProviderIcon providerId={providerId} size={22} type="color" />
            )}
          </div>
        )}
        {title && (
          <div>
            <h1 className="text-xl font-semibold text-text-main tracking-tight">{title}</h1>
            {description && <p className="text-xs text-text-muted mt-0.5">{description}</p>}
          </div>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 ml-auto">
        <LanguageSelector />
        <ThemeToggle />
        {!isE2EMode && <DegradationBadge />}
        {!isE2EMode && <TokenHealthBadge />}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center p-2 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-all"
          title={t("logout")}
        >
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>
    </header>
  );
}
