"use client";

// src/app/(dashboard)/dashboard/playground/components/ToolsBuilder.tsx

import { useState } from "react";
import { useToolsBuilder } from "../hooks/useToolsBuilder";
import type { ToolDefinition } from "@/lib/playground/codeExport";

interface ToolsBuilderProps {
  toolsBuilder: ReturnType<typeof useToolsBuilder>;
}

const EMPTY_TOOL: { name: string; description: string; parametersRaw: string } = {
  name: "",
  description: "",
  parametersRaw: JSON.stringify({ type: "object", properties: {}, required: [] }, null, 2),
};

/**
 * ToolsBuilder — client-only UI (D9) for editing the tools[] array.
 *
 * Each tool has: name, description, and a JSON schema textarea for parameters.
 * Validation uses Zod ToolDefinitionSchema (via useToolsBuilder).
 */
export default function ToolsBuilder({ toolsBuilder }: ToolsBuilderProps) {
  const { tools, errors, add, remove, update } = toolsBuilder;

  // Form state for the "Add tool" form
  const [form, setForm] = useState(EMPTY_TOOL);
  const [formError, setFormError] = useState<string | null>(null);

  // Per-tool editing state: index → draft values
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState<{ name: string; description: string; parametersRaw: string } | null>(null);

  function handleAdd() {
    let parsed: unknown;
    try {
      parsed = JSON.parse(form.parametersRaw);
    } catch {
      setFormError("Parameters must be valid JSON");
      return;
    }

    const tool: ToolDefinition = {
      type: "function",
      function: {
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        parameters: parsed as Record<string, unknown>,
      },
    };

    const result = add(tool);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    setForm(EMPTY_TOOL);
    setFormError(null);
  }

  function startEdit(index: number) {
    const tool = tools[index];
    setEditingIndex(index);
    setEditDraft({
      name: tool.function.name,
      description: tool.function.description ?? "",
      parametersRaw: JSON.stringify(tool.function.parameters, null, 2),
    });
  }

  function handleUpdate(index: number) {
    if (editDraft == null) return;

    let parsed: unknown;
    try {
      parsed = JSON.parse(editDraft.parametersRaw);
    } catch {
      return; // Keep edit mode open — show nothing or rely on inline error
    }

    const tool: ToolDefinition = {
      type: "function",
      function: {
        name: editDraft.name.trim(),
        description: editDraft.description.trim() || undefined,
        parameters: parsed as Record<string, unknown>,
      },
    };

    const result = update(index, tool);
    if (result.ok) {
      setEditingIndex(null);
      setEditDraft(null);
    }
  }

  function cancelEdit() {
    setEditingIndex(null);
    setEditDraft(null);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Existing tools */}
      {tools.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
            Tools ({tools.length})
          </span>
          {tools.map((tool, idx) => {
            const isEditing = editingIndex === idx;
            const toolError = errors.get(idx);

            return (
              <div
                key={idx}
                className="border border-border rounded-lg overflow-hidden"
              >
                {/* Tool header */}
                <div className="flex items-center justify-between px-3 py-2 bg-bg-alt">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-text-muted">
                      function
                    </span>
                    <code className="text-xs font-mono text-text-main">
                      {tool.function.name}
                    </code>
                    {tool.function.description && (
                      <span className="text-[11px] text-text-muted truncate max-w-[200px]">
                        — {tool.function.description}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {!isEditing && (
                      <button
                        onClick={() => startEdit(idx)}
                        className="p-1 rounded text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        aria-label={`Edit tool ${tool.function.name}`}
                      >
                        <span className="material-symbols-outlined text-[14px]">edit</span>
                      </button>
                    )}
                    <button
                      onClick={() => remove(idx)}
                      className="p-1 rounded text-text-muted hover:text-destructive transition-colors"
                      aria-label={`Remove tool ${tool.function.name}`}
                    >
                      <span className="material-symbols-outlined text-[14px]">delete</span>
                    </button>
                  </div>
                </div>

                {/* Edit form */}
                {isEditing && editDraft != null && (
                  <div className="flex flex-col gap-2 p-3 bg-surface">
                    <input
                      type="text"
                      value={editDraft.name}
                      onChange={(e) => setEditDraft({ ...editDraft, name: e.target.value })}
                      placeholder="Function name"
                      className="text-xs bg-bg-alt border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
                    />
                    <input
                      type="text"
                      value={editDraft.description}
                      onChange={(e) => setEditDraft({ ...editDraft, description: e.target.value })}
                      placeholder="Description (optional)"
                      className="text-xs bg-bg-alt border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
                    />
                    <textarea
                      value={editDraft.parametersRaw}
                      onChange={(e) => setEditDraft({ ...editDraft, parametersRaw: e.target.value })}
                      rows={6}
                      className="text-xs font-mono bg-bg-alt border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main resize-y"
                      aria-label="JSON schema for parameters"
                    />
                    {toolError && (
                      <p className="text-xs text-destructive">{toolError}</p>
                    )}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdate(idx)}
                        className="text-xs px-2.5 py-1 rounded bg-primary text-white hover:bg-primary/90 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-xs px-2.5 py-1 rounded border border-border text-text-muted hover:text-text-main transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add tool form */}
      <div className="border border-border rounded-lg p-3 flex flex-col gap-2 bg-surface">
        <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
          Add tool
        </span>

        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Function name *"
          className="text-xs bg-bg-alt border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
        />

        <input
          type="text"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description (optional)"
          className="text-xs bg-bg-alt border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
        />

        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-text-muted uppercase tracking-wider">
            Parameters (JSON schema)
          </label>
          <textarea
            value={form.parametersRaw}
            onChange={(e) => setForm({ ...form, parametersRaw: e.target.value })}
            rows={6}
            className="text-xs font-mono bg-bg-alt border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main resize-y"
            aria-label="JSON schema for parameters"
          />
        </div>

        {formError && (
          <p className="text-xs text-destructive">{formError}</p>
        )}

        <button
          onClick={handleAdd}
          className="text-xs px-3 py-1.5 rounded bg-primary text-white hover:bg-primary/90 transition-colors self-start"
        >
          + Add tool
        </button>
      </div>
    </div>
  );
}
