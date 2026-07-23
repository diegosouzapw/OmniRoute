"use client";

import CompressionPanel from "./CompressionPanel";
import CompressionStylesTile from "../CompressionStylesTile";

export default function CompressionSettingsPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <CompressionPanel />
      {/* D0: read-only telemetry tile (output-token savings + applied styles) */}
      <CompressionStylesTile />
    </div>
  );
}
