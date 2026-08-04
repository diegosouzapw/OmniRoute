"use client";
import { CompressionCockpit } from "../studio/CompressionCockpit";
import { useLiveCompression } from "@/hooks/useLiveCompression";
export default function CompressionLivePage() {
  const { lastRun } = useLiveCompression();
  return (
    <div className="p-4 h-[calc(100dvh-6rem)] min-h-[480px]">
      <CompressionCockpit run={lastRun} />
    </div>
  );
}
