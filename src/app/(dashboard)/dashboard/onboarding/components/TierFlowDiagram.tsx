"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export function TierFlowDiagram() {
  const { resolvedTheme } = useTheme();
  const src =
    resolvedTheme === "dark" ? "/images/tier-flow-dark.svg" : "/images/tier-flow-light.svg";

  return (
    <div className="flex flex-col items-center gap-3 my-4">
      <Image
        src={src}
        alt="OmniRoute 3-tier fallback diagram"
        width={800}
        height={420}
        priority
        className="w-full max-w-2xl rounded-lg border border-white/[0.06]"
      />
      <p className="text-xs text-text-muted max-w-xl text-center">
        Requests flow through your subscription quotas first, then pay-per-token cheap providers,
        then free-tier providers — automatic, zero-config.
      </p>
    </div>
  );
}
