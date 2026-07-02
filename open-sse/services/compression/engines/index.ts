import { registerCompressionEngine, getCompressionEngine } from "./registry.ts";
import { aggressiveEngine, cavemanEngine, liteEngine, ultraEngine } from "./cavemanAdapter.ts";
import { rtkEngine } from "./rtk/index.ts";
import { sessionDedupEngine } from "./session-dedup/index.ts";
import { headroomEngine } from "./headroom/index.ts";
import { ccrEngine } from "./ccr/index.ts";
import { llmlinguaEngine } from "./llmlingua/index.ts";

let registered = false;

export function registerBuiltinCompressionEngines(): void {
  // The `registered` latch is a fast-path to skip the loop, but it must not block
  // re-registration after clearCompressionEngineRegistry() empties the map (tests do this).
  // Re-run when the registry was cleared so the builtins are restored.
  if (registered && getCompressionEngine(liteEngine.id)) return;
  registered = true;

  if (!getCompressionEngine(liteEngine.id)) registerCompressionEngine(liteEngine);

  const engines: Array<{ id: string; engine: typeof liteEngine }> = [
    { id: "caveman", engine: cavemanEngine },
    { id: "aggressive", engine: aggressiveEngine },
    { id: "ultra", engine: ultraEngine },
    { id: "rtk", engine: rtkEngine },
    { id: "session-dedup", engine: sessionDedupEngine },
    { id: "headroom", engine: headroomEngine },
    { id: "ccr", engine: ccrEngine },
    { id: "llmlingua", engine: llmlinguaEngine },
  ];

  for (const { id, engine } of engines) {
    if (!getCompressionEngine(id)) registerCompressionEngine(engine);
  }
}
