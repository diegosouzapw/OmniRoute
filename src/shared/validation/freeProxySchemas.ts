import { z } from "zod";

export const freeProxySourceSchema = z.enum(["1proxy", "proxifly", "iplocate"]);

export const freeProxyListSchema = z.object({
  sources: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",").filter(Boolean) : undefined))
    .pipe(z.array(freeProxySourceSchema).optional()),
  protocol: z.enum(["http", "https", "socks4", "socks5"]).optional(),
  country: z
    .string()
    .max(2)
    .optional()
    .transform((v) => v?.toUpperCase()),
  minQuality: z.coerce.number().int().min(0).max(100).optional(),
  limit: z.coerce.number().int().min(1).max(1000).optional(),
  offset: z.coerce.number().int().min(0).optional(),
  onlyNotInPool: z
    .string()
    .optional()
    .transform((v) => v === "1" || v === "true"),
});

export const freeProxySyncSchema = z.object({
  sources: z.array(freeProxySourceSchema).optional(),
});

export const freeProxyBulkAddSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
});

export const denoDeploySchema = z.object({
  // Deno Deploy Organization Tokens are prefixed `ddo_` followed by an opaque
  // base-58/64-ish blob. Reject obviously-malformed inputs early so users get
  // clearer feedback than a Deno 401 (and so accidentally pasting an
  // OpenAI/Anthropic key is caught at the boundary).
  denoToken: z
    .string()
    .min(20, "Deno Deploy token looks too short")
    .max(200)
    .regex(
      /^[A-Za-z0-9_-]+$/,
      "Deno Deploy token must contain only alphanumeric, underscore, or hyphen"
    ),
  orgDomain: z
    .string()
    .min(3)
    .max(253)
    // org domain looks like "<slug>.deno.net" — accept any DNS-shaped host so
    // we don't have to chase Deno renames; the runtime fetch is the real gate.
    .regex(/^[a-z0-9.-]+$/i, "Organization domain must be a DNS-shaped hostname"),
  projectName: z
    .string()
    .min(3)
    .max(52)
    .regex(/^[a-z0-9-]+$/, "Project name must be lowercase alphanumeric with hyphens")
    .default("omniroute-deno-relay"),
});

export const vercelDeploySchema = z.object({
  // Vercel personal access tokens are not strictly versioned but follow a
  // base-64-ish alphanumeric format. Reject obviously-malformed inputs early
  // so users get clearer feedback than a Vercel 401 (and so accidentally
  // pasting an OpenAI/Anthropic key is caught at the boundary).
  token: z
    .string()
    .min(20, "Vercel token looks too short")
    .max(200)
    .regex(
      /^[A-Za-z0-9_-]+$/,
      "Vercel token must contain only alphanumeric, underscore, or hyphen"
    ),
  projectName: z
    .string()
    .min(3)
    .max(52)
    .regex(/^[a-z0-9-]+$/, "Project name must be lowercase alphanumeric with hyphens")
    .default("omniroute-relay"),
});

export const cloudflareDeploySchema = z.object({
  // Cloudflare Account ID is a 32-char lowercase hex string. Reject anything
  // obviously malformed so users get clearer feedback than a Cloudflare 401/404.
  accountId: z
    .string()
    .min(8, "Cloudflare Account ID looks too short")
    .max(64)
    .regex(
      /^[a-f0-9]+$/,
      "Cloudflare Account ID must be lowercase hex"
    ),
  // Cloudflare API tokens are opaque alphanumeric (40+ chars) — same alphabet
  // we accept for Vercel tokens; constrain length to catch paste accidents.
  apiToken: z
    .string()
    .min(20, "Cloudflare API token looks too short")
    .max(200)
    .regex(
      /^[A-Za-z0-9_-]+$/,
      "Cloudflare API token must contain only alphanumeric, underscore, or hyphen"
    ),
  projectName: z
    .string()
    .min(3)
    .max(52)
    .regex(/^[a-z0-9-]+$/, "Worker name must be lowercase alphanumeric with hyphens")
    .default("omniroute-relay"),
});

