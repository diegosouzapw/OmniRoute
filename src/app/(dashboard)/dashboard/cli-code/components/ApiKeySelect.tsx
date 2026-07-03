"use client";

import { useState } from "react";

const CUSTOM_VALUE = "__custom__";

export default function ApiKeySelect({
  value,
  onChange,
  apiKeys = [],
  cloudEnabled = false,
  className = "",
}) {
  const isCustom = !apiKeys.some((k) => k.key === value) && value !== "";
  const [mode, setMode] = useState(() => {
    if (!value) return apiKeys.length > 0 ? apiKeys[0].key : CUSTOM_VALUE;
    if (apiKeys.some((k) => k.key === value)) return value;
    return CUSTOM_VALUE;
  });
  const [customInput, setCustomInput] = useState(isCustom ? value : "");

  const handleSelect = (e) => {
    const next = e.target.value;
    setMode(next);
    if (next === CUSTOM_VALUE) {
      setCustomInput("");
      onChange("");
    } else {
      onChange(next);
    }
  };

  const handleCustomInput = (e) => {
    const v = e.target.value;
    setCustomInput(v);
    onChange(v);
  };

  const noKeys = apiKeys.length === 0 && mode !== CUSTOM_VALUE;

  if (noKeys && mode !== CUSTOM_VALUE) {
    return (
      <span
        className={`min-w-0 rounded bg-surface/40 px-2 py-2 text-xs text-text-muted sm:py-1.5 ${className}`}
      >
        {cloudEnabled ? "No API keys - Create one in Keys page" : "sk_9router (default)"}
      </span>
    );
  }

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <select
        value={mode}
        onChange={handleSelect}
        className="w-full min-w-0 px-2 py-2 bg-surface rounded text-xs border border-border focus:outline-none focus:ring-1 focus:ring-primary/50 sm:py-1.5"
      >
        {apiKeys.map((k) => (
          <option key={k.id} value={k.key}>
            {k.key}
          </option>
        ))}
        <option value={CUSTOM_VALUE}>Custom...</option>
      </select>
      {mode === CUSTOM_VALUE && (
        <input
          type="text"
          value={customInput}
          onChange={handleCustomInput}
          placeholder="sk-..."
          className="w-full min-w-0 px-2 py-2 bg-surface rounded border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary/50 sm:py-1.5"
        />
      )}
    </div>
  );
}
