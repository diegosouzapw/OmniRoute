"use client";

import { useEffect, useState } from "react";
import { Button, Card, Input, Toggle } from "@/shared/components";

type IssueAgentSettings = {
  automaticReportsEnabled: boolean;
  manualActionsEnabled: boolean;
  fixPrCreationEnabled: boolean;
  provider: string;
  model: string;
  routingPolicy: string;
  githubRepository: string;
  defaultBaseBranch: string;
  dockerWorkerImage: string;
  retentionDays: number;
  budgets: {
    maxRuntimeSeconds: number;
    maxTokens: number;
    maxCostUsd: number;
  };
};

const DEFAULTS: IssueAgentSettings = {
  automaticReportsEnabled: false,
  manualActionsEnabled: true,
  fixPrCreationEnabled: false,
  provider: "omniroute",
  model: "",
  routingPolicy: "default",
  githubRepository: "",
  defaultBaseBranch: "main",
  dockerWorkerImage: "ghcr.io/omniroute/issue-agent-worker:latest",
  retentionDays: 7,
  budgets: {
    maxRuntimeSeconds: 900,
    maxTokens: 200000,
    maxCostUsd: 10,
  },
};

function mergeSettings(value: Partial<IssueAgentSettings> | null | undefined): IssueAgentSettings {
  return {
    ...DEFAULTS,
    ...(value || {}),
    budgets: {
      ...DEFAULTS.budgets,
      ...(value?.budgets || {}),
    },
  };
}

export default function IssueAgentSettingsCard() {
  const [settings, setSettings] = useState<IssueAgentSettings>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (!res.ok) throw new Error(`Settings request failed with HTTP ${res.status}`);
        const data = await res.json();
        if (mounted) setSettings(mergeSettings(data.issueAgent));
      } catch (error) {
        if (mounted) setStatus(error instanceof Error ? error.message : "Failed to load settings");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  const patch = (updates: Partial<IssueAgentSettings>) => {
    setSettings((current) => mergeSettings({ ...current, ...updates }));
  };

  const patchBudget = (key: keyof IssueAgentSettings["budgets"], value: number) => {
    setSettings((current) => ({
      ...current,
      budgets: { ...current.budgets, [key]: value },
    }));
  };

  const save = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issueAgent: settings }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(
          data?.error?.message || data?.error || "Failed to save issue-agent settings"
        );
      }
      setSettings(mergeSettings(data.issueAgent));
      setStatus("Saved issue-agent settings.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to save issue-agent settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                smart_toy
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI issue agents</h3>
              <p className="text-sm text-text-muted">
                Configure bug-report, triage, and draft-PR agent budgets.
              </p>
            </div>
          </div>
          <Button
            onClick={save}
            loading={saving}
            disabled={loading}
            icon="save"
            variant="secondary"
          >
            Save
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Toggle
            checked={settings.manualActionsEnabled}
            onChange={(value) => patch({ manualActionsEnabled: value })}
            label="Manual actions"
            description="Show actions in request errors."
            disabled={loading}
          />
          <Toggle
            checked={settings.automaticReportsEnabled}
            onChange={(value) => patch({ automaticReportsEnabled: value })}
            label="Automatic reports"
            description="Opt-in filing for matching failures."
            disabled={loading}
          />
          <Toggle
            checked={settings.fixPrCreationEnabled}
            onChange={(value) => patch({ fixPrCreationEnabled: value })}
            label="Fix PRs"
            description="Allow fix runs to create draft PRs."
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input
            label="Provider"
            value={settings.provider}
            onChange={(e) => patch({ provider: e.target.value })}
          />
          <Input
            label="Model"
            value={settings.model}
            onChange={(e) => patch({ model: e.target.value })}
          />
          <Input
            label="Routing policy"
            value={settings.routingPolicy}
            onChange={(e) => patch({ routingPolicy: e.target.value })}
          />
          <Input
            label="GitHub repository"
            placeholder="owner/repo"
            value={settings.githubRepository}
            onChange={(e) => patch({ githubRepository: e.target.value })}
          />
          <Input
            label="Base branch"
            value={settings.defaultBaseBranch}
            onChange={(e) => patch({ defaultBaseBranch: e.target.value })}
          />
          <Input
            label="Docker worker image"
            value={settings.dockerWorkerImage}
            onChange={(e) => patch({ dockerWorkerImage: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input
            label="Runtime seconds"
            type="number"
            value={settings.budgets.maxRuntimeSeconds}
            onChange={(e) => patchBudget("maxRuntimeSeconds", Number(e.target.value))}
          />
          <Input
            label="Token budget"
            type="number"
            value={settings.budgets.maxTokens}
            onChange={(e) => patchBudget("maxTokens", Number(e.target.value))}
          />
          <Input
            label="Cost budget USD"
            type="number"
            value={settings.budgets.maxCostUsd}
            onChange={(e) => patchBudget("maxCostUsd", Number(e.target.value))}
          />
          <Input
            label="Retention days"
            type="number"
            value={settings.retentionDays}
            onChange={(e) => patch({ retentionDays: Number(e.target.value) })}
          />
        </div>

        {status && <div className="text-sm text-text-muted">{status}</div>}
      </div>
    </Card>
  );
}
