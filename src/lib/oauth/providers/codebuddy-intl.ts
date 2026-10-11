import { CODEBUDDY_INTL_CONFIG } from "../constants/oauth";
import {
  requestDeviceCode,
  pollToken,
  mapTokens,
  type CodeBuddyDeviceCodeConfig,
} from "./codebuddyDeviceAuth";

/**
 * CodeBuddy International (codebuddy.ai) — custom device-auth flow.
 */
export const codebuddyIntl = {
  config: CODEBUDDY_INTL_CONFIG,
  flowType: "device_code" as const,
  requestDeviceCode: (config: CodeBuddyDeviceCodeConfig = CODEBUDDY_INTL_CONFIG) =>
    requestDeviceCode(config),
  pollToken: (config: CodeBuddyDeviceCodeConfig = CODEBUDDY_INTL_CONFIG, deviceCode: string) =>
    pollToken(config, deviceCode),
  mapTokens,
};

export default codebuddyIntl;
