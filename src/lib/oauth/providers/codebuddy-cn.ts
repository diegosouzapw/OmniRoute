import { CODEBUDDY_CN_CONFIG } from "../constants/oauth";
import {
  requestDeviceCode,
  pollToken,
  mapTokens,
  type CodeBuddyDeviceCodeConfig,
} from "./codebuddyDeviceAuth";

/**
 * CodeBuddy CN (Tencent — copilot.tencent.com) — custom device-auth flow.
 */
export const codebuddyCn = {
  config: CODEBUDDY_CN_CONFIG,
  flowType: "device_code" as const,
  requestDeviceCode: (config: CodeBuddyDeviceCodeConfig = CODEBUDDY_CN_CONFIG) =>
    requestDeviceCode(config),
  pollToken: (config: CodeBuddyDeviceCodeConfig = CODEBUDDY_CN_CONFIG, deviceCode: string) =>
    pollToken(config, deviceCode),
  mapTokens,
};

export default codebuddyCn;
