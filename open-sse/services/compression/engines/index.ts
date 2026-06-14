import { registerCompressionEngine, getCompressionEngine } from "./registry.ts";
import { aggressiveEngine, cavemanEngine, liteEngine, ultraEngine } from "./cavemanAdapter.ts";
import { rtkEngine } from "./rtk/index.ts";
import { sessionDedupEngine } from "./session-dedup/index.ts";
import { headroomEngine } from "./headroom/index.ts";
import { ccrEngine } from "./ccr/index.ts";

let registered = false;

export function registerBuiltinCompressionEngines(): void {
  if (registered) return;
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
  ];

  for (const { id, engine } of engines) {
    if (!getCompressionEngine(id)) registerCompressionEngine(engine);
  }
}
