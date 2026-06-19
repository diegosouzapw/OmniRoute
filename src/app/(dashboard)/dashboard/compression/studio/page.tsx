"use client";

import { CompressionCockpit } from "./CompressionCockpit";
import { useLiveCompression } from "@/hooks/useLiveCompression";

/**
 * Compression Studio (Tela A) — live per-engine compression cascade.
 *
 * Thin route wrapper: subscribes to the `compression` WS channel via
 * `useLiveCompression` and renders the latest run in the cockpit. The cockpit is
 * a controlled component (renders an empty state until a run arrives), so this
 * page degrades gracefully when the live WS feed is off.
 */
export default function CompressionStudioPage() {
  const { lastRun } = useLiveCompression();

  return (
    <div className="p-4 h-[calc(100dvh-6rem)] min-h-[480px]">
      <CompressionCockpit run={lastRun} />
    </div>
  );
}
