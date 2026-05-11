import { z } from "zod";

export const oneproxyFilterSchema = z.object({
  protocol: z.enum(["http", "https", "socks4", "socks5"]).optional(),
  countryCode: z.string().max(2).optional(),
  minQuality: z.coerce.number().int().min(0).max(100).optional(),
  maxProxies: z.coerce.number().int().min(1).max(1000).optional(),
});

export const oneproxySyncSchema = z.object({}).strict();

export const oneproxyRotateSchema = z.object({
  strategy: z.enum(["random", "quality", "sequential"]).optional(),
});
