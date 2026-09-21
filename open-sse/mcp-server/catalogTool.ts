import { z } from "zod";

import { logToolCall } from "./audit.ts";
import { getMcpModelsCatalog } from "./catalog.ts";
import { toSafeMcpErrorMessage } from "./errorMessage.ts";
import { listModelsCatalogInput } from "./schemas/listModelsCatalog.ts";
import type { TextToolResult } from "./toolResult.ts";

export async function handleListModelsCatalog(
  args: z.infer<typeof listModelsCatalogInput>
): Promise<TextToolResult> {
  const start = Date.now();
  try {
    const result = await getMcpModelsCatalog(args);
    await logToolCall(
      "omniroute_list_models_catalog",
      args,
      { mode: result.mode, returned: result.returned, total: result.total },
      Date.now() - start,
      true
    );
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (error) {
    const message = toSafeMcpErrorMessage(error);
    await logToolCall(
      "omniroute_list_models_catalog",
      args,
      null,
      Date.now() - start,
      false,
      message
    );
    return { content: [{ type: "text", text: `Error: ${message}` }], isError: true };
  }
}
