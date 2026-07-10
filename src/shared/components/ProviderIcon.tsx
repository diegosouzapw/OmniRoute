"use client";

/**
 * ProviderIcon — Renders a provider logo prioritizing local SVGs for speed.
 *
 * Strategy (#529):
 * 0. If `src` is set (operator-supplied remote icon URL, #2166), render it — this always
 *    wins over the resolution below. On load error, falls back to
 *    `fallbackText`/`fallbackColor` (a colored text badge) if provided, otherwise falls
 *    through to steps 1-5.
 * 1. Try /providers/{id}.svg (local SVG assets — fastest, cached separately from JS bundle)
 * 2. Try @lobehub/icons direct React components (no @lobehub/ui peer runtime)
 * 3. Fall back to thesvg.org CDN (external SVG)
 * 4. Fall back to /providers/{id}.png (legacy static assets)
 * 5. Fall back to a generic AI icon
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
   * over the resolution chain. On load error, falls back to `fallbackText`
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

const KNOWN_SVGS = new Set([
  "360ai",
  "alibaba",
  "anthropic",
  "apikey",
  "arcee",
  "arcee-ai",
  "assemblyai",
  "aws",
  "azure",
  "azureai",
  "baichuan",
  "baidu",
  "bailian",
  "baseten",
  "bazaarlink",
  "brave",
  "brave-search",
  "cartesia",
  "cerebras",
  "clarifai",
  "claude",
  "claude-web",
  "cline",
  "cloudflare",
  "codex",
  "cohere",
  "comfyui",
  "command-code",
  "continue",
  "copilot",
  "coze",
  "cursor",
  "deepgram",
  "deepinfra",
  "deepseek",
  "dify",
  "docker-model-runner",
  "doubao",
  "droid",
  "elevenlabs",
  "exa",
  "fal",
  "fireworks",
  "friendli",
  "gemini",
  "gitlab",
  "gitlab-duo",
  "google",
  "grok",
  "groq",
  "heroku",
  "huggingchat",
  "huggingface",
  "hyperbolic",
  "ibm",
  "iflytek",
  "inclusionai",
  "inference",
  "inworld",
  "kilo-gateway",
  "kilocode",
  "kimi",
  "kiro",
  "krutrim",
  "lambda",
  "liquid",
  "longcat",
  "meta",
  "metaai",
  "minimax",
  "mistral",
  "modal",
  "monsterapi",
  "moonshot",
  "morph",
  "nebius",
  "nlpcloud",
  "nomic",
  "novita",
  "nvidia",
  "oauth",
  "oci",
  "ollama",
  "openai",
  "openclaw",
  "opencode",
  "openrouter",
  "ovhcloud",
  "perplexity",
  "phind",
  "picoclaw",
  "playht",
  "poe",
  "pollinations",
  "poolside",
  "puter",
  "qianfan",
  "qwen",
  "recraft",
  "replicate",
  "roocode",
  "runway",
  "sambanova",
  "sap",
  "scaleway",
  "searchapi",
  "searxng-search",
  "sensenova",
  "serper-search",
  "snowflake",
  "sparkdesk",
  "stepfun",
  "suno",
  "synthetic",
  "tavily",
  "tencent",
  "topazlabs",
  "trae",
  "udio",
  "upstage",
  "v0",
  "vercel",
  "vllm",
  "volcengine",
  "voyage",
  "wandb",
  "windsurf",
  "xai",
  "xinference",
  "yi",
  "youcom-search",
  "zhipu",
]);

const KNOWN_PNGS = new Set([
  "adapta-web",
  "agentrouter",
  "aimlapi",
  "anthropic-m",
  "blackbox",
  "blackbox-web",
  "cliproxyapi",
  "empower",
  "gigachat",
  "inner-ai",
  "ironclaw",
  "kie",
  "lemonade",
  "linkup-search",
  "llamafile",
  "llamagate",
  "maritalk",
  "nanobot",
  "nanogpt",
  "nscale",
  "oai-cc",
  "oai-r",
  "piapi",
  "predibase",
  "reka",
  "zeroclaw",
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
  const hasSvg = KNOWN_SVGS.has(normalizedId);
  const hasPng = KNOWN_PNGS.has(normalizedId);

  const [failedAssets, setFailedAssets] = useState<Record<string, true>>({});
  const [remoteSrcFailed, setRemoteSrcFailed] = useState(false);
  const svgKey = `${normalizedId}:svg`;
  const pngKey = `${normalizedId}:png`;
  const theSvgKey = `${normalizedId}:thesvg`;

  const trimmedSrc = typeof src === "string" ? src.trim() : "";
  const svgFailed = failedAssets[svgKey];
  const theSvgFailed = failedAssets[theSvgKey];
  const pngFailed = failedAssets[pngKey];

  // #2166: a custom remote icon URL always wins over the resolution chain below.
  // It is a plain <img> (not next/image) so operators can point at any host
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

  // Tier 1: Local SVG — fastest, cached separately from the JS bundle
  if (hasSvg && !svgFailed) {
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

  // Tier 2: LobeHub npm icons — only when no local SVG (or SVG failed to load)
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

  // Tier 3: thesvg.org CDN — external SVG fallback for unknown providers
  if (!theSvgFailed) {
    return (
      <span
        className={className}
        style={{ display: "inline-flex", alignItems: "center", ...style }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- external SVG from thesvg.org, not a static/known asset */}
        <img
          src={`https://thesvg.org/icons/${normalizedId}/default.svg`}
          alt={providerId}
          width={size}
          height={size}
          style={{ objectFit: "contain", flex: "none" }}
          onError={() => setFailedAssets((current) => ({ ...current, [theSvgKey]: true }))}
        />
      </span>
    );
  }

  // Tier 4: Local PNG — last resort before generic icon
  if (hasPng && !pngFailed) {
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
          onError={() => setFailedAssets((current) => ({ ...current, [pngKey]: true }))}
          unoptimized
        />
      </span>
    );
  }

  // Tier 5: Generic AI icon
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", ...style }}>
      <GenericProviderIcon size={size} />
    </span>
  );
});

export default ProviderIcon;
export type { ProviderIconProps };
