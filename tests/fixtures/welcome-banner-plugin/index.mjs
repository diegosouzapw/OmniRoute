/**
 * Welcome Banner Plugin — PoC
 *
 * Injects a welcome banner into every response to prove the plugin
 * pipeline works end-to-end.
 */

export const plugin = {
  name: "welcome-banner",
  priority: 200,

  async onResponse(ctx, response) {
    if (response && typeof response === "object") {
      const banner = "[Welcome to OmniRoute — powered by welcome-banner plugin]";
      if (response.choices && Array.isArray(response.choices)) {
        for (const choice of response.choices) {
          if (choice.message && typeof choice.message.content === "string") {
            choice.message.content = `${banner}\n${choice.message.content}`;
          }
          if (choice.delta && typeof choice.delta.content === "string") {
            choice.delta.content = `${banner}\n${choice.delta.content}`;
          }
        }
      }
    }
    return response;
  },
};
