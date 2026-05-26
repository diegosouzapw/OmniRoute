"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import { CliproxyServiceTab } from "./tabs/CliproxyServiceTab";
import { NinerouterServiceTab } from "./tabs/NinerouterServiceTab";

type Tab = "cliproxy" | "9router";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "cliproxy", label: "CLIProxyAPI", icon: "swap_horiz" },
  { id: "9router", label: "9Router", icon: "route" },
];

export default function ServicesPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const active = (sp.get("tab") ?? "cliproxy") as Tab;

  function setTab(tab: Tab) {
    router.push(`/dashboard/providers/services?tab=${tab}`);
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold text-text-primary">Embedded Services</h1>
        <p className="text-sm text-text-muted mt-1">
          External engines managed on demand — CLIProxyAPI and 9Router. Accessible on loopback only.
        </p>
      </header>

      {/* Tab strip */}
      <div className="flex gap-1 border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setTab(tab.id)}
            className={cn(
              "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
              active === tab.id
                ? "border-primary text-text-primary"
                : "border-transparent text-text-muted hover:text-text-primary hover:border-border"
            )}
            aria-current={active === tab.id ? "page" : undefined}
          >
            <span className="material-symbols-outlined text-[16px] leading-none">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {active === "cliproxy" && <CliproxyServiceTab />}
        {active === "9router" && <NinerouterServiceTab />}
      </div>
    </div>
  );
}
