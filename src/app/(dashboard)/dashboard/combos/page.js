"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Card,
  Button,
  Modal,
  Input,
  CardSkeleton,
  ModelSelectModal,
  ProxyConfigModal,
  EmptyState,
} from "@/shared/components";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";

// Validate combo name: letters, numbers, -, _, /, .
const VALID_NAME_REGEX = /^[a-zA-Z0-9_/.-]+$/;

// ─────────────────────────────────────────────
// Helper: normalize model entry (legacy string ↔ new object)
// ─────────────────────────────────────────────
function normalizeModelEntry(entry) {
  if (typeof entry === "string") return { model: entry, weight: 0 };
  return { model: entry.model, weight: entry.weight || 0 };
}

function getModelString(entry) {
  return typeof entry === "string" ? entry : entry.model;
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function CombosPage() {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCombo, setEditingCombo] = useState(null);
  const [activeProviders, setActiveProviders] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [testResults, setTestResults] = useState(null);
  const [testingCombo, setTestingCombo] = useState(null);
  const { copied, copy } = useCopyToClipboard();
  const [proxyTargetCombo, setProxyTargetCombo] = useState(null);
  const [proxyConfig, setProxyConfig] = useState(null);

  useEffect(() => {
    fetchData();
    fetch("/api/settings/proxy")
      .then((r) => (r.ok ? r.json() : null))
      .then((c) => setProxyConfig(c))
      .catch(() => {});
  }, []);

  const fetchData = async () => {
    try {
      const [combosRes, providersRes, metricsRes] = await Promise.all([
        fetch("/api/combos"),
        fetch("/api/providers"),
        fetch("/api/combos/metrics"),
      ]);
      const combosData = await combosRes.json();
      const providersData = await providersRes.json();
      const metricsData = await metricsRes.json();

      if (combosRes.ok) setCombos(combosData.combos || []);
      if (providersRes.ok) {
        const active = (providersData.connections || []).filter(
          (c) => c.testStatus === "active" || c.testStatus === "success"
        );
        setActiveProviders(active);
      }
      if (metricsRes.ok) setMetrics(metricsData.metrics || {});
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      const res = await fetch("/api/combos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        await fetchData();
        setShowCreateModal(false);
      } else {
        const err = await res.json();
        alert(err.error?.message || err.error || "Failed to create combo");
      }
    } catch (error) {
      console.log("Error creating combo:", error);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await fetch(`/api/combos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        await fetchData();
        setEditingCombo(null);
      } else {
        const err = await res.json();
        alert(err.error?.message || err.error || "Failed to update combo");
      }
    } catch (error) {
      console.log("Error updating combo:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this combo?")) return;
    try {
      const res = await fetch(`/api/combos/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCombos(combos.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.log("Error deleting combo:", error);
    }
  };

  const handleDuplicate = async (combo) => {
    const baseName = combo.name.replace(/-copy(-\d+)?$/, "");
    const existingNames = combos.map((c) => c.name);
    let newName = `${baseName}-copy`;
    let counter = 1;
    while (existingNames.includes(newName)) {
      counter++;
      newName = `${baseName}-copy-${counter}`;
    }

    const data = {
      name: newName,
      models: combo.models,
      strategy: combo.strategy || "priority",
      config: combo.config || {},
    };

    await handleCreate(data);
  };

  const handleTestCombo = async (combo) => {
    setTestingCombo(combo.name);
    setTestResults(null);
    try {
      const res = await fetch("/api/combos/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comboName: combo.name }),
      });
      const data = await res.json();
      setTestResults(data);
    } catch (error) {
      setTestResults({ error: "Test request failed" });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Combos</h1>
          <p className="text-sm text-text-muted mt-1">
            Create model combos with weighted routing and fallback support
          </p>
        </div>
        <Button icon="add" onClick={() => setShowCreateModal(true)}>
          Create Combo
        </Button>
      </div>

      {/* Combos List */}
      {combos.length === 0 ? (
        <EmptyState
          icon="🧩"
          title="No combos yet"
          description="Create model combos with weighted routing and fallback support"
          actionLabel="Create Combo"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {combos.map((combo) => (
            <ComboCard
              key={combo.id}
              combo={combo}
              metrics={metrics[combo.name]}
              copied={copied}
              onCopy={copy}
              onEdit={() => setEditingCombo(combo)}
              onDelete={() => handleDelete(combo.id)}
              onDuplicate={() => handleDuplicate(combo)}
              onTest={() => handleTestCombo(combo)}
              testing={testingCombo === combo.name}
              onProxy={() => setProxyTargetCombo(combo)}
              hasProxy={!!proxyConfig?.combos?.[combo.id]}
            />
          ))}
        </div>
      )}

      {/* Test Results Modal */}
      {testResults && (
        <Modal
          isOpen={!!testResults}
          onClose={() => {
            setTestResults(null);
            setTestingCombo(null);
          }}
          title={`Test Results — ${testingCombo}`}
        >
          <TestResultsView results={testResults} />
        </Modal>
      )}

      {/* Create Modal */}
      <ComboFormModal
        key="create"
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreate}
        activeProviders={activeProviders}
      />

      {/* Edit Modal */}
      <ComboFormModal
        key={editingCombo?.id || "new"}
        isOpen={!!editingCombo}
        combo={editingCombo}
        onClose={() => setEditingCombo(null)}
        onSave={(data) => handleUpdate(editingCombo.id, data)}
        activeProviders={activeProviders}
      />

      {/* Proxy Config Modal */}
      {proxyTargetCombo && (
        <ProxyConfigModal
          isOpen={!!proxyTargetCombo}
          onClose={() => setProxyTargetCombo(null)}
          level="combo"
          levelId={proxyTargetCombo.id}
          levelLabel={proxyTargetCombo.name}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Combo Card
// ─────────────────────────────────────────────
function ComboCard({
  combo,
  metrics,
  copied,
  onCopy,
  onEdit,
  onDelete,
  onDuplicate,
  onTest,
  testing,
  onProxy,
  hasProxy,
}) {
  const strategy = combo.strategy || "priority";
  const models = combo.models || [];

  return (
    <Card padding="sm" className="group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Icon */}
          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[18px]">layers</span>
          </div>
          <div className="min-w-0 flex-1">
            {/* Name + Strategy Badge + Copy */}
            <div className="flex items-center gap-2">
              <code className="text-sm font-medium font-mono truncate">{combo.name}</code>
              <span
                className={`text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded-full ${
                  strategy === "weighted"
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                    : strategy === "round-robin"
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                      : "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                }`}
              >
                {strategy}
              </span>
              {hasProxy && (
                <span
                  className="text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary flex items-center gap-0.5"
                  title="Proxy configured"
                >
                  <span className="material-symbols-outlined text-[11px]">vpn_lock</span>
                  proxy
                </span>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy(combo.name, `combo-${combo.id}`);
                }}
                className="p-0.5 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                title="Copy combo name"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copied === `combo-${combo.id}` ? "check" : "content_copy"}
                </span>
              </button>
            </div>

            {/* Model tags with weights */}
            <div className="flex items-center gap-1 mt-0.5 flex-wrap">
              {models.length === 0 ? (
                <span className="text-xs text-text-muted italic">No models</span>
              ) : (
                models.slice(0, 3).map((entry, index) => {
                  const { model, weight } = normalizeModelEntry(entry);
                  return (
                    <code
                      key={index}
                      className="text-[10px] font-mono bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded text-text-muted"
                    >
                      {model}
                      {strategy === "weighted" && weight > 0 ? ` (${weight}%)` : ""}
                    </code>
                  );
                })
              )}
              {models.length > 3 && (
                <span className="text-[10px] text-text-muted">+{models.length - 3} more</span>
              )}
            </div>

            {/* Metrics row */}
            {metrics && (
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] text-text-muted">
                  <span className="text-emerald-500">{metrics.totalSuccesses}</span>/
                  {metrics.totalRequests} reqs
                </span>
                <span className="text-[10px] text-text-muted">{metrics.successRate}% success</span>
                <span className="text-[10px] text-text-muted">~{metrics.avgLatencyMs}ms</span>
                {metrics.fallbackRate > 0 && (
                  <span className="text-[10px] text-amber-500">
                    {metrics.fallbackRate}% fallback
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            onClick={onTest}
            disabled={testing}
            className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-emerald-500 transition-colors"
            title="Test combo"
          >
            <span
              className={`material-symbols-outlined text-[16px] ${testing ? "animate-spin" : ""}`}
            >
              {testing ? "progress_activity" : "play_arrow"}
            </span>
          </button>
          <button
            onClick={onDuplicate}
            className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-primary transition-colors"
            title="Duplicate"
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
          </button>
          <button
            onClick={onProxy}
            className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-primary transition-colors"
            title="Proxy configuration"
          >
            <span className="material-symbols-outlined text-[16px]">vpn_lock</span>
          </button>
          <button
            onClick={onEdit}
            className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-primary transition-colors"
            title="Edit"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 hover:bg-red-500/10 rounded text-red-500 transition-colors"
            title="Delete"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
          </button>
        </div>
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────
// Test Results View
// ─────────────────────────────────────────────
function TestResultsView({ results }) {
  if (results.error) {
    return (
      <div className="flex items-center gap-2 text-red-500 text-sm">
        <span className="material-symbols-outlined text-[18px]">error</span>
        {typeof results.error === "string" ? results.error : JSON.stringify(results.error)}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {results.resolvedBy && (
        <div className="flex items-center gap-2 text-sm">
          <span className="material-symbols-outlined text-emerald-500 text-[18px]">
            check_circle
          </span>
          <span>
            Resolved by:{" "}
            <code className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded">
              {results.resolvedBy}
            </code>
          </span>
        </div>
      )}
      {results.results?.map((r, i) => (
        <div
          key={i}
          className="flex items-center gap-2 text-xs px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.02]"
        >
          <span
            className={`material-symbols-outlined text-[14px] ${
              r.status === "ok"
                ? "text-emerald-500"
                : r.status === "skipped"
                  ? "text-text-muted"
                  : "text-red-500"
            }`}
          >
            {r.status === "ok" ? "check_circle" : r.status === "skipped" ? "skip_next" : "error"}
          </span>
          <code className="font-mono flex-1">{r.model}</code>
          {r.latencyMs !== undefined && <span className="text-text-muted">{r.latencyMs}ms</span>}
          <span
            className={`text-[10px] uppercase font-medium ${
              r.status === "ok"
                ? "text-emerald-500"
                : r.status === "skipped"
                  ? "text-text-muted"
                  : "text-red-500"
            }`}
          >
            {r.status}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Combo Form Modal
// ─────────────────────────────────────────────
function ComboFormModal({ isOpen, combo, onClose, onSave, activeProviders }) {
  const [name, setName] = useState(combo?.name || "");
  const [models, setModels] = useState(() => {
    return (combo?.models || []).map((m) => normalizeModelEntry(m));
  });
  const [strategy, setStrategy] = useState(combo?.strategy || "priority");
  const [showModelSelect, setShowModelSelect] = useState(false);
  const [saving, setSaving] = useState(false);
  const [nameError, setNameError] = useState("");
  const [modelAliases, setModelAliases] = useState({});
  const [providerNodes, setProviderNodes] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [config, setConfig] = useState(combo?.config || {});

  // DnD state
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const fetchModalData = async () => {
    try {
      const [aliasesRes, nodesRes] = await Promise.all([
        fetch("/api/models/alias"),
        fetch("/api/provider-nodes"),
      ]);

      if (!aliasesRes.ok || !nodesRes.ok) {
        throw new Error(
          `Failed to fetch data: aliases=${aliasesRes.status}, nodes=${nodesRes.status}`
        );
      }

      const [aliasesData, nodesData] = await Promise.all([aliasesRes.json(), nodesRes.json()]);
      setModelAliases(aliasesData.aliases || {});
      setProviderNodes(nodesData.nodes || []);
    } catch (error) {
      console.error("Error fetching modal data:", error);
    }
  };

  useEffect(() => {
    if (isOpen) fetchModalData();
  }, [isOpen]);

  const validateName = (value) => {
    if (!value.trim()) {
      setNameError("Name is required");
      return false;
    }
    if (!VALID_NAME_REGEX.test(value)) {
      setNameError("Only letters, numbers, -, _, / and . allowed");
      return false;
    }
    setNameError("");
    return true;
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value) validateName(value);
    else setNameError("");
  };

  const handleAddModel = (model) => {
    if (!models.find((m) => m.model === model.value)) {
      setModels([...models, { model: model.value, weight: 0 }]);
    }
  };

  const handleRemoveModel = (index) => {
    setModels(models.filter((_, i) => i !== index));
  };

  const handleWeightChange = (index, weight) => {
    const newModels = [...models];
    newModels[index] = {
      ...newModels[index],
      weight: Math.max(0, Math.min(100, Number(weight) || 0)),
    };
    setModels(newModels);
  };

  const handleAutoBalance = () => {
    const count = models.length;
    if (count === 0) return;
    const weight = Math.floor(100 / count);
    const remainder = 100 - weight * count;
    setModels(
      models.map((m, i) => ({
        ...m,
        weight: weight + (i === 0 ? remainder : 0),
      }))
    );
  };

  // Format model display name with readable provider name
  const formatModelDisplay = useCallback(
    (modelValue) => {
      const parts = modelValue.split("/");
      if (parts.length !== 2) return modelValue;

      const [providerId, modelId] = parts;
      const matchedNode = providerNodes.find((node) => node.id === providerId);

      if (matchedNode) {
        return `${matchedNode.name}/${modelId}`;
      }

      return modelValue;
    },
    [providerNodes]
  );

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newModels = [...models];
    [newModels[index - 1], newModels[index]] = [newModels[index], newModels[index - 1]];
    setModels(newModels);
  };

  const handleMoveDown = (index) => {
    if (index === models.length - 1) return;
    const newModels = [...models];
    [newModels[index], newModels[index + 1]] = [newModels[index + 1], newModels[index]];
    setModels(newModels);
  };

  // Drag and Drop handlers
  const handleDragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
    // Make drag image slightly transparent
    if (e.target) {
      setTimeout(() => (e.target.style.opacity = "0.5"), 0);
    }
  };

  const handleDragEnd = (e) => {
    if (e.target) e.target.style.opacity = "1";
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const fromIndex = dragIndex;
    if (fromIndex === null || fromIndex === dropIndex) return;

    const newModels = [...models];
    const [moved] = newModels.splice(fromIndex, 1);
    newModels.splice(dropIndex, 0, moved);
    setModels(newModels);
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleSave = async () => {
    if (!validateName(name)) return;
    setSaving(true);

    const saveData = {
      name: name.trim(),
      models: strategy === "weighted" ? models : models.map((m) => m.model),
      strategy,
    };

    // Include config only if any values are set
    const configToSave = { ...config };
    // Add round-robin specific fields to config
    if (strategy === "round-robin") {
      if (config.concurrencyPerModel !== undefined)
        configToSave.concurrencyPerModel = config.concurrencyPerModel;
      if (config.queueTimeoutMs !== undefined) configToSave.queueTimeoutMs = config.queueTimeoutMs;
    }
    if (Object.keys(configToSave).length > 0) {
      saveData.config = configToSave;
    }

    await onSave(saveData);
    setSaving(false);
  };

  const isEdit = !!combo;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? "Edit Combo" : "Create Combo"}>
        <div className="flex flex-col gap-3">
          {/* Name */}
          <div>
            <Input
              label="Combo Name"
              value={name}
              onChange={handleNameChange}
              placeholder="my-combo"
              error={nameError}
            />
            <p className="text-[10px] text-text-muted mt-0.5">
              Letters, numbers, -, _, / and . allowed
            </p>
          </div>

          {/* Strategy Toggle */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Routing Strategy</label>
            <div className="flex gap-1 p-0.5 bg-black/5 dark:bg-white/5 rounded-lg">
              <button
                onClick={() => setStrategy("priority")}
                className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all ${
                  strategy === "priority"
                    ? "bg-white dark:bg-bg-main shadow-sm text-primary"
                    : "text-text-muted hover:text-text-main"
                }`}
              >
                <span className="material-symbols-outlined text-[14px] align-middle mr-1">
                  sort
                </span>
                Priority
              </button>
              <button
                onClick={() => setStrategy("weighted")}
                className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all ${
                  strategy === "weighted"
                    ? "bg-white dark:bg-bg-main shadow-sm text-primary"
                    : "text-text-muted hover:text-text-main"
                }`}
              >
                <span className="material-symbols-outlined text-[14px] align-middle mr-1">
                  percent
                </span>
                Weighted
              </button>
              <button
                onClick={() => setStrategy("round-robin")}
                className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all ${
                  strategy === "round-robin"
                    ? "bg-white dark:bg-bg-main shadow-sm text-primary"
                    : "text-text-muted hover:text-text-main"
                }`}
              >
                <span className="material-symbols-outlined text-[14px] align-middle mr-1">
                  autorenew
                </span>
                Round-Robin
              </button>
            </div>
            <p className="text-[10px] text-text-muted mt-0.5">
              {strategy === "priority"
                ? "Sequential fallback: tries model 1 first, then 2, etc."
                : strategy === "weighted"
                  ? "Distributes traffic by weight percentage with fallback"
                  : "Circular distribution: each request goes to the next model in rotation"}
            </p>
          </div>

          {/* Models */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium">Models</label>
              {strategy === "weighted" && models.length > 1 && (
                <button
                  onClick={handleAutoBalance}
                  className="text-[10px] text-primary hover:text-primary/80 transition-colors"
                >
                  Auto-balance
                </button>
              )}
            </div>

            {models.length === 0 ? (
              <div className="text-center py-4 border border-dashed border-black/10 dark:border-white/10 rounded-lg bg-black/[0.01] dark:bg-white/[0.01]">
                <span className="material-symbols-outlined text-text-muted text-xl mb-1">
                  layers
                </span>
                <p className="text-xs text-text-muted">No models added yet</p>
              </div>
            ) : (
              <div className="flex flex-col gap-1 max-h-[240px] overflow-y-auto">
                {models.map((entry, index) => (
                  <div
                    key={`${entry.model}-${index}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`group/item flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-all cursor-grab active:cursor-grabbing ${
                      dragOverIndex === index && dragIndex !== index
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] border border-transparent"
                    } ${dragIndex === index ? "opacity-50" : ""}`}
                  >
                    {/* Drag handle */}
                    <span className="material-symbols-outlined text-[14px] text-text-muted/40 cursor-grab shrink-0">
                      drag_indicator
                    </span>

                    {/* Index badge */}
                    <span className="text-[10px] font-medium text-text-muted w-3 text-center shrink-0">
                      {index + 1}
                    </span>

                    {/* Model display */}
                    <div className="flex-1 min-w-0 px-1 text-xs text-text-main truncate">
                      {formatModelDisplay(entry.model)}
                    </div>

                    {/* Weight input (weighted mode only) */}
                    {strategy === "weighted" && (
                      <div className="flex items-center gap-0.5 shrink-0">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={entry.weight}
                          onChange={(e) => handleWeightChange(index, e.target.value)}
                          className="w-10 text-[11px] text-center py-0.5 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none"
                        />
                        <span className="text-[10px] text-text-muted">%</span>
                      </div>
                    )}

                    {/* Priority arrows (priority mode) */}
                    {strategy === "priority" && (
                      <div className="flex items-center gap-0.5">
                        <button
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0}
                          className={`p-0.5 rounded ${index === 0 ? "text-text-muted/20 cursor-not-allowed" : "text-text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5"}`}
                          title="Move up"
                        >
                          <span className="material-symbols-outlined text-[12px]">
                            arrow_upward
                          </span>
                        </button>
                        <button
                          onClick={() => handleMoveDown(index)}
                          disabled={index === models.length - 1}
                          className={`p-0.5 rounded ${index === models.length - 1 ? "text-text-muted/20 cursor-not-allowed" : "text-text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5"}`}
                          title="Move down"
                        >
                          <span className="material-symbols-outlined text-[12px]">
                            arrow_downward
                          </span>
                        </button>
                      </div>
                    )}

                    {/* Remove */}
                    <button
                      onClick={() => handleRemoveModel(index)}
                      className="p-0.5 hover:bg-red-500/10 rounded text-text-muted hover:text-red-500 transition-all"
                      title="Remove"
                    >
                      <span className="material-symbols-outlined text-[12px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Weight total indicator */}
            {strategy === "weighted" && models.length > 0 && <WeightTotalBar models={models} />}

            {/* Add Model button */}
            <button
              onClick={() => setShowModelSelect(true)}
              className="w-full mt-2 py-2 border border-dashed border-black/10 dark:border-white/10 rounded-lg text-xs text-text-muted hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Add Model
            </button>
          </div>

          {/* Advanced Config Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1 text-xs text-text-muted hover:text-text-main transition-colors self-start"
          >
            <span className="material-symbols-outlined text-[14px]">
              {showAdvanced ? "expand_less" : "expand_more"}
            </span>
            Advanced Settings
          </button>

          {showAdvanced && (
            <div className="flex flex-col gap-2 p-3 bg-black/[0.02] dark:bg-white/[0.02] rounded-lg border border-black/5 dark:border-white/5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-text-muted mb-0.5 block">Max Retries</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={config.maxRetries ?? ""}
                    placeholder="1"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        maxRetries: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-text-muted mb-0.5 block">
                    Retry Delay (ms)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="60000"
                    step="500"
                    value={config.retryDelayMs ?? ""}
                    placeholder="2000"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        retryDelayMs: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-text-muted mb-0.5 block">Timeout (ms)</label>
                  <input
                    type="number"
                    min="1000"
                    max="600000"
                    step="1000"
                    value={config.timeoutMs ?? ""}
                    placeholder="120000"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        timeoutMs: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-[10px] text-text-muted">Healthcheck</label>
                  <input
                    type="checkbox"
                    checked={config.healthCheckEnabled !== false}
                    onChange={(e) => setConfig({ ...config, healthCheckEnabled: e.target.checked })}
                    className="accent-primary"
                  />
                </div>
              </div>
              {strategy === "round-robin" && (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                  <div>
                    <label className="text-[10px] text-text-muted mb-0.5 block">
                      Concurrency / Model
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={config.concurrencyPerModel ?? ""}
                      placeholder="3"
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          concurrencyPerModel: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      className="w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-text-muted mb-0.5 block">
                      Queue Timeout (ms)
                    </label>
                    <input
                      type="number"
                      min="1000"
                      max="120000"
                      step="1000"
                      value={config.queueTimeoutMs ?? ""}
                      placeholder="30000"
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          queueTimeoutMs: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      className="w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              )}
              <p className="text-[10px] text-text-muted">
                Leave empty to use global defaults. These override per-provider settings.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Button onClick={onClose} variant="ghost" fullWidth size="sm">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              fullWidth
              size="sm"
              disabled={!name.trim() || !!nameError || saving}
            >
              {saving ? "Saving..." : isEdit ? "Save" : "Create"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Model Select Modal */}
      <ModelSelectModal
        isOpen={showModelSelect}
        onClose={() => setShowModelSelect(false)}
        onSelect={handleAddModel}
        activeProviders={activeProviders}
        modelAliases={modelAliases}
        title="Add Model to Combo"
      />
    </>
  );
}

// ─────────────────────────────────────────────
// Weight Total Bar
// ─────────────────────────────────────────────
function WeightTotalBar({ models }) {
  const total = models.reduce((sum, m) => sum + (m.weight || 0), 0);
  const isValid = total === 100;
  const colors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-purple-500",
    "bg-rose-500",
    "bg-cyan-500",
    "bg-orange-500",
    "bg-indigo-500",
  ];

  return (
    <div className="mt-1.5">
      {/* Visual bar */}
      <div className="h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden flex">
        {models.map((m, i) => {
          if (!m.weight) return null;
          return (
            <div
              key={i}
              className={`${colors[i % colors.length]} transition-all duration-300`}
              style={{ width: `${Math.min(m.weight, 100)}%` }}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-0.5">
        <div className="flex gap-1">
          {models.map(
            (m, i) =>
              m.weight > 0 && (
                <span key={i} className="flex items-center gap-0.5 text-[9px] text-text-muted">
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${colors[i % colors.length]}`}
                  />
                  {m.weight}%
                </span>
              )
          )}
        </div>
        <span
          className={`text-[10px] font-medium ${
            isValid ? "text-emerald-500" : total > 100 ? "text-red-500" : "text-amber-500"
          }`}
        >
          {total}%{!isValid && total > 0 && " ≠ 100%"}
        </span>
      </div>
    </div>
  );
}
