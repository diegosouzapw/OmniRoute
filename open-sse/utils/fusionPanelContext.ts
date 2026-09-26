/**
 * Marks the async context of a fusion panel call. A panel reply only feeds the judge and never
 * reaches the client, and panel calls may keep running after the judge has answered, so work
 * that must describe the client-visible reply (agent session turns) skips panel calls.
 */
import { AsyncLocalStorage } from "node:async_hooks";

const panelCallContext = new AsyncLocalStorage<true>();

export function runFusionPanelCall<T>(fn: () => T): T {
  return panelCallContext.run(true, fn);
}

export function isFusionPanelCall(): boolean {
  return panelCallContext.getStore() === true;
}
