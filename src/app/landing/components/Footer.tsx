"use client";
import { useTranslations } from "next-intl";
import OmniRouteLogo from "@/shared/components/OmniRouteLogo";

export default function Footer() {
  const t = useTranslations("landing");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2D333B] bg-[#080A0F] pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-6 rounded bg-[#E54D5E] flex items-center justify-center text-white">
                <OmniRouteLogo size={16} className="text-white" />
              </div>
              <h3 className="text-white text-lg font-bold">{t("brandName")}</h3>
            </div>
            <p className="text-gray-500 text-sm max-w-xs mb-6">{t("footerTagline")}</p>
            <div className="flex gap-4">
              <a
                className="text-gray-400 hover:text-white transition-colors"
                href="https://github.com/diegosouzapw/OmniRoute"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  code
                </span>
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white">{t("product")}</h4>
            <a
              className="text-gray-400 hover:text-[#E54D5E] text-sm transition-colors"
              href="#features"
            >
              {t("featuresLink")}
            </a>
            <a
              className="text-gray-400 hover:text-[#E54D5E] text-sm transition-colors"
              href="/dashboard"
            >
              {t("dashboardLink")}
            </a>
            <a
              className="text-gray-400 hover:text-[#E54D5E] text-sm transition-colors"
              href="https://github.com/diegosouzapw/OmniRoute/releases"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("changelog")}
            </a>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white">{t("resources")}</h4>
            <a
              className="text-gray-400 hover:text-[#E54D5E] text-sm transition-colors"
              href="/docs"
            >
              {t("documentation")}
            </a>
            <a
              className="text-gray-400 hover:text-[#E54D5E] text-sm transition-colors"
              href="https://github.com/diegosouzapw/OmniRoute"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("github")}
            </a>
            <a
              className="text-gray-400 hover:text-[#E54D5E] text-sm transition-colors"
              href="https://www.npmjs.com/package/omniroute"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("npm")}
            </a>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white">{t("legal")}</h4>
            <a
              className="text-gray-400 hover:text-[#E54D5E] text-sm transition-colors"
              href="https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("mitLicense")}
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#2D333B] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">{t("copyright", { year })}</p>
          <div className="flex gap-6">
            <a
              className="text-gray-600 hover:text-white text-sm transition-colors"
              href="https://github.com/diegosouzapw/OmniRoute"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("github")}
            </a>
            <a
              className="text-gray-600 hover:text-white text-sm transition-colors"
              href="https://www.npmjs.com/package/omniroute"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("npm")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
