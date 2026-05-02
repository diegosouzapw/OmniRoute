import { registerCompressionEngine, getCompressionEngine } from "./registry.ts";
import { aggressiveEngine, cavemanEngine, liteEngine, ultraEngine } from "./cavemanAdapter.ts";
import { rtkEngine } from "./rtk/index.ts";

let registered = false;

export function registerBuiltinCompressionEngines(): void {
  if (registered) return;
  for (const engine of [liteEngine, cavemanEngine, aggressiveEngine, ultraEngine, rtkEngine]) {
    if (!getCompressionEngine(engine.id)) registerCompressionEngine(engine);
  }
  registered = true;
}
