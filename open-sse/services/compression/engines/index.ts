import { registerCompressionEngine, getCompressionEngine } from "./registry.ts";
import { aggressiveEngine, cavemanEngine, liteEngine, ultraEngine } from "./cavemanAdapter.ts";
import { rtkEngine } from "./rtk/index.ts";

let registered = false;

export function registerBuiltinCompressionEngines(): void {
  const engines = [liteEngine, cavemanEngine, aggressiveEngine, ultraEngine, rtkEngine];
  if (registered && engines.every((engine) => getCompressionEngine(engine.id))) return;
  for (const engine of engines) {
    if (!getCompressionEngine(engine.id)) registerCompressionEngine(engine);
  }
  registered = true;
}
