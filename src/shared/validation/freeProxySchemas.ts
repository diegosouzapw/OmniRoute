import { z } from "zod";

export const freeProxySourceSchema = z.enum(["1proxy", "proxifly", "iplocate"]);

export const freeProxyListSchema = z.object({
  sources: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",").filter(Boolean) : undefined))
    .pipe(z.array(freeProxySourceSchema).optional()),
  protocol: z.enum(["http", "https", "socks4", "socks5"]).optional(),
  country: z.string().max(2).optional().transform((v) => v?.toUpperCase()),
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

export const vercelDeploySchema = z.object({
  token: z.string().min(1),
  projectName: z
    .string()
    .min(3)
    .max(52)
    .regex(/^[a-z0-9-]+$/, "Project name must be lowercase alphanumeric with hyphens")
    .default("omniroute-relay"),
});
