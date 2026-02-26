"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function FlowAnimation() {
  const t = useTranslations("landing");
  const [activeFlow, setActiveFlow] = useState(0);

  const cliTools = [
    { id: "claude", name: t("flowToolClaudeCode"), image: "/providers/claude.png" },
    { id: "codex", name: t("flowToolOpenAICodex"), image: "/providers/codex.png" },
    { id: "cline", name: t("flowToolCline"), image: "/providers/cline.png" },
    { id: "cursor", name: t("flowToolCursor"), image: "/providers/cursor.png" },
  ];

  const providers = [
    {
      id: "openai",
      name: t("flowProviderOpenAI"),
      color: "bg-emerald-500",
      textColor: "text-white",
    },
    {
      id: "anthropic",
      name: t("flowProviderAnthropic"),
      color: "bg-orange-400",
      textColor: "text-white",
    },
    {
      id: "gemini",
      name: t("flowProviderGemini"),
      color: "bg-blue-500",
      textColor: "text-white",
    },
    {
      id: "github",
      name: t("flowProviderGithubCopilot"),
      color: "bg-gray-700",
      textColor: "text-white",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlow((prev) => (prev + 1) % providers.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [providers.length]);

  return (
    <div className="mt-16 w-full max-w-4xl">
      <div className="relative h-[360px] hidden md:flex items-center justify-center animate-[float_6s_ease-in-out_infinite]">
        {/* OmniRoute Hub - Center */}
        <div className="relative z-20 w-32 h-32 rounded-full bg-[#111520] border-2 border-[#E54D5E] shadow-[0_0_40px_rgba(229,77,94,0.3)] flex flex-col items-center justify-center gap-1 group cursor-pointer hover:scale-105 transition-transform duration-500">
          <span className="material-symbols-outlined text-4xl text-[#E54D5E]" aria-hidden="true">
            hub
          </span>
          <span className="text-xs font-bold text-white tracking-widest uppercase">
            {t("brandName")}
          </span>
          <div className="absolute inset-0 rounded-full border border-[#E54D5E]/30 animate-ping opacity-20"></div>
        </div>

        {/* CLI Tools - Left side */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-7">
          {cliTools.map((tool) => (
            <div
              key={tool.id}
              className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#111520] border border-[#2D333B] flex items-center justify-center overflow-hidden p-2 hover:border-[#E54D5E]/50 transition-all hover:scale-105">
                <Image
                  src={tool.image}
                  alt={tool.name}
                  width={48}
                  height={48}
                  className="object-contain rounded-xl max-w-[48px] max-h-[48px]"
                  sizes="48px"
                />
              </div>
            </div>
          ))}
        </div>

        {/* SVG Lines from CLI to OmniRoute */}
        <svg
          className="absolute inset-0 w-full h-full z-10 pointer-events-none stroke-yellow-700"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="animate-[dash_2s_linear_infinite]"
            d="M 60 50 C 250 70, 250 180, 360 180"
            fill="none"
            strokeDasharray="5,5"
            strokeWidth="2"
          ></path>
          <path
            className="animate-[dash_2s_linear_infinite]"
            d="M 60 140 C 250 140, 250 180, 360 180"
            fill="none"
            strokeDasharray="5,5"
            strokeWidth="2"
          ></path>
          <path
            className="animate-[dash_2s_linear_infinite]"
            d="M 60 210 C 250 210, 250 180, 360 180"
            fill="none"
            strokeDasharray="5,5"
            strokeWidth="2"
          ></path>
          <path
            className="animate-[dash_2s_linear_infinite]"
            d="M 60 300 C 250 280, 250 180, 360 180"
            fill="none"
            strokeDasharray="5,5"
            strokeWidth="2"
          ></path>
        </svg>

        {/* SVG Lines from OmniRoute to Providers */}
        <svg
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 440 180 C 550 180, 550 50, 740 50"
            fill="none"
            stroke={activeFlow === 0 ? "#E54D5E" : "rgb(75, 85, 99)"}
            strokeWidth={activeFlow === 0 ? "3" : "2"}
            className={activeFlow === 0 ? "animate-pulse" : ""}
          ></path>
          <path
            d="M 440 180 C 550 180, 550 130, 740 130"
            fill="none"
            stroke={activeFlow === 1 ? "#E54D5E" : "rgb(75, 85, 99)"}
            strokeWidth={activeFlow === 1 ? "3" : "2"}
            className={activeFlow === 1 ? "animate-pulse" : ""}
          ></path>
          <path
            d="M 440 180 C 550 180, 550 230, 740 230"
            fill="none"
            stroke={activeFlow === 2 ? "#E54D5E" : "rgb(75, 85, 99)"}
            strokeWidth={activeFlow === 2 ? "3" : "2"}
            className={activeFlow === 2 ? "animate-pulse" : ""}
          ></path>
          <path
            d="M 440 180 C 550 180, 550 310, 740 310"
            fill="none"
            stroke={activeFlow === 3 ? "#E54D5E" : "rgb(75, 85, 99)"}
            strokeWidth={activeFlow === 3 ? "3" : "2"}
            className={activeFlow === 3 ? "animate-pulse" : ""}
          ></path>
        </svg>

        {/* AI Providers - Right side */}
        <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between py-6">
          {providers.map((provider, idx) => (
            <div
              key={provider.id}
              className={`px-4 py-2 rounded-lg ${provider.color} ${provider.textColor} flex items-center justify-center font-bold text-xs shadow-lg hover:scale-110 transition-all cursor-help min-w-[140px] ${
                activeFlow === idx ? "ring-4 ring-[#E54D5E]/50 scale-110" : ""
              }`}
              title={provider.name}
            >
              {provider.name}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile fallback */}
      <div className="md:hidden mt-8 w-full p-4 rounded-lg bg-[#111520] border border-[#2D333B]">
        <p className="text-sm text-center text-gray-400">{t("interactiveDiagram")}</p>
      </div>
    </div>
  );
}
