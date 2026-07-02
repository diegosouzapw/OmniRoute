"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("landing");
  const router = useRouter();

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#E54D5E]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center gap-8">
        {/* Version badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#2D333B] bg-[#111520]/50 px-3 py-1 text-xs font-medium text-[#E54D5E]">
          <span className="flex h-2 w-2 rounded-full bg-[#E54D5E] animate-pulse"></span>
          {t("versionLive")}
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] tracking-tight break-words">
          {t("oneEndpoint")} <br />
          <span className="text-[#E54D5E]">{t("allProviders")}</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light break-words">
          {t("heroDescription")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full sm:w-auto h-12 px-8 rounded-lg bg-[#E54D5E] hover:bg-[#C93D4E] text-white text-base font-bold transition-all shadow-[0_0_15px_rgba(229,77,94,0.4)] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              rocket_launch
            </span>
            {t("getStarted")}
          </button>
          <a
            href="https://github.com/diegosouzapw/OmniRoute"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-12 px-8 rounded-lg border border-[#2D333B] bg-[#111520] hover:bg-[#2D333B] text-white text-base font-bold transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              code
            </span>
            {t("viewOnGithub")}
          </a>
        </div>
      </div>
    </section>
  );
}
