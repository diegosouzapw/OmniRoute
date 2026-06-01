"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AgentCard } from "./AgentCard";
import type { MitmTargetView } from "@/mitm/types";
import type { AgentStateEntry, AgentMappingsMap } from "../AgentBridgePageClient";
import type { MappingRow } from "./ModelMappingTable";

interface AgentListProps {
  targets: MitmTargetView[];
  agentStates: AgentStateEntry[];
  serverRunning: boolean;
  mappingsMap: AgentMappingsMap;
  onDnsToggle: (agentId: string, enabled: boolean) => Promise<void>;
  onMappingsSave: (agentId: string, mappings: MappingRow[]) => Promise<void>;
}

type SetupFilter = "all" | "active" | "setup-required" | "investigating";

/**
 * Grid of agent cards with filter + search controls.
 * Matches plan 11 §3 IDE Agents section.
 */
export function AgentList({
  targets,
  agentStates,
  serverRunning,
  mappingsMap,
  onDnsToggle,
  onMappingsSave,
}: AgentListProps) {
  const t = useTranslations("agentBridge");
  const [filter, setFilter] = useState<SetupFilter>("all");
  const [search, setSearch] = useState("");

  const stateByAgent = Object.fromEntries(agentStates.map((s) => [s.agent_id, s]));

  const filtered = targets.filter((target) => {
    // Search filter
    if (search) {
      const q = search.toLowerCase();
      if (
        !target.name.toLowerCase().includes(q) &&
        !target.id.toLowerCase().includes(q) &&
        !target.hosts.some((h) => h.toLowerCase().includes(q))
      ) {
        return false;
      }
    }

    const state = stateByAgent[target.id];

    // Setup status filter
    if (filter === "active") {
      return state?.dns_enabled && state?.setup_completed;
    }
    if (filter === "setup-required") {
      return !state?.setup_completed && target.viability !== "investigating";
    }
    if (filter === "investigating") {
      return target.viability === "investigating";
    }

    return true;
  });

  const filterOptions: { id: SetupFilter; label: string }[] = [
    { id: "all", label: t("filterAll") || "All" },
    { id: "active", label: t("filterActive") || "Active" },
    { id: "setup-required", label: t("filterSetupRequired") || "Setup required" },
    { id: "investigating", label: t("filterInvestigating") || "Investigating" },
  ];

  return (
    <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-border/30">
        <h2 className="text-sm font-semibold text-text-main mr-auto">
          {t("agentListTitle") || "IDE Agents"}{" "}
          <span className="text-text-muted font-normal">({targets.length})</span>
        </h2>

        {/* Filter buttons */}
        <div className="flex gap-1">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setFilter(opt.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                filter === opt.id
                  ? "bg-primary/10 text-primary"
                  : "text-text-muted hover:text-text-main hover:bg-surface"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-[16px] text-text-muted pointer-events-none">
            search
          </span>
          <input
            type="text"
            className="rounded-lg border border-border/50 bg-surface pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder={t("searchAgents") || "Search agents…"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="p-5 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="py-8 text-center text-text-muted">
            <span className="material-symbols-outlined text-[36px] block mb-2 text-text-muted/40">
              search_off
            </span>
            <p className="text-sm">{t("noAgentsMatch") || "No agents match the current filter"}</p>
          </div>
        ) : (
          filtered.map((target) => (
            <AgentCard
              key={target.id}
              target={target}
              agentState={stateByAgent[target.id]}
              serverRunning={serverRunning}
              mappings={mappingsMap[target.id] ?? []}
              onDnsToggle={onDnsToggle}
              onMappingsSave={onMappingsSave}
            />
          ))
        )}
      </div>
    </div>
  );
}
