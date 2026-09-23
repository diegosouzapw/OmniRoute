import { z } from "zod";

import {
  MUSE_SUBSCRIPTION_BASE_URL,
  mintMuseSubscriptionKey,
  pollMuseDeviceToken,
  requestMuseDeviceCode,
} from "@omniroute/open-sse/services/museCodeSubscription.ts";
import { MUSE_CODE_SUBSCRIPTION_CONFIG } from "../constants/oauth";

const opaqueTokenSchema = z.string().trim().min(1).max(8192).regex(/^[^\s\x00-\x1f\x7f]+$/);
const clientSchema = z.object({ clientId: opaqueTokenSchema });
const tokenSchema = z.object({ access_token: opaqueTokenSchema });
const grantSchema = z.object({
  accessToken: opaqueTokenSchema,
  tokenType: z.literal("Bearer"),
  email: z.string().max(320).optional(),
  providerSpecificData: z.object({
    credentialSource: z.literal("muse-code-device-login"),
    isSubscriptionActive: z.literal(true),
    baseUrl: z.literal(MUSE_SUBSCRIPTION_BASE_URL),
    subscriptionTier: z.string().max(128).optional(),
    subscriptionTierId: z.string().max(128).optional(),
  }),
});

export const museCodeSubscription = {
  config: MUSE_CODE_SUBSCRIPTION_CONFIG,
  flowType: "device_code",
  requestDeviceCode: (config: unknown) => {
    const parsed = clientSchema.safeParse(config);
    if (!parsed.success) throw new Error("Invalid Muse Code OAuth configuration.");
    return requestMuseDeviceCode(parsed.data.clientId);
  },
  pollToken: (config: unknown, deviceCode: unknown) => {
    const client = clientSchema.safeParse(config);
    const code = opaqueTokenSchema.safeParse(deviceCode);
    if (!client.success || !code.success) throw new Error("Invalid Muse Code device login.");
    return pollMuseDeviceToken(client.data.clientId, code.data);
  },
  postExchange: (tokens: unknown) => {
    const parsed = tokenSchema.safeParse(tokens);
    if (!parsed.success) throw new Error("Muse Code login did not produce a session token.");
    return mintMuseSubscriptionKey(parsed.data.access_token);
  },
  mapTokens: (_tokens: unknown, grant: unknown) => {
    // Whitelist fields entering the existing encrypted credential store. Never
    // persist the DCA/session token, a guessed refresh token, or the DCA TTL.
    const parsed = grantSchema.safeParse(grant);
    if (!parsed.success) throw new Error("Muse Code login did not produce a subscription key.");
    return parsed.data;
  },
};
