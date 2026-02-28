"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import { ThemeToggle } from "@/shared/components";
import TokenHealthBadge from "./TokenHealthBadge";
import LanguageSelector from "./LanguageSelector";
import { useTranslations } from "next-intl";
import {
  OAUTH_PROVIDERS,
  APIKEY_PROVIDERS,
  FREE_PROVIDERS,
  OPENAI_COMPATIBLE_PREFIX,
  ANTHROPIC_COMPATIBLE_PREFIX,
} from "@/shared/constants/providers";

function usePageInfo(pathname: string | null) {
  const t = useTranslations("header");

  if (!pathname) return { title: "", description: "", breadcrumbs: [] };

  // Provider detail page: /dashboard/providers/[id]
  const providerMatch = pathname.match(/\/providers\/([^/]+)$/);
  if (providerMatch) {
    const providerId = providerMatch[1];
    const providerInfo =
      OAUTH_PROVIDERS[providerId] || FREE_PROVIDERS[providerId] || APIKEY_PROVIDERS[providerId];

    if (providerInfo) {
      return {
        title: providerInfo.name,
        description: "",
        breadcrumbs: [
          { label: t("providers"), href: "/dashboard/providers" },
          { label: providerInfo.name, image: `/providers/${providerInfo.id}.png` },
        ],
      };
    }

    if (providerId.startsWith(OPENAI_COMPATIBLE_PREFIX)) {
      return {
        title: t("openaiCompatible"),
        description: "",
        breadcrumbs: [
          { label: t("providers"), href: "/dashboard/providers" },
          { label: t("openaiCompatible"), image: "/providers/oai-cc.png" },
        ],
      };
    }

    if (providerId.startsWith(ANTHROPIC_COMPATIBLE_PREFIX)) {
      return {
        title: t("anthropicCompatible"),
        description: "",
        breadcrumbs: [
          { label: t("providers"), href: "/dashboard/providers" },
          { label: t("anthropicCompatible"), image: "/providers/anthropic-m.png" },
        ],
      };
    }
  }

  if (pathname.includes("/providers"))
    return {
      title: t("providers"),
      description: t("providerDescription"),
      breadcrumbs: [],
    };
  if (pathname.includes("/combos"))
    return { title: t("combos"), description: t("comboDescription"), breadcrumbs: [] };
  if (pathname.includes("/usage"))
    return {
      title: t("usage"),
      description: t("usageDescription"),
      breadcrumbs: [],
    };
  if (pathname.includes("/analytics"))
    return {
      title: t("analytics"),
      description: t("analyticsDescription"),
      breadcrumbs: [],
    };
  if (pathname.includes("/cli-tools"))
    return { title: t("cliTools"), description: t("cliToolsDescription"), breadcrumbs: [] };
  if (pathname === "/dashboard")
    return { title: t("home"), description: t("homeDescription"), breadcrumbs: [] };
  if (pathname.includes("/endpoint"))
    return { title: t("endpoint"), description: t("endpointDescription"), breadcrumbs: [] };
  if (pathname.includes("/profile"))
    return { title: t("settings"), description: t("settingsDescription"), breadcrumbs: [] };

  return { title: "", description: "", breadcrumbs: [] };
}

export default function Header({ onMenuClick, showMenuButton = true }) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("header");
  const { title, description, breadcrumbs } = usePageInfo(pathname);

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
    <header className="flex items-center justify-between px-8 py-5 border-b border-black/5 dark:border-white/5 bg-bg/80 backdrop-blur-xl z-10 sticky top-0">
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

      {/* Page title with breadcrumbs - desktop */}
      <div className="hidden lg:flex flex-col">
        {breadcrumbs.length > 0 ? (
          <div className="flex items-center gap-2">
            {breadcrumbs.map((crumb, index) => (
              <div
                key={`${crumb.label}-${crumb.href || "current"}`}
                className="flex items-center gap-2"
              >
                {index > 0 && (
                  <span className="material-symbols-outlined text-text-muted text-base">
                    chevron_right
                  </span>
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    {crumb.image && (
                      <Image
                        src={crumb.image}
                        alt={crumb.label}
                        width={28}
                        height={28}
                        className="object-contain rounded max-w-[28px] max-h-[28px]"
                        sizes="28px"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                    <h1 className="text-2xl font-semibold text-text-main tracking-tight">
                      {crumb.label}
                    </h1>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : title ? (
          <div>
            <h1 className="text-2xl font-semibold text-text-main tracking-tight">{title}</h1>
            {description && <p className="text-sm text-text-muted">{description}</p>}
          </div>
        ) : null}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Language selector */}
        <LanguageSelector />

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Token health */}
        <TokenHealthBadge />

        {/* Logout button */}
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

Header.propTypes = {
  onMenuClick: PropTypes.func,
  showMenuButton: PropTypes.bool,
};
