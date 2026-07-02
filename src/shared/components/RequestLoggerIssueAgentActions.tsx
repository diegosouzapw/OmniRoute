"use client";

type IssueAgentMode = "triage" | "fix" | "triage-and-fix";

type IssueAgentActionProps = {
  fixEnabled: boolean;
  runningMode: string | null;
  onRun?: (mode: IssueAgentMode) => void;
};

function IssueAgentButton({
  icon,
  label,
  title,
  disabled,
  onClick,
}: {
  icon: string;
  label: string;
  title: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-1.5 rounded-lg hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors disabled:opacity-30 disabled:pointer-events-none"
      aria-label={label}
      title={title}
    >
      <span className="material-symbols-outlined text-[18px]">{icon}</span>
    </button>
  );
}

export function RequestLoggerIssueAgentActions({
  fixEnabled,
  runningMode,
  onRun,
}: IssueAgentActionProps) {
  const running = runningMode !== null;
  const fixTitle = fixEnabled ? "Try fix" : "Enable fix PRs in Advanced Settings";
  const combinedTitle = fixEnabled ? "Explain and fix" : "Enable fix PRs in Advanced Settings";

  return (
    <div className="flex items-center gap-1 mr-2">
      <IssueAgentButton
        icon="psychology"
        label="Explain issue"
        title="Explain issue"
        disabled={running}
        onClick={() => onRun?.("triage")}
      />
      <IssueAgentButton
        icon="build"
        label="Try fix"
        title={fixTitle}
        disabled={!fixEnabled || running}
        onClick={() => onRun?.("fix")}
      />
      <IssueAgentButton
        icon="auto_fix_high"
        label="Explain and fix"
        title={combinedTitle}
        disabled={!fixEnabled || running}
        onClick={() => onRun?.("triage-and-fix")}
      />
    </div>
  );
}

export function RequestLoggerIssueAgentStatus({ status }: { status: string }) {
  return (
    <div className="rounded-xl border border-border bg-bg-subtle px-4 py-3 text-sm text-text-muted">
      {status}
    </div>
  );
}
