"use client";

import { useMemo, useState } from "react";
import { Button, Checkbox, Input, Modal } from "@/shared/components";
import {
  SECRET_PLACEHOLDER,
  type LogExportDestination,
  type LogExportFieldDescriptor,
  type LogExportTypeDescriptor,
} from "../types";

export interface DestinationSubmitPayload {
  name: string;
  type: string;
  enabled: boolean;
  config: Record<string, unknown>;
  batchSize: number;
  includeBodies: boolean;
  maxBodyBytes: number;
  maxRowsPerRun: number;
}

interface DestinationFormModalProps {
  open: boolean;
  types: LogExportTypeDescriptor[];
  editing: LogExportDestination | null;
  saving: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (payload: DestinationSubmitPayload) => void;
}

type FormValues = Record<string, string | boolean>;

function initialValues(
  descriptor: LogExportTypeDescriptor | undefined,
  destination: LogExportDestination | null
): FormValues {
  const values: FormValues = {};
  for (const field of descriptor?.fields ?? []) {
    const stored = destination?.config?.[field.key];
    if (field.type === "boolean") {
      values[field.key] = stored === undefined ? true : Boolean(stored);
    } else {
      values[field.key] = stored === undefined || stored === null ? "" : String(stored);
    }
  }
  return values;
}

/**
 * Generic destination form: every field is rendered from the type descriptor served by
 * GET /api/log-export/types, so adding Datadog or Grafana needs no change here.
 *
 * State is initialised once per mount and the modal remounts it with a key, which keeps
 * the "edit an existing destination" reset out of an effect.
 */
