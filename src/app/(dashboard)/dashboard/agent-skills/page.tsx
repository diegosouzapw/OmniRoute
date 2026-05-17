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
      className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-colors ${
        isCopied
          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
          : "bg-bg-subtle text-text-muted hover:text-text-main"
      }`}
      title="Copy raw URL to clipboard"
    >
      <span className="material-symbols-outlined text-[14px]">
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
    <div className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-bg-subtle">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg-subtle">
        <span className="material-symbols-outlined text-[18px] text-text-muted">{skill.icon}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-semibold text-text-main">{skill.name}</span>
          {skill.isEntry && (
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
              Start Here
            </span>
          )}
          {skill.isNew && (
            <span className="rounded-full bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">
              New
            </span>
          )}
          {skill.endpoint && (
            <code className="rounded bg-bg-subtle px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
              {skill.endpoint}
            </code>
          )}
        </div>
        <p className="text-xs leading-relaxed text-text-muted">{skill.description}</p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <a
          href={blobUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-text-muted transition-colors hover:bg-bg-subtle hover:text-text-main"
          title="View on GitHub"
        >
          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
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
    <section className="space-y-3 rounded-xl border border-border bg-bg p-4">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[20px] text-text-muted">{icon}</span>
        <div>
          <h2 className="text-sm font-semibold text-text-main">{title}</h2>
          <p className="text-xs text-text-muted">{subtitle}</p>
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
    <div className="space-y-6">
      {/* How to use — full width */}
      <div className="rounded-xl border border-border bg-bg-subtle/50 p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-primary">info</span>
          <span className="text-sm font-semibold text-text-main">How to use</span>
        </div>
        <ol className="space-y-1 text-xs text-text-muted">
          <li>
            1. Click <strong className="text-text-main">Copy URL</strong> on the skill you want your
            agent to know about.
          </li>
          <li>
            2. In your AI agent (Claude, Cursor, Cline…), say:
            <br />
            <code className="mt-1 block rounded border border-border bg-bg px-2 py-1 font-mono text-[11px]">
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
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          Browse all skills on GitHub
        </a>
      </div>

      {/* Two-column grid: API Skills | CLI Skills */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SkillSection
          title="API Skills"
          subtitle={`${apiSkills.length} skills — control OmniRoute via REST / HTTP`}
          icon="api"
          skills={apiSkills}
        />
        <SkillSection
          title="CLI Skills"
          subtitle={`${cliSkills.length} skills — control OmniRoute via the omniroute terminal binary`}
          icon="terminal"
          skills={cliSkills}
        />
      </div>
    </div>
  );
}
