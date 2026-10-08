"use client";

import { useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";

const subscribePlatform = () => () => {};
const getPlatformIsMac = () => {
  if (typeof navigator === "undefined") return false;
  const platform = navigator.platform || navigator.userAgent;
  return /Mac|iPhone|iPad|iPod/.test(platform);
};
const getPlatformIsMacServer = () => false;
import ThemeToggle from "./ThemeToggle";
import TokenHealthBadge from "./TokenHealthBadge";
import DegradationBadge from "./DegradationBadge";
import LanguageSelector from "./LanguageSelector";
import ProviderIcon from "./ProviderIcon";
import { useTranslations } from "next-intl";
import {
  OAUTH_PROVIDERS,
  APIKEY_PROVIDERS,
  NOAUTH_PROVIDERS,
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

const isE2EMode = process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE === "1";

// Map sidebar item id → header description i18n key
// "omni-skills" is an extended key for the /dashboard/omni-skills route (graceful fallback during deploy)
const HEADER_DESCRIPTIONS: Partial<Record<HideableSidebarItemId | "omni-skills", string>> = {
  home: "homeDescription",
  endpoints: "endpointDescription",
  "api-manager": "apiManagerDescription",
  providers: "providerDescription",
  combos: "comboDescription",
  batch: "batchDescription",
  costs: "costsDescription",
  analytics: "analyticsDescription",
  cache: "cacheDescription",
  quota: "limitsDescription",
  runtime: "runtimeDescription",
  media: "mediaDescription",
  "cli-code": "cliToolsDescription",
  "cli-agents": "agentsDescription",
  "acp-agents": "agentsDescription",
  "cloud-agents": "cloudAgentsDescription",
  memory: "memoryDescription",
  skills: "skillsDescription",
  "agent-skills": "agentSkillsDescription",
  "omni-skills": "omniSkillsDescription",
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
  "settings-cache": "settingsCacheDescription",
  "settings-advanced": "settingsAdvancedDescription",
  // Proxy sub-pages
  "mitm-proxy": "mitmProxyDescription",
  "1proxy": "oneProxyDescription",
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
  onOpenCommandPalette?: () => void;
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
    const info = OAUTH_PROVIDERS[pid] || NOAUTH_PROVIDERS[pid] || APIKEY_PROVIDERS[pid];
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

export default function Header({
  onMenuClick,
  onOpenCommandPalette,
  showMenuButton = true,
}: HeaderProps) {
  const isMac = useSyncExternalStore(subscribePlatform, getPlatformIsMac, getPlatformIsMacServer);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("header");
  const { title, description, icon, providerId } = usePageInfo(pathname);
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
      className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-bg px-6 py-4 lg:px-8"
      style={{
        paddingTop: "calc(1rem + var(--ios-safe-top, 0px))",
      }}
    >
      {/* Mobile menu button */}
      <div className="flex items-center gap-3 lg:hidden">
        {showMenuButton && (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            aria-controls="mobile-sidebar"
            className="p-2 rounded-md text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              menu
            </span>
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
            <h1 className="text-[26px] leading-8 font-semibold text-text-main tracking-tight">
              {title}
            </h1>
            {description && <p className="text-[13px] text-text-muted mt-0.5">{description}</p>}
          </div>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 ml-auto">
        {onOpenCommandPalette && (
          <>
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="hidden md:inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-border bg-bg-subtle text-text-muted hover:text-text-main hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
              title={t("quickNavigationTitle")}
              aria-label={t("openQuickNavigation")}
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                search
              </span>
              <span className="text-xs">{t("quickNavigation")}</span>
              <kbd className="hidden lg:inline-flex font-mono text-[10px] px-1 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-border">
                {isMac ? "⌘K" : "Ctrl+K"}
              </kbd>
            </button>
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="md:hidden p-2 rounded-md text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label={t("openQuickNavigation")}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                search
              </span>
            </button>
          </>
        )}
        <LanguageSelector />
        <ThemeToggle />
        {!isE2EMode && <DegradationBadge />}
        {!isE2EMode && <TokenHealthBadge />}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-center p-2 rounded-md text-text-muted hover:text-red-600 hover:bg-red-600/10 transition-colors"
          title={t("logout")}
          aria-label={t("logout")}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            logout
          </span>
        </button>
      </div>
    </header>
  );
}
