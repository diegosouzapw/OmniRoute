"use client";

import { useCallback, useEffect, useState } from "react";

type OmniSettings = {
  enabled: boolean;
  injectBudgetTokens: number;
  retrieveTimeoutMs: number;
  gitProbeEnabled: boolean;
  autoPublish: string;
};

type Project = {
  id: string;
  name: string;
  slug: string;
};

type Member = {
  projectId: string;
  apiKeyId: string;
  role: string;
};

type Artifact = {
  id: string;
  type: string;
  title: string;
  status: string;
  trustTier: string;
  updatedAt: string;
};

type Handoff = {
  id: string;
  goal: string;
  status: string;
  updatedAt: string;
};

type Tab = "projects" | "artifacts" | "handoffs" | "onboard";

async function apiJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers || {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body?.error?.message || body?.error || `Request failed (${res.status})`);
  }
  return body as T;
}

export default function OmniContextPage() {
  const [settings, setSettings] = useState<OmniSettings | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [members, setMembers] = useState<Member[]>([]);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [handoffs, setHandoffs] = useState<Handoff[]>([]);
  const [tab, setTab] = useState<Tab>("projects");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [memberKeyId, setMemberKeyId] = useState("");
  const [memberRole, setMemberRole] = useState("member");
  const [publishKeyId, setPublishKeyId] = useState("");
  const [artType, setArtType] = useState("summary");
  const [artTitle, setArtTitle] = useState("");
  const [artBody, setArtBody] = useState("");
  const [handoffGoal, setHandoffGoal] = useState("");
  const [handoffStatus, setHandoffStatus] = useState("");
  const [bootstrapCwd, setBootstrapCwd] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    setError(null);
    const [s, p] = await Promise.all([
      apiJson<OmniSettings>("/api/omnicontext/settings"),
      apiJson<{ projects: Project[] }>("/api/omnicontext/projects"),
    ]);
    setSettings(s);
    setProjects(p.projects);
  }, []);

  const refreshMembers = useCallback(async (projectId: string) => {
    if (!projectId) {
      setMembers([]);
      return;
    }
    const data = await apiJson<{ members: Member[] }>(
      `/api/omnicontext/projects/${projectId}/members`
    );
    setMembers(data.members);
  }, []);

  const refreshArtifacts = useCallback(async (projectId: string) => {
    if (!projectId) {
      setArtifacts([]);
      return;
    }
    const data = await apiJson<{ artifacts: Artifact[] }>(
      `/api/omnicontext/projects/${projectId}/artifacts`
    );
    setArtifacts(data.artifacts);
  }, []);

  const refreshHandoffs = useCallback(async (projectId: string) => {
    if (!projectId) {
      setHandoffs([]);
      return;
    }
    const data = await apiJson<{ handoffs: Handoff[] }>(
      `/api/omnicontext/projects/${projectId}/handoffs`
    );
    setHandoffs(data.handoffs);
  }, []);

  useEffect(() => {
    refresh().catch((err: Error) => setError(err.message));
  }, [refresh]);

  useEffect(() => {
    refreshMembers(selectedId).catch((err: Error) => setError(err.message));
    refreshArtifacts(selectedId).catch((err: Error) => setError(err.message));
    refreshHandoffs(selectedId).catch((err: Error) => setError(err.message));
  }, [selectedId, refreshMembers, refreshArtifacts, refreshHandoffs]);

  const toggleEnabled = async () => {
    if (!settings) return;
    setBusy(true);
    try {
      const next = await apiJson<OmniSettings>("/api/omnicontext/settings", {
        method: "PUT",
        body: JSON.stringify({ enabled: !settings.enabled }),
      });
      setSettings(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  const createProject = async () => {
    setBusy(true);
    try {
      await apiJson("/api/omnicontext/projects", {
        method: "POST",
        body: JSON.stringify({ name, slug }),
      });
      setName("");
      setSlug("");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  const addMember = async () => {
    if (!selectedId || !memberKeyId) return;
    setBusy(true);
    try {
      await apiJson(`/api/omnicontext/projects/${selectedId}/members`, {
        method: "POST",
        body: JSON.stringify({ apiKeyId: memberKeyId, role: memberRole }),
      });
      setMemberKeyId("");
      await refreshMembers(selectedId);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  const publishArtifact = async () => {
    if (!selectedId || !publishKeyId || !artTitle || !artBody) return;
    setBusy(true);
    try {
      await apiJson(`/api/omnicontext/projects/${selectedId}/artifacts`, {
        method: "POST",
        body: JSON.stringify({
          apiKeyId: publishKeyId,
          type: artType,
          title: artTitle,
          body: artBody,
        }),
      });
      setArtTitle("");
      setArtBody("");
      await refreshArtifacts(selectedId);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  const createHandoff = async () => {
    if (!selectedId || !publishKeyId || !handoffGoal) return;
    setBusy(true);
    try {
      await apiJson(`/api/omnicontext/projects/${selectedId}/handoffs`, {
        method: "POST",
        body: JSON.stringify({
          apiKeyId: publishKeyId,
          goal: handoffGoal,
          currentStatus: handoffStatus,
        }),
      });
      setHandoffGoal("");
      setHandoffStatus("");
      await refreshHandoffs(selectedId);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  const closeHandoff = async (handoffId: string) => {
    if (!selectedId) return;
    setBusy(true);
    try {
      await apiJson(`/api/omnicontext/projects/${selectedId}/handoffs`, {
        method: "PATCH",
        body: JSON.stringify({ handoffId, action: "close", apiKeyId: publishKeyId || undefined }),
      });
      await refreshHandoffs(selectedId);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  const runBootstrap = async () => {
    if (!selectedId || !publishKeyId || !bootstrapCwd) return;
    setBusy(true);
    try {
      await apiJson(`/api/omnicontext/projects/${selectedId}/bootstrap`, {
        method: "POST",
        body: JSON.stringify({ apiKeyId: publishKeyId, cwd: bootstrapCwd }),
      });
      await refreshArtifacts(selectedId);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: "projects", label: "Projects" },
    { id: "artifacts", label: "Artifacts" },
    { id: "handoffs", label: "Handoffs" },
    { id: "onboard", label: "Onboard" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-main">OmniContext</h1>
        <p className="text-sm text-text-muted mt-1">
          Team/project-scoped work context. Inject is off until enabled.
        </p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <section className="rounded-lg border border-border/60 bg-surface/40 p-4 space-y-3">
        <h2 className="text-sm font-medium text-text-main">Settings</h2>
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <span className="text-sm text-text-muted">OmniContext enabled</span>
          <button
            type="button"
            role="switch"
            aria-checked={settings?.enabled ?? false}
            disabled={!settings || busy}
            onClick={toggleEnabled}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              settings?.enabled ? "bg-emerald-500" : "bg-border"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                settings?.enabled ? "translate-x-5" : ""
              }`}
            />
          </button>
        </label>
        <p className="text-xs text-text-muted">
          Git probe default: off. Token budget: {settings?.injectBudgetTokens ?? "—"}
        </p>
      </section>

      <div className="flex flex-wrap gap-2 border-b border-border/50 pb-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 text-sm rounded-md ${
              tab === t.id ? "bg-bg text-text-main" : "text-text-muted hover:text-text-main"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "projects" ? (
        <>
          <section className="rounded-lg border border-border/60 bg-surface/40 p-4 space-y-4">
            <h2 className="text-sm font-medium text-text-main">Projects</h2>
            <div className="flex flex-wrap gap-2">
              <input
                className="rounded-md border border-border bg-bg px-3 py-2 text-sm"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="rounded-md border border-border bg-bg px-3 py-2 text-sm"
                placeholder="slug-kebab-case"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              <button
                type="button"
                disabled={busy || !name || !slug}
                onClick={createProject}
                className="rounded-md bg-text-main text-bg px-3 py-2 text-sm font-medium disabled:opacity-50"
              >
                Create
              </button>
            </div>
            <ul className="divide-y divide-border/50">
              {projects.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(p.id)}
                    className={`w-full text-left px-2 py-2 text-sm rounded-md ${
                      selectedId === p.id
                        ? "bg-bg text-text-main"
                        : "text-text-muted hover:text-text-main"
                    }`}
                  >
                    <span className="font-medium">{p.name}</span>
                    <span className="ml-2 text-xs opacity-70">{p.slug}</span>
                  </button>
                </li>
              ))}
              {projects.length === 0 ? (
                <li className="text-sm text-text-muted px-2 py-2">No projects yet.</li>
              ) : null}
            </ul>
          </section>

          {selectedId ? (
            <section className="rounded-lg border border-border/60 bg-surface/40 p-4 space-y-4">
              <h2 className="text-sm font-medium text-text-main">Members</h2>
              <div className="flex flex-wrap gap-2">
                <input
                  className="rounded-md border border-border bg-bg px-3 py-2 text-sm min-w-[16rem]"
                  placeholder="API key id"
                  value={memberKeyId}
                  onChange={(e) => setMemberKeyId(e.target.value)}
                />
                <select
                  className="rounded-md border border-border bg-bg px-3 py-2 text-sm"
                  value={memberRole}
                  onChange={(e) => setMemberRole(e.target.value)}
                >
                  <option value="member">member</option>
                  <option value="lead">lead</option>
                  <option value="admin">admin</option>
                </select>
                <button
                  type="button"
                  disabled={busy || !memberKeyId}
                  onClick={addMember}
                  className="rounded-md bg-text-main text-bg px-3 py-2 text-sm font-medium disabled:opacity-50"
                >
                  Add member
                </button>
              </div>
              <ul className="text-sm space-y-1">
                {members.map((m) => (
                  <li key={`${m.projectId}:${m.apiKeyId}`} className="text-text-muted">
                    <code className="text-text-main">{m.apiKeyId}</code> — {m.role}
                  </li>
                ))}
                {members.length === 0 ? (
                  <li className="text-text-muted">No members on this project.</li>
                ) : null}
              </ul>
            </section>
          ) : null}
        </>
      ) : null}

      {tab === "artifacts" ? (
        <section className="rounded-lg border border-border/60 bg-surface/40 p-4 space-y-4">
          <h2 className="text-sm font-medium text-text-main">Artifacts</h2>
          {!selectedId ? (
            <p className="text-sm text-text-muted">Select a project first.</p>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                <input
                  className="rounded-md border border-border bg-bg px-3 py-2 text-sm min-w-[12rem]"
                  placeholder="Publisher API key id"
                  value={publishKeyId}
                  onChange={(e) => setPublishKeyId(e.target.value)}
                />
                <select
                  className="rounded-md border border-border bg-bg px-3 py-2 text-sm"
                  value={artType}
                  onChange={(e) => setArtType(e.target.value)}
                >
                  <option value="summary">summary</option>
                  <option value="decision">decision</option>
                  <option value="blocker">blocker</option>
                  <option value="snippet">snippet</option>
                  <option value="stable_prefix">stable_prefix</option>
                </select>
                <input
                  className="rounded-md border border-border bg-bg px-3 py-2 text-sm min-w-[12rem]"
                  placeholder="Title"
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                />
              </div>
              <textarea
                className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm min-h-[6rem]"
                placeholder="Body (secrets redacted on publish)"
                value={artBody}
                onChange={(e) => setArtBody(e.target.value)}
              />
              <button
                type="button"
                disabled={busy || !publishKeyId || !artTitle || !artBody}
                onClick={publishArtifact}
                className="rounded-md bg-text-main text-bg px-3 py-2 text-sm font-medium disabled:opacity-50"
              >
                Publish
              </button>
              <ul className="text-sm space-y-2">
                {artifacts.map((a) => (
                  <li key={a.id} className="border-b border-border/40 pb-2 text-text-muted">
                    <span className="text-text-main font-medium">{a.title}</span>
                    <span className="ml-2 text-xs">
                      {a.type} · {a.status} · {a.trustTier}
                    </span>
                  </li>
                ))}
                {artifacts.length === 0 ? <li>No artifacts yet.</li> : null}
              </ul>
            </>
          )}
        </section>
      ) : null}

      {tab === "handoffs" ? (
        <section className="rounded-lg border border-border/60 bg-surface/40 p-4 space-y-4">
          <h2 className="text-sm font-medium text-text-main">Handoffs</h2>
          {!selectedId ? (
            <p className="text-sm text-text-muted">Select a project first.</p>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                <input
                  className="rounded-md border border-border bg-bg px-3 py-2 text-sm min-w-[12rem]"
                  placeholder="API key id"
                  value={publishKeyId}
                  onChange={(e) => setPublishKeyId(e.target.value)}
                />
                <input
                  className="rounded-md border border-border bg-bg px-3 py-2 text-sm min-w-[16rem]"
                  placeholder="Goal"
                  value={handoffGoal}
                  onChange={(e) => setHandoffGoal(e.target.value)}
                />
                <input
                  className="rounded-md border border-border bg-bg px-3 py-2 text-sm min-w-[12rem]"
                  placeholder="Current status"
                  value={handoffStatus}
                  onChange={(e) => setHandoffStatus(e.target.value)}
                />
                <button
                  type="button"
                  disabled={busy || !publishKeyId || !handoffGoal}
                  onClick={createHandoff}
                  className="rounded-md bg-text-main text-bg px-3 py-2 text-sm font-medium disabled:opacity-50"
                >
                  Create handoff
                </button>
              </div>
              <ul className="text-sm space-y-2">
                {handoffs.map((h) => (
                  <li
                    key={h.id}
                    className="flex items-center justify-between border-b border-border/40 pb-2"
                  >
                    <span className="text-text-muted">
                      <span className="text-text-main font-medium">{h.goal}</span>
                      <span className="ml-2 text-xs">{h.status}</span>
                    </span>
                    {h.status === "active" || h.status === "resumed" ? (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => closeHandoff(h.id)}
                        className="text-xs text-text-muted hover:text-text-main"
                      >
                        Close
                      </button>
                    ) : null}
                  </li>
                ))}
                {handoffs.length === 0 ? <li className="text-text-muted">No handoffs.</li> : null}
              </ul>
            </>
          )}
        </section>
      ) : null}

      {tab === "onboard" ? (
        <section className="rounded-lg border border-border/60 bg-surface/40 p-4 space-y-4">
          <h2 className="text-sm font-medium text-text-main">Bootstrap from docs</h2>
          <p className="text-sm text-text-muted">
            Reads AGENTS.md, CLAUDE.md, and README.md from a local directory into draft/summary
            artifacts.
          </p>
          {!selectedId ? (
            <p className="text-sm text-text-muted">Select a project first.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              <input
                className="rounded-md border border-border bg-bg px-3 py-2 text-sm min-w-[12rem]"
                placeholder="API key id"
                value={publishKeyId}
                onChange={(e) => setPublishKeyId(e.target.value)}
              />
              <input
                className="rounded-md border border-border bg-bg px-3 py-2 text-sm min-w-[20rem]"
                placeholder="/path/to/repo"
                value={bootstrapCwd}
                onChange={(e) => setBootstrapCwd(e.target.value)}
              />
              <button
                type="button"
                disabled={busy || !publishKeyId || !bootstrapCwd}
                onClick={runBootstrap}
                className="rounded-md bg-text-main text-bg px-3 py-2 text-sm font-medium disabled:opacity-50"
              >
                Bootstrap
              </button>
            </div>
          )}
        </section>
      ) : null}
    </div>
  );
}
