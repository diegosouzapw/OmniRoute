"use client";

import { useTranslations } from "next-intl";

/**
 * BudgetTab — Batch C
 *
 * Budget management for API keys — set daily/monthly limits,
 * view current spend, and monitor warning thresholds.
 * API: /api/usage/budget
 */

import { useState, useEffect, useCallback } from "react";
import { Card, Button, Input, EmptyState } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";

function ProgressBar({ value, max, warningAt = 0.8 }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const ratio = max > 0 ? value / max : 0;
  const color = ratio >= 1 ? "#ef4444" : ratio >= warningAt ? "#f59e0b" : "#22c55e";

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-text-muted">${value.toFixed(2)}</span>
        <span className="text-text-muted">${max.toFixed(2)}</span>
      </div>
      <div className="w-full h-2 rounded-full bg-surface/50 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function BudgetTab() {
  const t = useTranslations("usage");
  const [keys, setKeys] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    dailyLimitUsd: "",
    monthlyLimitUsd: "",
    warningThreshold: "80",
  });
  const notify = useNotificationStore();

  // Load API keys
  useEffect(() => {
    fetch("/api/keys")
      .then((r) => r.json())
      .then((data) => {
        const keyList = Array.isArray(data) ? data : data.keys || [];
        setKeys(keyList);
        if (keyList.length > 0) setSelectedKey(keyList[0].id);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Load budget for selected key
  const fetchBudget = useCallback(async () => {
    if (!selectedKey) return;
    try {
      const res = await fetch(`/api/usage/budget?apiKeyId=${selectedKey}`);
      if (res.ok) {
        const data = await res.json();
        setBudget(data);
        if (data.dailyLimitUsd)
          setForm((f) => ({ ...f, dailyLimitUsd: String(data.dailyLimitUsd) }));
        if (data.monthlyLimitUsd)
          setForm((f) => ({ ...f, monthlyLimitUsd: String(data.monthlyLimitUsd) }));
        if (data.warningThreshold)
          setForm((f) => ({ ...f, warningThreshold: String(data.warningThreshold) }));
      }
    } catch {
      // silent
    }
  }, [selectedKey]);

  useEffect(() => {
    fetchBudget();
  }, [fetchBudget]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/usage/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKeyId: selectedKey,
          dailyLimitUsd: form.dailyLimitUsd ? parseFloat(form.dailyLimitUsd) : null,
          monthlyLimitUsd: form.monthlyLimitUsd ? parseFloat(form.monthlyLimitUsd) : null,
          warningThreshold: parseInt(form.warningThreshold) || 80,
        }),
      });
      if (res.ok) {
        notify.success("Budget limits saved");
        await fetchBudget();
      } else {
        notify.error("Failed to save budget");
      }
    } catch {
      notify.error("Failed to save budget");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-text-muted p-8 animate-pulse">
        <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
        Loading budget data...
      </div>
    );
  }

  if (keys.length === 0) {
    return (
      <EmptyState
        icon="vpn_key"
        title="No API Keys"
        description="Add API keys first to set up budget limits."
      />
    );
  }

  const dailyLimit = budget?.dailyLimitUsd || parseFloat(form.dailyLimitUsd) || 0;
  const monthlyLimit = budget?.monthlyLimitUsd || parseFloat(form.monthlyLimitUsd) || 0;
  const dailyCost = budget?.totalCostToday || 0;
  const monthlyCost = budget?.totalCostMonth || 0;
  const warnPct = (parseInt(form.warningThreshold) || 80) / 100;

  return (
    <div className="flex flex-col gap-6">
      {/* Key Selector */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
            <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
          </div>
          <h3 className="text-lg font-semibold">{t("budgetManagement")}</h3>
        </div>

        <div className="mb-4">
          <label className="text-sm text-text-muted mb-1 block">{t("apiKey")}</label>
          <select
            value={selectedKey || ""}
            onChange={(e) => setSelectedKey(e.target.value)}
            className="w-full md:w-auto px-3 py-2 rounded-lg border border-border/50 bg-surface/30 text-text-main text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {keys.map((k) => (
              <option key={k.id} value={k.id}>
                {k.name || k.id} {k.provider ? `(${k.provider})` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Current Spend */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg border border-border/30 bg-surface/20">
            <p className="text-sm text-text-muted mb-2">Today&apos;s Spend</p>
            <p className="text-2xl font-bold text-text-main">${dailyCost.toFixed(2)}</p>
            {dailyLimit > 0 && (
              <ProgressBar value={dailyCost} max={dailyLimit} warningAt={warnPct} />
            )}
          </div>
          <div className="p-4 rounded-lg border border-border/30 bg-surface/20">
            <p className="text-sm text-text-muted mb-2">{t("thisMonth")}</p>
            <p className="text-2xl font-bold text-text-main">${monthlyCost.toFixed(2)}</p>
            {monthlyLimit > 0 && (
              <ProgressBar value={monthlyCost} max={monthlyLimit} warningAt={warnPct} />
            )}
          </div>
        </div>

        {/* Budget Form */}
        <div className="border-t border-border/30 pt-4">
          <p className="text-sm font-medium mb-3">{t("setLimits")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input
              label="Daily Limit (USD)"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g. 5.00"
              value={form.dailyLimitUsd}
              onChange={(e) => setForm({ ...form, dailyLimitUsd: e.target.value })}
            />
            <Input
              label="Monthly Limit (USD)"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g. 50.00"
              value={form.monthlyLimitUsd}
              onChange={(e) => setForm({ ...form, monthlyLimitUsd: e.target.value })}
            />
            <Input
              label="Warning Threshold (%)"
              type="number"
              min="1"
              max="100"
              placeholder="80"
              value={form.warningThreshold}
              onChange={(e) => setForm({ ...form, warningThreshold: e.target.value })}
            />
          </div>
          <Button variant="primary" onClick={handleSave} loading={saving}>
            Save Limits
          </Button>
        </div>
      </Card>

      {/* Budget Check Status */}
      {budget?.budgetCheck && (
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ color: budget.budgetCheck.allowed ? "#22c55e" : "#ef4444" }}
            >
              {budget.budgetCheck.allowed ? "check_circle" : "block"}
            </span>
            <span className="text-sm">
              {budget.budgetCheck.allowed
                ? `Budget OK — $${(budget.budgetCheck.remaining || 0).toFixed(2)} remaining`
                : "Budget exceeded — requests may be blocked"}
            </span>
          </div>
        </Card>
      )}
    </div>
  );
}