function DestinationForm({
  types,
  editing,
  saving,
  error,
  onClose,
  onSubmit,
}: Omit<DestinationFormModalProps, "open">) {
  const [name, setName] = useState(editing?.name ?? "");
  const [typeId, setTypeId] = useState(editing?.type ?? types[0]?.id ?? "");
  const [enabled, setEnabled] = useState(editing?.enabled ?? true);
  const [batchSize, setBatchSize] = useState(String(editing?.batchSize ?? 500));
  const [includeBodies, setIncludeBodies] = useState(editing?.includeBodies ?? false);
  const [maxBodyBytes, setMaxBodyBytes] = useState(String(editing?.maxBodyBytes ?? 262144));
  const [maxRowsPerRun, setMaxRowsPerRun] = useState(String(editing?.maxRowsPerRun ?? 10000));
  const [values, setValues] = useState<FormValues>(() =>
    initialValues(
      types.find((type) => type.id === (editing?.type ?? types[0]?.id)),
      editing
    )
  );

  const descriptor = useMemo(() => types.find((type) => type.id === typeId), [types, typeId]);

  const handleTypeChange = (nextTypeId: string) => {
    setTypeId(nextTypeId);
    setValues(
      initialValues(
        types.find((type) => type.id === nextTypeId),
        null
      )
    );
  };

  const setValue = (key: string, value: string | boolean) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const buildConfig = (): Record<string, unknown> => {
    const config: Record<string, unknown> = {};
    for (const field of descriptor?.fields ?? []) {
      const value = values[field.key];
      if (field.type === "boolean") {
        config[field.key] = Boolean(value);
        continue;
      }
      if (field.type === "number") {
        const numeric = Number(value);
        if (Number.isFinite(numeric)) config[field.key] = numeric;
        continue;
      }
      const text = typeof value === "string" ? value.trim() : "";
      // An untouched secret on an edit keeps the stored ciphertext server-side.
      if (field.secret && text.length === 0 && editing) {
        config[field.key] = SECRET_PLACEHOLDER;
        continue;
      }
      if (text.length > 0) config[field.key] = text;
    }
    return config;
  };

  const secretPlaceholder = (field: LogExportFieldDescriptor) =>
    field.secret && editing ? "Leave blank to keep the stored value" : field.placeholder;

  const renderField = (field: LogExportFieldDescriptor) => {
    const value = values[field.key];
    if (field.type === "boolean") {
      return (
        <Checkbox
          key={field.key}
          label={field.labelFallback}
          checked={Boolean(value)}
          onChange={(event) => setValue(field.key, event.target.checked)}
        />
      );
    }
    if (field.type === "textarea") {
      return (
        <div key={field.key} className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-main" htmlFor={`field-${field.key}`}>
            {field.labelFallback}
            {field.required ? " *" : ""}
          </label>
          <textarea
            id={`field-${field.key}`}
            rows={6}
            className="w-full rounded-control border border-border bg-surface p-2 font-mono text-xs text-text-main"
            placeholder={secretPlaceholder(field)}
            value={typeof value === "string" ? value : ""}
            onChange={(event) => setValue(field.key, event.target.value)}
          />
          {field.helpFallback ? (
            <span className="text-[11px] text-text-muted">{field.helpFallback}</span>
          ) : null}
        </div>
      );
    }
    if (field.type === "select") {
      return (
        <div key={field.key} className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-main" htmlFor={`field-${field.key}`}>
            {field.labelFallback}
          </label>
          <select
            id={`field-${field.key}`}
            className="h-9 rounded-control border border-border bg-surface px-2 text-sm text-text-main"
            value={typeof value === "string" ? value : ""}
            onChange={(event) => setValue(field.key, event.target.value)}
          >
            {(field.options ?? []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.labelFallback}
              </option>
            ))}
          </select>
        </div>
      );
    }
    return (
      <Input
        key={field.key}
        label={`${field.labelFallback}${field.required ? " *" : ""}`}
        type={field.secret ? "password" : field.type === "number" ? "number" : "text"}
        placeholder={secretPlaceholder(field)}
        hint={field.helpFallback}
        value={typeof value === "string" ? value : ""}
        onChange={(event) => setValue(field.key, event.target.value)}
      />
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Name *"
        placeholder="Production warehouse"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-text-main" htmlFor="destination-type">
          Destination type
        </label>
        <select
          id="destination-type"
          className="h-9 rounded-control border border-border bg-surface px-2 text-sm text-text-main disabled:opacity-60"
          value={typeId}
          disabled={Boolean(editing)}
          onChange={(event) => handleTypeChange(event.target.value)}
        >
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>
        {descriptor ? (
          <span className="text-[11px] text-text-muted">{descriptor.description}</span>
        ) : null}
      </div>

      {(descriptor?.fields ?? []).map(renderField)}

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Batch size"
          type="number"
          hint="Rows per cursor batch"
          value={batchSize}
          onChange={(event) => setBatchSize(event.target.value)}
        />
        <Input
          label="Max rows per run"
          type="number"
          hint="Caps a single hourly run"
          value={maxRowsPerRun}
          onChange={(event) => setMaxRowsPerRun(event.target.value)}
        />
      </div>

      <Checkbox
        label="Export prompts and responses"
        checked={includeBodies}
        onChange={(event) => setIncludeBodies(event.target.checked)}
      />
      {includeBodies ? (
        <div className="flex flex-col gap-2 pl-6">
          <span className="text-[11px] text-text-muted">
            Ships the request and response payloads shown in the Logs detail pane, including the
            client and provider views of each call. Content is PII-sanitised and secret-redacted the
            same way the dashboard shows it, and calls made with a no-log API key carry none.
          </span>
          <Input
            label="Max payload bytes per field"
            type="number"
            hint="Longer payloads are truncated, not dropped"
            value={maxBodyBytes}
            onChange={(event) => setMaxBodyBytes(event.target.value)}
          />
        </div>
      ) : null}

      <Checkbox
        label="Enabled — include in the hourly export"
        checked={enabled}
        onChange={(event) => setEnabled(event.target.checked)}
      />

      {error ? (
        <p className="rounded-control bg-red-500/10 p-2 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}

      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button
          loading={saving}
          disabled={!name.trim() || !typeId}
          onClick={() =>
            onSubmit({
              name: name.trim(),
              type: typeId,
              enabled,
              config: buildConfig(),
              batchSize: Number(batchSize) || 500,
              includeBodies,
              maxBodyBytes: Number(maxBodyBytes) || 262144,
              maxRowsPerRun: Number(maxRowsPerRun) || 10000,
            })
          }
        >
          {editing ? "Save changes" : "Create destination"}
        </Button>
      </div>
    </div>
  );
}

export function DestinationFormModal({ open, ...formProps }: DestinationFormModalProps) {
  return (
    <Modal
      isOpen={open}
      onClose={formProps.onClose}
      size="lg"
      title={formProps.editing ? "Edit export destination" : "Add export destination"}
    >
      {open ? <DestinationForm key={formProps.editing?.id ?? "new"} {...formProps} /> : null}
    </Modal>
  );
}
