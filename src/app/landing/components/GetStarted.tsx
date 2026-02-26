"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function GetStarted() {
  const t = useTranslations("landing");
  const [copied, setCopied] = useState(false);

  const endpoint = "http://localhost:20128";
  const dashboardUrl = `${endpoint}/dashboard`;
  const command = "npx omniroute";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-6 bg-[#080A0F]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left: Steps */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("getStartedIn30Seconds")}</h2>
            <p className="text-gray-400 text-lg mb-8">{t("getStartedDescription")}</p>

            <div className="flex flex-col gap-6">
              <div className="flex gap-4 min-w-0">
                <div className="flex-none w-8 h-8 rounded-full bg-[#E54D5E]/20 text-[#E54D5E] flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-lg">{t("installOmniRoute")}</h4>
                  <p className="text-sm text-gray-500 mt-1">{t("installStepDescription")}</p>
                </div>
              </div>

              <div className="flex gap-4 min-w-0">
                <div className="flex-none w-8 h-8 rounded-full bg-[#E54D5E]/20 text-[#E54D5E] flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-lg">{t("openDashboard")}</h4>
                  <p className="text-sm text-gray-500 mt-1">{t("openDashboardStepDescription")}</p>
                </div>
              </div>

              <div className="flex gap-4 min-w-0">
                <div className="flex-none w-8 h-8 rounded-full bg-[#E54D5E]/20 text-[#E54D5E] flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-lg">{t("routeRequests")}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {t("routeRequestsStepDescription", { endpoint })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Code block */}
          <div className="flex-1 w-full">
            <div className="rounded-xl overflow-hidden bg-[#161B22] border border-[#2D333B] shadow-2xl">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#111520] border-b border-gray-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-2 text-xs text-gray-500 font-mono">{t("terminal")}</div>
              </div>

              {/* Terminal content */}
              <div className="p-6 font-mono text-sm leading-relaxed overflow-x-hidden">
                <div
                  className="flex items-center gap-2 mb-4 group cursor-pointer min-w-0"
                  onClick={() => handleCopy(command)}
                >
                  <span className="text-green-400">$</span>
                  <span className="text-white break-all">{command}</span>
                  <span className="ml-auto text-gray-500 text-xs opacity-0 group-hover:opacity-100">
                    {copied ? t("copied") : t("copy")}
                  </span>
                </div>

                <div className="text-gray-400 mb-6">
                  <span className="text-[#E54D5E]">&gt;</span> {t("startingOmniRoute")}
                  <br />
                  <span className="text-[#E54D5E]">&gt;</span> {t("serverRunningOnLabel")}{" "}
                  <span className="text-blue-400 break-all">{endpoint}</span>
                  <br />
                  <span className="text-[#E54D5E]">&gt;</span> {t("dashboardLabel")}:{" "}
                  <span className="text-blue-400 break-all">{dashboardUrl}</span>
                  <br />
                  <span className="text-green-400">&gt;</span> {t("readyToRoute")}
                </div>

                <div className="text-xs text-gray-500 mb-2 border-t border-gray-700 pt-4">
                  {t("configureProvidersNote")}
                </div>

                <div className="text-gray-400 text-xs">
                  <span className="text-purple-400">{t("dataLocation")}</span>
                  <br />
                  <span className="text-gray-500">{t("dataLocationMacLinux")}</span>{" "}
                  <span className="break-all">~/.omniroute/db.json</span>
                  <br />
                  <span className="text-gray-500">{t("dataLocationWindows")}</span>{" "}
                  <span className="break-all">%APPDATA%/omniroute/db.json</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
