import { runPluginOnRequestHook } from "./pluginOnRequest.ts";

type PluginRequestGateInput = Parameters<typeof runPluginOnRequestHook>[0];

export async function runPluginRequestGate(input: PluginRequestGateInput) {
  const pluginGate = await runPluginOnRequestHook(input);
  if (pluginGate.blocked === true) {
    return {
      blocked: true as const,
      result: {
        success: false,
        status: 403,
        errorType: "plugin_block",
        errorCode: "plugin_block",
        error: "Request blocked by plugin",
        response: pluginGate.response,
      },
      body: input.body,
    };
  }
  return { blocked: false as const, result: null, body: pluginGate.body ?? input.body };
}
