"use client";

import { useState, useEffect } from "react";
import { Card, Button } from "@/shared/components";

export default function CLIProxyAPIManager() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loadStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/openclaw/cliproxyapi");
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch (err) {
      console.error("Failed to load CLIProxyAPI status:", err);
    } finally {
      setLoading(false);
    }
  };

  const switchVersion = async (version: string) => {
    if (!confirm(`Switch to ${version}?`)) return;

    setActionLoading(true);
    setMessage(`Switching to ${version}...`);

    try {
      const res = await fetch("/api/openclaw/cliproxyapi/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ version }),
      });

      const data = await res.json();
      setMessage(data.message || "Done");
      loadStatus();
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const updateToLatest = async () => {
    if (!confirm("Update to latest version?")) return;

    setActionLoading(true);
    setMessage("Updating...");

    try {
      const res = await fetch("/api/openclaw/cliproxyapi/update", {
        method: "POST",
      });

      const data = await res.json();
      setMessage(data.message || "Done");
      loadStatus();
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
    const interval = setInterval(loadStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-xl text-purple-500">swap_horiz</span>
          <h2 className="text-lg font-bold">CLIProxyAPI Manager</h2>
        </div>
        <p className="text-text-muted">Loading...</p>
      </Card>
    );
  }

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-xl text-purple-500">swap_horiz</span>
          <h2 className="text-lg font-bold">CLIProxyAPI Manager</h2>
        </div>

        <div className="mb-4">
          <p className="text-sm text-text-muted">
            OAuth proxy for Antigravity and Claude providers
          </p>
        </div>

        {status && (
          <>
            <div className="flex items-center justify-between mb-4 p-3 bg-black/5 dark:bg-white/5 rounded-lg">
              <div>
                <p className="text-sm text-text-muted">Current Version</p>
                <p className="text-lg font-semibold">{status.current}</p>
              </div>
              <Button
                size="sm"
                variant="secondary"
                icon="refresh"
                onClick={loadStatus}
                disabled={actionLoading}
              >
                Refresh
              </Button>
            </div>

            {status.availableVersions?.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Available Versions:</p>
                <div className="flex flex-wrap gap-2">
                  {status.availableVersions.map((v) => (
                    <button
                      key={v}
                      onClick={() => switchVersion(v)}
                      disabled={actionLoading || v === status.current}
                      className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                        v === status.current
                          ? "bg-purple-600 text-white"
                          : "bg-black/5 dark:bg-white/5 hover:bg-purple-600/20 text-text-main"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="primary"
                icon="upgrade"
                onClick={updateToLatest}
                disabled={actionLoading}
              >
                Update to Latest
              </Button>
            </div>

            {message && <p className="mt-3 text-sm text-text-muted">{message}</p>}
          </>
        )}
      </div>
    </Card>
  );
}
