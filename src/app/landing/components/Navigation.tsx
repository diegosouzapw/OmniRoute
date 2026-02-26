"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import OmniRouteLogo from "@/shared/components/OmniRouteLogo";

export default function Navigation() {
  const t = useTranslations("landing");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#0B0E14]/80 backdrop-blur-md border-b border-[#2D333B]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-3 cursor-pointer bg-transparent border-none p-0"
          onClick={() => router.push("/")}
          aria-label={t("navigateHome")}
        >
          <div className="size-8 rounded bg-linear-to-br from-[#E54D5E] to-[#C93D4E] flex items-center justify-center text-white">
            <OmniRouteLogo size={20} className="text-white" />
          </div>
          <h2 className="text-white text-xl font-bold tracking-tight">{t("brandName")}</h2>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <a
            className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            href="#features"
          >
            {t("featuresLink")}
          </a>
          <a
            className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            href="#how-it-works"
          >
            {t("howItWorks")}
          </a>
          <a
            className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            href="/docs"
          >
            {t("docsLink")}
          </a>
          <a
            className="text-gray-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1"
            href="https://github.com/diegosouzapw/OmniRoute"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("github")}
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              open_in_new
            </span>
          </a>
        </div>

        {/* CTA + Mobile menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="hidden sm:flex h-9 items-center justify-center rounded-lg px-4 bg-[#E54D5E] hover:bg-[#C93D4E] transition-all text-white text-sm font-bold shadow-[0_0_15px_rgba(229,77,94,0.4)] hover:shadow-[0_0_20px_rgba(229,77,94,0.6)]"
          >
            {t("getStarted")}
          </button>
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t("toggleMenu")}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2D333B] bg-[#0B0E14]/95 backdrop-blur-md">
          <div className="flex flex-col gap-4 p-6">
            <a
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("featuresLink")}
            </a>
            <a
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("howItWorks")}
            </a>
            <a
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
              href="/docs"
            >
              {t("docsLink")}
            </a>
            <a
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
              href="https://github.com/diegosouzapw/OmniRoute"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("github")}
            </a>
            <button
              onClick={() => router.push("/dashboard")}
              className="h-9 rounded-lg bg-[#E54D5E] hover:bg-[#C93D4E] text-white text-sm font-bold"
            >
              {t("getStarted")}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
