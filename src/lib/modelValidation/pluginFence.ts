import { listPlugins } from "../db/plugins";
import { getActiveEvents } from "../plugins/hooks";
import { ModelValidationError } from "./http";

/** A violation remains latched even if an outer chat/plugin catch handles the thrown error. */
export function createValidationPluginFence() {
  let violated = false;
  const reject = (): never => {
    violated = true;
    throw new ModelValidationError(
      422,
      "VALIDATION_PLUGINS_UNSUPPORTED",
      "Strict model validation is unavailable while runtime plugins are active"
    );
  };
  return {
    reject,
    assertIdle() {
      if (violated || listPlugins("active").length || getActiveEvents().length) reject();
    },
  };
}
