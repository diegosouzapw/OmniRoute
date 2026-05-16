"use client";

import {
  AGENT_SKILLS,
  AGENT_SKILLS_REPO_URL,
  getAgentSkillRawUrl,
  getAgentSkillBlobUrl,
  type AgentSkill,
} from "@/shared/constants/agentSkills";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";

function CopyButton({ url }: { url: string }) {
  const { copied, copy } = useCopyToClipboard();
  const isCopied = copied === url;

  return (
    <button
      onClick={() => void copy(url, url)}
      className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-colors"
      style={{
        background: isCopied
          ? "var(--color-success-bg, #d1fae5)"
          : "var(--color-surface-2, #f3f4f6)",
        color: isCopied ? "var(--color-success, #065f46)" : "var(--color-text-2, #6b7280)",
      }}
      title="Copy raw URL to clipboard"
    >
      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
        {isCopied ? "check" : "content_copy"}
      </span>
      {isCopied ? "Copied!" : "Copy URL"}
    </button>
  );
}

function SkillRow({ skill }: { skill: AgentSkill }) {
  const rawUrl = getAgentSkillRawUrl(skill.id);
  const blobUrl = getAgentSkillBlobUrl(skill.id);

  return (
    <div
      className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-[var(--color-surface-hover,#f9fafb)]"
      style={{ borderColor: "var(--color-border, #e5e7eb)" }}
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ background: "var(--color-surface-2, #f3f4f6)" }}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 18, color: "var(--color-text-2, #6b7280)" }}
        >
          {skill.icon}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-semibold" style={{ color: "var(--color-text, #111827)" }}>
            {skill.name}
          </span>
          {skill.isEntry && (
            <span
              className="rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
              style={{
                background: "var(--color-primary-bg, #eff6ff)",
                color: "var(--color-primary, #2563eb)",
              }}
            >
              Start Here
            </span>
          )}
          {skill.isNew && (
            <span
              className="rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
              style={{
                background: "var(--color-warning-bg, #fef3c7)",
                color: "var(--color-warning, #92400e)",
              }}
            >
              New
            </span>
          )}
          {skill.endpoint && (
            <code
              className="rounded px-1.5 py-0.5 text-[10px]"
              style={{
                background: "var(--color-surface-2, #f3f4f6)",
                color: "var(--color-text-2, #6b7280)",
                fontFamily: "monospace",
              }}
            >
              {skill.endpoint}
            </code>
          )}
        </div>
        <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-2, #6b7280)" }}>
          {skill.description}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <a
          href={blobUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-colors hover:bg-[var(--color-surface-2,#f3f4f6)]"
          style={{ color: "var(--color-text-3, #9ca3af)" }}
          title="View on GitHub"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
            open_in_new
          </span>
        </a>
        <CopyButton url={rawUrl} />
      </div>
    </div>
  );
}

function SkillSection({
  title,
  subtitle,
  icon,
  skills,
}: {
  title: string;
  subtitle: string;
  icon: string;
  skills: AgentSkill[];
}) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 20, color: "var(--color-text-2, #6b7280)" }}
        >
          {icon}
        </span>
        <div>
          <h2 className="text-sm font-semibold" style={{ color: "var(--color-text, #111827)" }}>
            {title}
          </h2>
          <p className="text-xs" style={{ color: "var(--color-text-3, #9ca3af)" }}>
            {subtitle}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {skills.map((skill) => (
          <SkillRow key={skill.id} skill={skill} />
        ))}
      </div>
    </section>
  );
}

export default function AgentSkillsPage() {
  const apiSkills = AGENT_SKILLS.filter((s) => s.category === "api");
  const cliSkills = AGENT_SKILLS.filter((s) => s.category === "cli");

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: "var(--color-text, #111827)" }}>
          AgentSkills
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--color-text-2, #6b7280)" }}>
          SKILL.md manifests for AI agents — paste a URL into Claude, Cursor, Cline, or any agent to
          give it full knowledge of OmniRoute.
        </p>
      </div>

      {/* How to use */}
      <div
        className="rounded-lg border p-4"
        style={{
          borderColor: "var(--color-border, #e5e7eb)",
          background: "var(--color-surface-2, #f9fafb)",
        }}
      >
        <div className="mb-2 flex items-center gap-2">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 18, color: "var(--color-primary, #2563eb)" }}
          >
            info
          </span>
          <span className="text-sm font-semibold" style={{ color: "var(--color-text, #111827)" }}>
            How to use
          </span>
        </div>
        <ol className="space-y-1 text-xs" style={{ color: "var(--color-text-2, #6b7280)" }}>
          <li>
            1. Click <strong>Copy URL</strong> on the skill you want your agent to know about.
          </li>
          <li>
            2. In your AI agent (Claude, Cursor, Cline…), say:
            <br />
            <code
              className="mt-1 block rounded px-2 py-1 font-mono text-[11px]"
              style={{
                background: "var(--color-surface, #fff)",
                border: "1px solid var(--color-border, #e5e7eb)",
              }}
            >
              Use the skill at &lt;pasted-url&gt;
            </code>
          </li>
          <li>
            3. The agent fetches the SKILL.md and learns OmniRoute&apos;s API or CLI — no manual
            docs needed.
          </li>
        </ol>
        <a
          href={AGENT_SKILLS_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium"
          style={{ color: "var(--color-primary, #2563eb)" }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
            open_in_new
          </span>
          Browse all skills on GitHub
        </a>
      </div>

      {/* API Skills */}
      <SkillSection
        title="API Skills"
        subtitle={`${apiSkills.length} skills — control OmniRoute via REST / HTTP`}
        icon="api"
        skills={apiSkills}
      />

      {/* CLI Skills */}
      <SkillSection
        title="CLI Skills"
        subtitle={`${cliSkills.length} skills — control OmniRoute via the omniroute terminal binary`}
        icon="terminal"
        skills={cliSkills}
      />
    </div>
  );
}
