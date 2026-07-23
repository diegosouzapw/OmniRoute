"use client";

/**
 * ProviderIcon — Renders a provider logo prioritizing local SVGs for speed.
 *
 * Strategy (#529):
 * 0. If `src` is set (operator-supplied remote icon URL, #2166), render it — this always
 *    wins over the resolution below. On load error, falls back to
 *    `fallbackText`/`fallbackColor` (a colored text badge) if provided, otherwise falls
 *    through to steps 1-6.
 * 1. Theme-aware static SVGs (`THEMED_SVGS`, e.g. arena-light/dark for lmarena)
 * 2. Try /providers/{id}.svg (local SVG assets — fastest, cached separately from JS bundle)
 * 3. Try @lobehub/icons direct React components (no @lobehub/ui peer runtime)
 * 4. Try /providers/{id}.png (legacy static assets)
 * 5. Fall back to thesvg.org CDN (external SVG)
 * 6. Fall back to a generic AI icon
 *
 * Usage:
 *   <ProviderIcon providerId="openai" size={24} />
 *   <ProviderIcon providerId="anthropic" size={28} type="color" />
 *   <ProviderIcon providerId="openai-compatible-abc" src={node.iconUrl} fallbackText="OC" />
 */

import { createElement, memo, useState } from "react";
import Image from "next/image";

import { useTheme } from "@/shared/hooks/useTheme";

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
  "api-airforce",
  "apikey",
  "arcee",
  "arcee-ai",
  "assemblyai",
  "auggie",
  "aws",
  "azure",
  "azureai",
  "baichuan",
  "baidu",
  "bailian",
  "baseten",
  "bazaarlink",
  "bluesminds",
  "brave",
  "brave-search",
  "byteplus",
  "bytez",
  "cartesia",
  "cerebras",
  "charm-hyper",
  "chipotle",
  "chutes",
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
  "crof",
  "cursor",
  "deepgram",
  "deepinfra",
  "deepseek",
  "dgrid",
  "dify",
  "digitalocean",
  "dit",
  "docker-model-runner",
  "doubao",
  "droid",
  "duckduckgo-web",
  "elevenlabs",
  "exa",
  "factory",
  "fal",
  "fireworks",
  "freeaiapikey",
  "freemodel-dev",
  "friendli",
  "galadriel",
  "gemini",
  "gitlab",
  "gitlab-duo",
  "gitlawb",
  "gitlawb-gmi",
  "google",
  "grok",
  "groq",
  "hackclub",
  "haiper",
  "hcnsec",
  "heroku",
  "huggingchat",
  "huggingface",
  "hyperbolic",
  "ibm",
  "ideogram",
  "iflytek",
  "inclusionai",
  "inference",
  "inworld",
  "kenari",
  "kilo-gateway",
  "kilocode",
  "kimi",
  "kiro",
  "krutrim",
  "lambda",
  "leonardo",
  "liquid",
  "llm7",
  "longcat",
  "meta",
  "metaai",
  "minimax",
  "mistral",
  "modal",
  "modelscope",
  "monsterapi",
  "moonshot",
  "morph",
  "nebius",
  "nlpcloud",
  "nomic",
  "novita",
  "nube",
  "nvidia",
  "oauth",
  "oci",
  "ollama",
  "openadapter",
  "openai",
  "openclaw",
  "opencode",
  "openrouter",
  "orcarouter",
  "ovhcloud",
  "perplexity",
  "phind",
  "picoclaw",
  "pioneer",
  "playht",
  "poe",
  "pollinations",
  "poolside",
  "publicai",
  "puter",
  "qianfan",
  "qiniu",
  "qwen",
  "qwencloud",
  "recraft",
  "replicate",
  "requesty",
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
  "sumopod",
  "suno",
  "synthetic",
  "t3-web",
  "tavily",
  "tencent",
  "theoldllm",
  "tokenrouter",
  "topazlabs",
  "trae",
  "udio",
  "uncloseai",
  "upstage",
  "v0",
  "veoaifree-web",
  "vercel",
  "vllm",
  "volcengine",
  "voyage",
  "wafer",
  "wandb",
  "windsurf",
  "x5lab",
  "xai",
  "xinference",
  "yi",
  "youcom-search",
  "yuanbao-web",
  "zed-hosted",
  "zenmux",
  "zenmux-free",
  "zhipu",
]);

const LOCAL_SVG_ALIASES: Record<string, string> = {
  "qwen-cloud": "qwencloud",
  "qwen-cloud-token-plan": "qwencloud",
};

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
  "dahl",
  "zeroclaw",
]);

