"use client";

import { useState, useEffect } from "react";
import Button from "@/shared/components/Button";

type Core = "singbox" | "xray";
type CoreState = {
  core: Core;
  state: string;
  entries: Array<{ id: string; name: string; port: number }>;
};
const inputClass =
  "w-full px-3 py-2.5 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary focus:outline-none focus:border-primary";

async function loadCoreMetadata(): Promise<CoreState[]> {
  const response = await fetch("/api/services/managed-proxy");
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error?.message || "Unable to load managed cores");
  return payload.cores || [];
}

export default function ManagedProxyTab() {
  const [cores, setCores] = useState<CoreState[]>([]);
  const [core, setCore] = useState<Core | "">("");
  const [name, setName] = useState("");
  const [sourceLink, setSourceLink] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function load() {
    setCores(await loadCoreMetadata());
  }
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/services/managed-proxy", { signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error?.message || "Unable to load managed cores");
        if (!controller.signal.aborted) setCores(payload.cores || []);
      })
      .catch((failure: Error) => {
        if (!controller.signal.aborted) setError(failure.message);
      });
    return () => controller.abort();
  }, []);
  async function operation(method: "POST" | "PATCH", body: unknown) {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/services/managed-proxy", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error?.message || "Managed core operation failed");
      if (method === "POST") setSourceLink("");
      await load();
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Managed core operation failed");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="flex flex-col gap-4 max-w-2xl">
      <h3 className="text-base font-medium text-text-primary">Managed proxy cores</h3>
      <p className="text-sm text-text-muted">
        Paste a tunnel link in the Custom proxy host field to save and assign it. Here you can also
        save a native outbound JSON definition without changing any assignment.
      </p>
      <ManagedCoreList cores={cores} busy={busy} operation={operation} />
      <ManagedSourceFields
        core={core}
        setCore={setCore}
        name={name}
        setName={setName}
        sourceLink={sourceLink}
        setSourceLink={setSourceLink}
      />
      <p className="text-xs text-text-muted">
        Save verifies the official core if needed and checks native configuration before activation.
        Sources require encryption. No preview installation, autostart or transparent-proxy changes.
      </p>
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
      <div>
        <Button
          size="sm"
          loading={busy}
          disabled={!core || !name.trim() || !sourceLink.trim()}
          onClick={() => operation("POST", { core, name, sourceLink })}
        >
          Save and activate
        </Button>
      </div>
    </section>
  );
}

function ManagedCoreList({
  cores,
  busy,
  operation,
}: {
  cores: CoreState[];
  busy: boolean;
  operation: (method: "POST" | "PATCH", body: unknown) => Promise<void>;
}) {
  return (
    <>
      {cores.map((item) => (
        <div key={item.core} className="flex flex-col gap-2 border-b border-border pb-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-text-primary">
              {item.core === "singbox" ? "sing-box" : "Xray"}: {item.state}
            </span>
            <Button
              size="sm"
              variant="secondary"
              disabled={busy || !item.entries.length}
              onClick={() =>
                operation("PATCH", {
                  core: item.core,
                  action: item.state === "running" ? "stop" : "start",
                })
              }
            >
              {item.state === "running" ? "Stop" : "Start"}
            </Button>
          </div>
          {item.entries.map((entry) => (
            <p key={entry.id} className="text-xs text-text-muted">
              {entry.name} — socks5://127.0.0.1:{entry.port}
            </p>
          ))}
        </div>
      ))}
    </>
  );
}

function ManagedSourceFields({
  core,
  setCore,
  name,
  setName,
  sourceLink,
  setSourceLink,
}: {
  core: Core | "";
  setCore: (v: Core | "") => void;
  name: string;
  setName: (v: string) => void;
  sourceLink: string;
  setSourceLink: (v: string) => void;
}) {
  return (
    <>
      <div>
        <label htmlFor="managed-core-choice" className="text-xs text-text-muted block mb-1.5">
          Core
        </label>
        <select
          id="managed-core-choice"
          value={core}
          onChange={(e) => setCore(e.target.value as Core | "")}
          className={inputClass}
        >
          <option value="">Select a core</option>
          <option value="singbox">sing-box</option>
          <option value="xray">Xray</option>
        </select>
      </div>
      <div>
        <label htmlFor="managed-proxy-name" className="text-xs text-text-muted block mb-1.5">
          Name
        </label>
        <input
          id="managed-proxy-name"
          maxLength={120}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="managed-proxy-source" className="text-xs text-text-muted block mb-1.5">
          Source link or native outbound JSON
        </label>
        <textarea
          id="managed-proxy-source"
          rows={4}
          autoComplete="off"
          spellCheck={false}
          value={sourceLink}
          onChange={(e) => setSourceLink(e.target.value)}
          className={inputClass}
        />
      </div>
    </>
  );
}
