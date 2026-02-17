"use client";

/**
 * FilterBar — Shared UI primitive (T-29)
 *
 * Reusable filter bar with search input and optional filter chips.
 * Used by RequestLoggerV2, ProxyLogger, and similar data tables.
 *
 * Usage:
 *   <FilterBar
 *     searchValue={search}
 *     onSearchChange={setSearch}
 *     placeholder="Search logs..."
 *     filters={[
 *       { key: 'status', label: 'Status', options: ['ok', 'error'] },
 *       { key: 'provider', label: 'Provider', options: ['openai', 'anthropic'] },
 *     ]}
 *     activeFilters={activeFilters}
 *     onFilterChange={(key, value) => setFilters({ ...filters, [key]: value })}
 *   />
 */

import { useState, useCallback } from "react";

export default function FilterBar({
  searchValue = "",
  onSearchChange,
  placeholder = "Search...",
  filters = [],
  activeFilters = {},
  onFilterChange,
  children,
}) {
  const [expandedFilter, setExpandedFilter] = useState(null);

  const handleClear = useCallback(() => {
    onSearchChange("");
    filters.forEach((f) => onFilterChange(f.key, ""));
    setExpandedFilter(null);
  }, [onSearchChange, filters, onFilterChange]);

  const hasActiveFilters =
    searchValue || Object.values(activeFilters).some((v) => v && v !== "");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        alignItems: "center",
        padding: "8px 0",
      }}
    >
      {/* Search input */}
      <div style={{ position: "relative", flex: "1 1 200px", minWidth: "200px" }}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: "8px 12px 8px 32px",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            color: "var(--text-primary, #e0e0e0)",
            fontSize: "13px",
            outline: "none",
          }}
        />
        <span
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.4,
            fontSize: "14px",
            pointerEvents: "none",
          }}
        >
          🔍
        </span>
      </div>

      {/* Filter chips */}
      {filters.map((filter) => (
        <div key={filter.key} style={{ position: "relative" }}>
          <button
            onClick={() =>
              setExpandedFilter(expandedFilter === filter.key ? null : filter.key)
            }
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: `1px solid ${activeFilters[filter.key] ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`,
              background: activeFilters[filter.key]
                ? "rgba(99,102,241,0.15)"
                : "rgba(255,255,255,0.05)",
              color: activeFilters[filter.key]
                ? "#818cf8"
                : "var(--text-secondary, #888)",
              fontSize: "12px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {filter.label}
            {activeFilters[filter.key] ? ` · ${activeFilters[filter.key]}` : ""}
          </button>
          {expandedFilter === filter.key && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                marginTop: "4px",
                background: "rgba(20,20,30,0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "4px",
                zIndex: 50,
                minWidth: "120px",
                backdropFilter: "blur(12px)",
              }}
            >
              <button
                onClick={() => {
                  onFilterChange(filter.key, "");
                  setExpandedFilter(null);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "6px 12px",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  color: "#888",
                  fontSize: "12px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                All
              </button>
              {(filter.options || []).map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    onFilterChange(filter.key, opt);
                    setExpandedFilter(null);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "6px 12px",
                    textAlign: "left",
                    background:
                      activeFilters[filter.key] === opt
                        ? "rgba(99,102,241,0.2)"
                        : "none",
                    border: "none",
                    color:
                      activeFilters[filter.key] === opt
                        ? "#818cf8"
                        : "var(--text-primary, #e0e0e0)",
                    fontSize: "12px",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Clear all */}
      {hasActiveFilters && (
        <button
          onClick={handleClear}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: "1px solid rgba(239,68,68,0.3)",
            background: "rgba(239,68,68,0.1)",
            color: "#ef4444",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      )}

      {/* Extra controls (e.g. refresh button) */}
      {children}
    </div>
  );
}
