"use client";

/**
 * ProviderIcon — Renders a provider icon from a provenance-aware resolution chain.
 *
 * Strategy (#529):
 * 0. If `src` is set (operator-supplied remote icon URL, #2166), render it — this always
 *    wins over the resolution below. On load error, falls back to
 *    `fallbackText`/`fallbackColor` (a colored text badge) if provided, otherwise falls
 *    through to steps 1-6.
 * 1. Render the internal generic icon for provider IDs whose previous local asset has no
 *    verified source/license provenance. Those IDs must never fall through to an icon CDN.
 * 2. Theme-aware static SVGs (`THEMED_SVGS`)
 * 3. Try /providers/{id}.svg (local SVG assets — fastest, cached separately from JS bundle)
 * 4. Try @lobehub/icons direct React components (no @lobehub/ui peer runtime)
 * 5. Fall back to thesvg.org CDN (external SVG)
 * 6. Fall back to a generic AI icon
 *
 * Usage:
 *   <ProviderIcon providerId="openai" size={24} />
 *   <ProviderIcon providerId="anthropic" size={28} type="color" />
 *   <ProviderIcon providerId="openai-compatible-abc" src={node.iconUrl} fallbackText="OC" />
 */

import { createElement, memo, useState } from "react";

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
    <svg
      data-provider-icon="generic"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ flex: "none" }}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const KNOWN_SVGS = new Set([
  "360ai",
  "alibaba",
  "anthropic",
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
  "bluesminds",
  "bytez",
  "cerebras",
  "charm-hyper",
  "chutes",
  "claude",
  "claude-web",
  "cline",
  "cloudflare",
  "codex",
  "cohere",
  "comfyui",
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
  "dit",
  "doubao",
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
  "gitlawb",
  "gitlawb-gmi",
  "google",
  "grok",
  "groq",
  "hcnsec",
  "heroku",
  "huggingchat",
  "huggingface",
  "hyperbolic",
  "ibm",
  "iflytek",
  "inclusionai",
  "inference",
  "kenari",
  "kimi",
  "kiro",
  "krutrim",
  "lambda",
  "liquid",
  "llm7",
  "longcat",
  "meta",
  "metaai",
  "minimax",
  "mistral",
  "monsterapi",
  "moonshot",
  "morph",
  "nebius",
  "nlpcloud",
  "nomic",
  "novita",
  "nube",
  "nvidia",
  "ollama",
  "openadapter",
  "openai",
  "openclaw",
  "openrouter",
  "opper",
  "orcarouter",
  "ovhcloud",
  "perplexity",
  "phind",
  "picoclaw",
  "pioneer",
  "poe",
  "pollinations",
  "poolside",
  "publicai",
  "qwen",
  "recraft",
  "replicate",
  "requesty",
  "roocode",
  "runway",
  "sambanova",
  "searchapi",
  "sensenova",
  "snowflake",
  "sparkdesk",
  "stepfun",
  "sumopod",
  "suno",
  "t3-web",
  "tavily",
  "tencent",
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
  "x5lab",
  "xai",
  "xinference",
  "yi",
  "yuanbao-web",
  "zed-hosted",
  "zenmux",
  "zenmux-free",
  "zhipu",
]);

const LOCAL_SVG_ALIASES: Record<string, string> = {
  "cursor-api": "cursor",
  "qwen-cloud": "qwencloud",
  "qwen-cloud-token-plan": "qwencloud",
};

// These provider IDs remain fully available, but their former bundled logos are not shipped
// until source, license, and trademark provenance can be demonstrated. Keep this guard before
// every local/npm/CDN logo tier: silently fetching a similarly named third-party image would
// replace one unverified provenance path with another.
const GENERIC_PROVIDER_IDS = new Set([
  "api-airforce",
  "apikey",
  "bazaarlink",
  "brave-search",
  "brave",
  "byteplus",
  "cartesia",
  "cheaperinference",
  "chipotle",
  "clarifai",
  "command-code",
  "digitalocean",
  "docker-model-runner",
  "droid",
  "duckduckgo-web",
  "freebuff",
  "gitlab-duo",
  "gitlab",
  "haiper",
  "ideogram",
  "inworld",
  "kilo-gateway",
  "kilocode",
  "leonardo",
  "modal",
  "modelscope",
  "nimble-search",
  "nlpcloud",
  "oauth",
  "oci",
  "opencode",
  "openference",
  "playht",
  "qianfan",
  "qiniu",
  "qwencloud",
  "sap",
  "scaleway",
  "searxng-search",
  "serper-search",
  "soniox",
  "synthetic",
  "unorouter",
  "wandb",
  "youcom-search",
  "adapta-web",
  "agentrouter",
  "aimlapi",
  "anthropic-m",
  "blackbox-web",
  "blackbox",
  "cliproxyapi",
  "dahl",
  "empower",
  "gigachat",
  "inner-ai",
  "ironclaw",
  "kie",
  "lemonade",
  "linkup-search",
  "llamafile",
  "llamagate",
  "logfare",
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
  "lmarena",
  "lma",
]);

