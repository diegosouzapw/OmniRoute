"use client";

import { useState, useEffect } from "react";
import { Card, Button } from "@/shared/components";

export default function OmniRouteUpdater() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const loadStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/system/version");
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch (err) {
      console.error("Failed to load OmniRoute status:", err);
    } finally {
      setLoading(false);
    }
  };

  const checkUpdate = async () => {
    setCheckingUpdate(true);
    setMessage("Checking for updates...");

    try {
      const res = await fetch("/api/openclaw/omniroute/check-update");
      const data = await res.json();

      if (data.updateAvailable) {
        setMessage(`Update available: ${data.current} → ${data.latest}`);
      } else {
        setMessage("Already on latest version");
      }
    } catch (err) {
      setMessage("Error checking update: " + err.message);
    } finally {
      setCheckingUpdate(false);
    }
  };

  const performUpdate = async () => {
    if (!confirm("Update OmniRoute to latest version? This may take a few minutes.")) return;

    setUpdating(true);
    setMessage("Updating OmniRoute... This may take a few minutes.");

    try {
      const res = await fetch("/api/openclaw/omniroute/update", {
        method: "POST",
      });

      const data = await res.json();
      setMessage(data.message || "Update complete!");
      loadStatus();
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-xl text-blue-500">cloud_sync</span>
          <h2 className="text-lg font-bold">OmniRoute Updater</h2>
        </div>
        <p className="text-text-muted">Loading...</p>
      </Card>
    );
  }

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-xl text-blue-500">cloud_sync</span>
          <h2 className="text-lg font-bold">OmniRoute Updater</h2>
        </div>

        <div className="mb-4">
          <p className="text-sm text-text-muted">
            Check and install OmniRoute updates from GitHub source
          </p>
        </div>

        {status && (
          <>
            <div className="flex items-center justify-between mb-4 p-3 bg-black/5 dark:bg-white/5 rounded-lg">
              <div>
                <p className="text-sm text-text-muted">Current Version</p>
                <p className="text-lg font-semibold">{status.current}</p>
                {status.latest && status.current !== status.latest && (
                  <p className="text-xs text-emerald-400 mt-1">Latest: {status.latest}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={status.current !== status.latest ? "primary" : "secondary"}
                  icon="update"
                  onClick={checkUpdate}
                  disabled={checkingUpdate}
                >
                  {checkingUpdate ? "Checking..." : "Check Update"}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  icon="refresh"
                  onClick={loadStatus}
                  disabled={updating}
                >
                  Refresh
                </Button>
              </div>
            </div>

            {status.current !== status.latest && (
              <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <p className="text-sm text-emerald-400">
                  Update available: {status.current} → {status.latest}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              {status.current !== status.latest && (
                <Button
                  variant="primary"
                  icon="upgrade"
                  onClick={performUpdate}
                  disabled={updating}
                >
                  {updating ? "Updating..." : `Update to ${status.latest}`}
                </Button>
              )}
            </div>

            {message && <p className="mt-3 text-sm text-text-muted">{message}</p>}
          </>
        )}
      </div>
    </Card>
  );
}
