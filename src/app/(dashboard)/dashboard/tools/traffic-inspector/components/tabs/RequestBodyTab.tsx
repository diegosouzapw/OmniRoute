"use client";

import { useState } from "react";
import type { InterceptedRequest } from "@/mitm/inspector/types";
import { JsonViewer } from "../shared/JsonViewer";
import { SecretMaskToggle } from "../shared/SecretMaskToggle";

interface RequestBodyTabProps {
  request: InterceptedRequest;
}

const MASK_PATTERNS = [/sk-[A-Za-z0-9]+/g, /Bearer [A-Za-z0-9._-]+/g, /eyJ[A-Za-z0-9._-]+/g];

function maskSecrets(text: string): string {
  let out = text;
  for (const p of MASK_PATTERNS) {
    out = out.replace(p, "••••");
  }
  return out;
}

export function RequestBodyTab({ request }: RequestBodyTabProps) {
  const [masked, setMasked] = useState(true);
  const [raw, setRaw] = useState(false);

  const body = request.requestBody;
  if (!body) {
    return <p className="p-4 text-sm text-text-muted">No request body.</p>;
  }

  const display = masked ? maskSecrets(body) : body;
  let parsed: unknown = null;
  try {
    parsed = JSON.parse(display);
  } catch {
    // not JSON
  }

  return (
    <div className="h-full flex flex-col gap-2 p-2">
      <div className="flex items-center gap-2">
        <SecretMaskToggle masked={masked} onToggle={() => setMasked((m) => !m)} />
        <button
          type="button"
          onClick={() => setRaw((r) => !r)}
          className="text-xs text-text-muted hover:text-text-main border border-border rounded px-2 py-0.5 focus-ring"
        >
          {raw ? "Formatted" : "Raw"}
        </button>
        <span className="ml-auto text-xs text-text-muted">{request.requestSize} B</span>
      </div>
      <div className="flex-1 overflow-auto bg-bg-subtle rounded border border-border p-2">
        {raw || !parsed ? (
          <pre className="text-xs font-mono text-text-main whitespace-pre-wrap break-all">{display}</pre>
        ) : (
          <JsonViewer data={parsed} />
        )}
      </div>
    </div>
  );
}
