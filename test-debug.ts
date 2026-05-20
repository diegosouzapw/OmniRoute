import { validateProviderApiKey } from "./src/lib/providers/validation.ts";

globalThis.fetch = async () =>
  new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "content-type": "application/json" },
  });

validateProviderApiKey({
  provider: "bailian-coding-plan",
  apiKey: "invalid-key",
  providerSpecificData: {
    baseUrl: "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
  },
})
  .then((res) => {
    console.log("Result:", res);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