const THEMED_SVGS: Record<string, { light: string; dark: string }> = {
  // Kimi (Moonshot AI) official-partnership logomarks (2026-07): the official
  // rounded-square badge in Kimi's brand blue (#1783FF — see KIMI_BRAND_COLOR in
  // featuredProviders.ts) for the 3 visible Kimi-family cards. This replaces two
  // weaker fallbacks: kimi-coding/kimi-web previously fell through to the
  // third-party LobeHub "Kimi" icon (Tier 4, KNOWN_SVGS has no "kimi-coding"/
  // "kimi-web" entry), and moonshot's `/providers/moonshot.svg` uses
  // `fill="currentColor"`, which never resolves against the page theme because
  // Tier 3 renders it inside a plain `<img>` (no CSS-inheritance path for an
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
  // Own-property guards: a providerId such as "constructor" or "__proto__" otherwise
  // resolves through Object.prototype, yielding a truthy-looking value that corrupts
  // downstream lookups instead of falling through to the unknown-provider path (#11853).
  const providerIdLower = providerId.toLowerCase();
  const normalizedId = Object.hasOwn(PROVIDER_ICON_ALIASES, providerIdLower)
    ? PROVIDER_ICON_ALIASES[providerIdLower]
    : providerIdLower;
  const localSvgId = Object.hasOwn(LOCAL_SVG_ALIASES, normalizedId)
    ? LOCAL_SVG_ALIASES[normalizedId]
    : normalizedId;
  const usesGenericIcon =
    GENERIC_PROVIDER_IDS.has(normalizedId) || GENERIC_PROVIDER_IDS.has(localSvgId);
  const themedSvg = Object.hasOwn(THEMED_SVGS, normalizedId)
    ? THEMED_SVGS[normalizedId]
    : undefined;
  const hasSvg = KNOWN_SVGS.has(localSvgId);

  const [failedAssets, setFailedAssets] = useState<Record<string, true>>({});
  const [remoteSrcFailed, setRemoteSrcFailed] = useState(false);
  const themedKey = `${normalizedId}:themed`;
  const svgKey = `${normalizedId}:svg`;
  const theSvgKey = `${normalizedId}:thesvg`;

  const trimmedSrc = typeof src === "string" ? src.trim() : "";
  const themedFailed = failedAssets[themedKey];
  const svgFailed = failedAssets[svgKey];
  const theSvgFailed = failedAssets[theSvgKey];

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

  // Provenance guard: an operator-supplied `src` may still win above, but the built-in
  // resolution chain for these IDs is deliberately local and generic. Do not retry LobeHub,
  // legacy assets, or thesvg.org for them.
  if (usesGenericIcon) {
    return (
      <span
        className={className}
        style={{ display: "inline-flex", alignItems: "center", ...style }}
      >
        <GenericProviderIcon size={size} />
      </span>
    );
  }

  const lobeIcon = getLobeProviderIcon(normalizedId, type);

  // Tier 2: Theme-aware local SVGs
  if (themedSvg && !themedFailed) {
    const themedSrc = isDark ? themedSvg.dark : themedSvg.light;
    return (
      <span
        className={className}
        style={{ display: "inline-flex", alignItems: "center", ...style }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- themed local SVG asset; see the Tier 3 comment for why these use a plain <img> */}
        <img
          src={themedSrc}
          alt={providerId}
          width={size}
          height={size}
          style={{
            objectFit: "contain",
            flex: "none",
            width: size,
            height: size,
          }}
          onError={() => setFailedAssets((current) => ({ ...current, [themedKey]: true }))}
        />
      </span>
    );
  }

  // Tier 3: Local SVG — fastest, cached separately from the JS bundle.
  // Rendered as a plain <img> (not next/image): provider SVGs carry their own
  // intrinsic aspect ratio (some wordmarks are much wider than tall), and next/image's
  // dev-mode check warns whenever the layout size differs from the square
  // width/height attributes — a false positive for non-square logos rendered
  // at fixed icon sizes. Explicit CSS dimensions keep the flex item from
  // collapsing to 0×0; object-fit preserves each logo's intrinsic ratio.
  if (hasSvg && !svgFailed) {
    return (
      <span
        className={className}
        style={{ display: "inline-flex", alignItems: "center", ...style }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- local static SVG asset, see comment above */}
        <img
          src={`/providers/${localSvgId}.svg`}
          alt={providerId}
          width={size}
          height={size}
          style={{
            objectFit: "contain",
            flex: "none",
            width: size,
            height: size,
          }}
          onError={() => setFailedAssets((current) => ({ ...current, [svgKey]: true }))}
        />
      </span>
    );
  }

  // Tier 4: LobeHub npm icons — only when no local SVG (or SVG failed to load)
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
