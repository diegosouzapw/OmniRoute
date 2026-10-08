/**
 * Marks OmniRoute's OWN local model-cooldown 429 (open-sse/utils/error.ts
 * modelCooldownResponse). Its body is shaped exactly like CLIProxyAPI's upstream
 * `model_cooldown` 429, which #14190 classifies as quota exhaustion, so only this
 * header tells a combo that the cooldown is local and transient (#1731).
 */
export const LOCAL_MODEL_COOLDOWN_HEADER = "X-OmniRoute-Local-Cooldown";
