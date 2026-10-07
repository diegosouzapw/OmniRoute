import "../../_setup/isolateDataDir.ts";
import path from "node:path";

process.env.OMNIROUTE_PLUGINS_DIR = path.join(process.env.DATA_DIR!, "validation-test-plugins");
process.env.LOG_LEVEL = "error";
// These tests may only cross the registered fake-executor boundary.
globalThis.fetch = async () => {
  throw new Error("Network forbidden in model validation tests");
};
