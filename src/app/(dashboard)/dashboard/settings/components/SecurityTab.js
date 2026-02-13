"use client";

import { useState, useEffect } from "react";
import { Card, Button, Input, Toggle } from "@/shared/components";

export default function SecurityTab() {
  const [settings, setSettings] = useState({ requireLogin: false, hasPassword: false });
  const [loading, setLoading] = useState(true);
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [passStatus, setPassStatus] = useState({ type: "", message: "" });
  const [passLoading, setPassLoading] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateRequireLogin = async (requireLogin) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requireLogin }),
      });
      if (res.ok) {
        setSettings((prev) => ({ ...prev, requireLogin }));
      }
    } catch (err) {
      console.error("Failed to update require login:", err);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setPassStatus({ type: "error", message: "Passwords do not match" });
      return;
    }

    setPassLoading(true);
    setPassStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setPassStatus({ type: "success", message: "Password updated successfully" });
        setPasswords({ current: "", new: "", confirm: "" });
      } else {
        setPassStatus({ type: "error", message: data.error || "Failed to update password" });
      }
    } catch {
      setPassStatus({ type: "error", message: "An error occurred" });
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            shield
          </span>
        </div>
        <h3 className="text-lg font-semibold">Security</h3>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Require login</p>
            <p className="text-sm text-text-muted">
              When ON, dashboard requires password. When OFF, access without login.
            </p>
          </div>
          <Toggle
            checked={settings.requireLogin === true}
            onChange={() => updateRequireLogin(!settings.requireLogin)}
            disabled={loading}
          />
        </div>
        {settings.requireLogin === true && (
          <form
            onSubmit={handlePasswordChange}
            className="flex flex-col gap-4 pt-4 border-t border-border/50"
          >
            {settings.hasPassword && (
              <Input
                label="Current Password"
                type="password"
                placeholder="Enter current password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                required
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                required
              />
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                required
              />
            </div>

            {passStatus.message && (
              <p
                className={`text-sm ${passStatus.type === "error" ? "text-red-500" : "text-green-500"}`}
              >
                {passStatus.message}
              </p>
            )}

            <div className="pt-2">
              <Button type="submit" variant="primary" loading={passLoading}>
                {settings.hasPassword ? "Update Password" : "Set Password"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Card>
  );
}
