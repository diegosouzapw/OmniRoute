"use client";

import { useCallback, useEffect, useState } from "react";

type IssueAgentMode = "triage" | "fix" | "triage-and-fix";

export function useIssueAgentActions(selectedLog: unknown, detailData: unknown) {
  const [enabled, setEnabled] = useState(false);
  const [fixEnabled, setFixEnabled] = useState(false);
  const [runningMode, setRunningMode] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        setEnabled(data?.issueAgent?.manualActionsEnabled === true);
        setFixEnabled(data?.issueAgent?.fixPrCreationEnabled === true);
      } catch {
        if (mounted) {
          setEnabled(false);
          setFixEnabled(false);
        }
      }
    }
    void loadSettings();
    return () => {
      mounted = false;
    };
  }, []);

  const run = useCallback(
    async (mode: IssueAgentMode) => {
      if (!selectedLog) return;
      setRunningMode(mode);
      setStatus(`Starting ${mode} run...`);
      try {
        const res = await fetch("/api/issue-agent/runs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode,
            source: "request-log",
            log: selectedLog,
            detail: detailData,
          }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(data?.error?.message || data?.error || `HTTP ${res.status}`);
        }
        const runRecord = data?.run;
        const suffix =
          runRecord?.status === "blocked" ? " blocked by prerequisite checks" : " recorded";
        setStatus(`Issue-agent run ${runRecord?.id || "created"}${suffix}.`);
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Failed to start issue-agent run");
      } finally {
        setRunningMode(null);
      }
    },
    [detailData, selectedLog]
  );

  return {
    enabled,
    fixEnabled,
    runningMode,
    status,
    run,
  };
}
