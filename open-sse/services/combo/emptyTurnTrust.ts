import { hasTrustedEmptyTurn } from "../../utils/emptyTurnPolicy.ts";

/** Read after consumption: a translated stop alone is not native termination. */
export async function isTrustedEmptyTurn(
  _provider: string | null,
  response: Response,
  _fallbackConnectionId?: string | null
): Promise<() => boolean> {
  return () => hasTrustedEmptyTurn(response);
}