const THEMED_SVGS: Record<string, { light: string; dark: string }> = {
  // Arena (formerly LMArena) — wire id stays `lmarena`; alias `lma` also accepted.
  lmarena: {
    light: "/providers/arena-light.svg",
    dark: "/providers/arena-dark.svg",
  },
  lma: {
    light: "/providers/arena-light.svg",
    dark: "/providers/arena-dark.svg",
  },
  // Kimi (Moonshot AI) official-partnership logomarks (2026-07): the official
  // rounded-square badge in Kimi's brand blue (#1783FF — see KIMI_BRAND_COLOR in
  // featuredProviders.ts) for the 3 visible Kimi-family cards. This replaces two
  // weaker fallbacks: kimi-coding/kimi-web previously fell through to the
  // third-party LobeHub "Kimi" icon (Tier 3, KNOWN_SVGS has no "kimi-coding"/
  // "kimi-web" entry), and moonshot's `/providers/moonshot.svg` uses
  // `fill="currentColor"`, which never resolves against the page theme because
  // Tier 2 renders it inside a plain `<img>` (no CSS-inheritance path for an
  // externally-referenced SVG document) — it stayed black in dark mode. Asset
  // filenames name the BACKGROUND each mark is designed for (Kimi's own naming),
  // matching the light/dark pairing used elsewhere in this map.
  "kimi-coding": {
    light: "/providers/kimi-logomark-light.svg",
    dark: "/providers/kimi-logomark-dark.svg",
  },
  "kimi-web": {
    light: "/providers/kimi-logomark-light.svg",
    dark: "/providers/kimi-logomark-dark.svg",
  },
  moonshot: {
    light: "/providers/kimi-logomark-light.svg",
    dark: "/providers/kimi-logomark-dark.svg",
  },
};

const PROVIDER_ICON_ALIASES: Record<string, string> = {
  "opencode-go": "opencode",
  "opencode-zen": "opencode",
  "poe-web": "poe",
};

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
  const { isDark } = useTheme();
  const normalizedId = PROVIDER_ICON_ALIASES[providerId.toLowerCase()] || providerId.toLowerCase();
  const localSvgId = LOCAL_SVG_ALIASES[normalizedId] || normalizedId;
  const lobeIcon = getLobeProviderIcon(normalizedId, type);
  const themedSvg = THEMED_SVGS[normalizedId];
  const hasSvg = KNOWN_SVGS.has(localSvgId);
  const hasPng = KNOWN_PNGS.has(normalizedId);

  const [failedAssets, setFailedAssets] = useState<Record<string, true>>({});
  const [remoteSrcFailed, setRemoteSrcFailed] = useState(false);
  const themedKey = `${normalizedId}:themed`;
  const svgKey = `${normalizedId}:svg`;
  const pngKey = `${normalizedId}:png`;
  const theSvgKey = `${normalizedId}:thesvg`;

  const trimmedSrc = typeof src === "string" ? src.trim() : "";
  const themedFailed = failedAssets[themedKey];
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

  // Tier 1: Theme-aware local SVGs (e.g. Arena light/dark)
  if (themedSvg && !themedFailed) {
    const themedSrc = isDark ? themedSvg.dark : themedSvg.light;
    return (
      <span
        className={className}
        style={{ display: "inline-flex", alignItems: "center", ...style }}
      >
        <Image
          src={themedSrc}
          alt={providerId}
          width={size}
          height={size}
          style={{ objectFit: "contain" }}
          onError={() => setFailedAssets((current) => ({ ...current, [themedKey]: true }))}
          unoptimized
        />
      </span>
    );
  }

  // Tier 2: Local SVG — fastest, cached separately from the JS bundle
  if (hasSvg && !svgFailed) {
    return (
      <span
        className={className}
        style={{ display: "inline-flex", alignItems: "center", ...style }}
      >
        <Image
          src={`/providers/${localSvgId}.svg`}
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

  // Tier 3: LobeHub npm icons — only when no local SVG (or SVG failed to load)
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

  // Tier 4: Known local PNG — avoid a failing external request when a bundled asset exists
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

  // Tier 5: thesvg.org CDN — external SVG fallback for unknown providers
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

  // Tier 6: Generic AI icon
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", ...style }}>
      <GenericProviderIcon size={size} />
    </span>
  );
});

export default ProviderIcon;
export type { ProviderIconProps };
