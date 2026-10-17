import fs from "node:fs";
import path from "node:path";

// Native image fixtures also exercise home-based credentials; isolate them before imports.
const workspace = path.resolve(".ci-work");
const keys = ["DATA_DIR", "HOME", "USERPROFILE", "APPDATA", "LOCALAPPDATA"];
const alreadyIsolated = keys.every((key) => {
  const value = process.env[key];
  if (!value) return false;
  const relative = path.relative(workspace, path.resolve(value));
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
});

if (!alreadyIsolated) {
  fs.mkdirSync(workspace, { recursive: true });
  const root = fs.mkdtempSync(path.join(workspace, "isolated-native-image-"));
  const home = path.join(root, "isolated-home");
  const directories = {
    DATA_DIR: path.join(root, "isolated-data"),
    HOME: home,
    USERPROFILE: home,
    APPDATA: path.join(home, "AppData", "Roaming"),
    LOCALAPPDATA: path.join(home, "AppData", "Local"),
    XDG_CONFIG_HOME: path.join(home, ".config"),
    XDG_CACHE_HOME: path.join(home, ".cache"),
    OMNIROUTE_PLUGINS_DIR: path.join(root, "plugins"),
  };
  for (const [key, value] of Object.entries(directories)) {
    fs.mkdirSync(value, { recursive: true });
    process.env[key] = value;
  }
  process.on("exit", () => {
    try {
      fs.rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {
      // Preserve locked diagnostic state rather than interrupting the test result.
    }
  });
}
