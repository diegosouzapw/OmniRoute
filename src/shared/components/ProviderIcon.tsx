"use client";

/**
 * ProviderIcon — Renders a provider logo using @lobehub/icons with static asset fallbacks.
 *
 * Strategy (#529):
 * 1. Try @lobehub/icons direct icon components (no @lobehub/ui peer runtime)
 * 2. Fall back to /providers/{id}.png (existing static assets)
 * 3. Fall back to /providers/{id}.svg (SVG assets)
 * 4. Fall back to a generic AI icon
 *
 * Usage:
 *   <ProviderIcon providerId="openai" size={24} />
 *   <ProviderIcon providerId="anthropic" size={28} type="color" />
 */

import { createElement, memo, useState } from "react";
import Image from "next/image";

import { getLobeProviderIcon } from "./lobeProviderIcons";

interface ProviderIconProps {
  providerId: string;
  size?: number;
  type?: "mono" | "color";
  className?: string;
  style?: React.CSSProperties;
}

function GenericProviderIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flex: "none" }}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const KNOWN_PNGS = new Set([
  "agentrouter",
  "aimlapi",
  "anthropic-m",
  "blackbox",
  "claude",
  "continue",
  "copilot",
  "cursor",
  "deepgram",
  "ironclaw",
  "kie",
  "nanobot",
  "oai-cc",
  "oai-r",
  "openclaw",
  "zeroclaw",
  "blackbox-web",
  "cliproxyapi",
  "empower",
  "gigachat",
  "heroku",
  "lemonade",
  "linkup-search",
  "llamafile",
  "llamagate",
  "maritalk",
  "nanogpt",
  "nscale",
  "ovhcloud",
  "piapi",
  "predibase",
  "reka",
]);
const KNOWN_SVGS = new Set([
  "apikey",
  "brave",
  "brave-search",
  "cartesia",
  "clarifai",
  "docker-model-runner",
  "droid",
  "gemini-cli",
  "gitlab",
  "gitlab-duo",
  "inworld",
  "kiro",
  "kilo-gateway",
  "kilocode",
  "modal",
  "nlpcloud",
  "oauth",
  "oci",
  "opencode",
  "playht",
  "puter",
  "qianfan",
  "sap",
  "scaleway",
  "serper-search",
  "searxng-search",
  "synthetic",
  "wandb",
  "youcom-search",
]);

const ProviderIcon = memo(function ProviderIcon({
  providerId,
  size = 24,
  type = "color",
  className,
  style,
}: ProviderIconProps) {
  const normalizedId = providerId.toLowerCase();
  const lobeIcon = getLobeProviderIcon(normalizedId, type);
  const hasPng = KNOWN_PNGS.has(normalizedId);
  const hasSvg = KNOWN_SVGS.has(normalizedId);

  const [failedAssets, setFailedAssets] = useState<Record<string, true>>({});
  const pngKey = `${normalizedId}:png`;
  const svgKey = `${normalizedId}:svg`;
  const usePng = !lobeIcon && hasPng && !failedAssets[pngKey];
  const useSvg = !lobeIcon && hasSvg && !failedAssets[svgKey] && (!hasPng || failedAssets[pngKey]);

  if (lobeIcon) {
    return (
      <span
        className={className}
        style={{ display: "inline-flex", alignItems: "center", ...style }}
      >
        {createElement(lobeIcon, {
          "aria-label": providerId,
          size,
          style: { flex: "none" },
        })}
      </span>
    );
  }

  if (usePng) {
    return (
      <span
        className={className}
        style={{ display: "inline-flex", alignItems: "center", ...style }}
      >
        <Image
          src={`/providers/${normalizedId}.png`}
          alt={providerId}
          width={size}
          height={size}
          style={{ objectFit: "contain" }}
          onError={() => {
            setFailedAssets((current) => ({ ...current, [pngKey]: true }));
          }}
          unoptimized
        />
      </span>
    );
  }

  if (useSvg) {
    return (
      <span
        className={className}
        style={{ display: "inline-flex", alignItems: "center", ...style }}
      >
        <Image
          src={`/providers/${normalizedId}.svg`}
          alt={providerId}
          width={size}
          height={size}
          style={{ objectFit: "contain" }}
          onError={() => setFailedAssets((current) => ({ ...current, [svgKey]: true }))}
          unoptimized
        />
      </span>
    );
  }

  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", ...style }}>
      <GenericProviderIcon size={size} />
    </span>
  );
});

export default ProviderIcon;
export type { ProviderIconProps };
