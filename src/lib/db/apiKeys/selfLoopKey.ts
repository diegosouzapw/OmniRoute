import { SYNTHETIC_SELF_LOOP_API_KEY_ID } from "@/shared/constants/apiKeyIdentities";
import { peekGeneratedSelfLoopSecret } from "@/shared/middleware/chatAdmissionIdentity";
import { timingSafeCompare } from "@/shared/utils/timingSafeCompare";

/**
 * The random per-process secret the vision/audio bridges send to OmniRoute's own /v1
 * routes when no env key is set (#13813). Without accepting it, those self-loops got
 * 401 on every REQUIRE_API_KEY instance without an env key. Validation never creates it.
 */
export function isSelfLoopBearer(key: string): boolean {
  const secret = peekGeneratedSelfLoopSecret();
  return secret !== null && timingSafeCompare(key, secret);
}

/**
 * Spread over the synthetic env-key metadata record. For the self-loop secret it limits
 * the record to the chat and audio routes, with a non-empty scope list so no scope
 * defaults apply; for any other key it changes nothing.
 */
export function selfLoopKeyOverrides(key: string) {
  if (!isSelfLoopBearer(key)) return {};
  return {
    id: SYNTHETIC_SELF_LOOP_API_KEY_ID,
    name: "Internal self-loop",
    scopes: ["internal:self-loop"],
    allowedEndpoints: ["chat", "audio"],
  };
}
