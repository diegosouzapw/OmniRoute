"use client";

/**
 * ProviderIcon — Renders a provider logo using @lobehub/icons with static asset fallbacks.
 *
 * Strategy (#529):
 * 0. If `src` is set (operator-supplied remote icon URL, #2166), render it — this always
 *    wins over the @lobehub/static resolution below. On load error, falls back to
 *    `fallbackText`/`fallbackColor` (a colored text badge) if provided, otherwise falls
 *    through to steps 1-4.
 * 1. Try @lobehub/icons direct icon components (no @lobehub/ui peer runtime)
 * 2. Fall back to /providers/{id}.png (existing static assets)
 * 3. Fall back to /providers/{id}.svg (SVG assets)
 * 4. Fall back to a generic AI icon
 *
 * Usage:
 *   <ProviderIcon providerId="openai" size={24} />
 *   <ProviderIcon providerId="anthropic" size={28} type="color" />
 *   <ProviderIcon providerId="openai-compatible-abc" src={node.iconUrl} fallbackText="OC" />
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
  /**
   * Optional operator-supplied remote icon URL (#2166) — e.g. a custom icon set for an
   * OpenAI-/Anthropic-compatible provider node. When set, this always takes priority
   * over the @lobehub/static resolution. On load error, falls back to `fallbackText`
   * (if provided) or the normal resolution chain below.
   */
  src?: string;
  alt?: string;
  fallbackText?: string;
  fallbackColor?: string;
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
  "inner-ai",
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
  "adapta-web",
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
  "bazaarlink",
  "brave",
  "brave-search",
  "cartesia",
  "360ai",
  "huggingchat",
  "iflytek",
  "sparkdesk",
  "arcee-ai",
  "liquid",
  "monsterapi",
  "nomic",
  "poolside",
  "clarifai",
  "command-code",
  "claude-web",
  "docker-model-runner",
  "droid",
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
  src,
  alt,
  fallbackText,
  fallbackColor,
}: ProviderIconProps) {
  const normalizedId = providerId.toLowerCase();
  const lobeIcon = getLobeProviderIcon(normalizedId, type);
  const hasPng = KNOWN_PNGS.has(normalizedId);
  const hasSvg = KNOWN_SVGS.has(normalizedId);

  const [failedAssets, setFailedAssets] = useState<Record<string, true>>({});
  const [remoteSrcFailed, setRemoteSrcFailed] = useState(false);
  const pngKey = `${normalizedId}:png`;
  const svgKey = `${normalizedId}:svg`;
  const usePng = !lobeIcon && hasPng && !failedAssets[pngKey];
  const useSvg = !lobeIcon && hasSvg && !failedAssets[svgKey] && (!hasPng || failedAssets[pngKey]);

  const trimmedSrc = typeof src === "string" ? src.trim() : "";

  // #2166: a custom remote icon URL always wins over the @lobehub/static resolution
  // below. It is a plain <img> (not next/image) so operators can point at any host
  // without requiring `images.remotePatterns` allow-listing for arbitrary domains.
  if (trimmedSrc && !remoteSrcFailed) {
    return (
      <span
        className={className}
        style={{ display: "inline-flex", alignItems: "center", ...style }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- operator-supplied remote URL, not a static/known asset */}
        <img
          src={trimmedSrc}
          alt={alt || providerId}
          width={size}
          height={size}
          style={{ objectFit: "contain", flex: "none" }}
          onError={() => setRemoteSrcFailed(true)}
        />
      </span>
    );
  }

  if (trimmedSrc && remoteSrcFailed && fallbackText) {
    return (
      <span
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          fontSize: Math.max(10, Math.round(size * 0.4)),
          fontWeight: 700,
          lineHeight: 1,
          color: fallbackColor || "currentColor",
          ...style,
        }}
      >
        {fallbackText}
      </span>
    );
  }

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
