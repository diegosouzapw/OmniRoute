import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const TUI_COMPONENTS = join(ROOT, "bin", "cli", "tui-components");
const TUI = join(ROOT, "bin", "cli", "tui");

function hasExport(file: string, name: string): boolean {
  const src = readFileSync(file, "utf8");
  return (
    src.includes(`export function ${name}`) ||
    src.includes(`export async function ${name}`) ||
    src.includes(`export { ${name}`)
  );
}

const COMPONENTS = [
  { file: "DataTable.jsx", export: "DataTable" },
  { file: "MenuSelect.jsx", export: "MenuSelect" },
  { file: "ProgressBar.jsx", export: "ProgressBar" },
  { file: "StatusBadge.jsx", export: "StatusBadge" },
  { file: "TokenCounter.jsx", export: "TokenCounter" },
  { file: "KeyMaskedDisplay.jsx", export: "KeyMaskedDisplay" },
  { file: "Sparkline.jsx", export: "Sparkline" },
  { file: "HeaderSwr.jsx", export: "HeaderSwr" },
  { file: "ConfirmDialog.jsx", export: "ConfirmDialog" },
  { file: "MultilineInput.jsx", export: "MultilineInput" },
  { file: "MarkdownView.jsx", export: "MarkdownView" },
  { file: "CodeBlock.jsx", export: "CodeBlock" },
];

for (const { file, export: exp } of COMPONENTS) {
  test(`tui-components/${file} existe e exporta ${exp}`, () => {
    const path = join(TUI_COMPONENTS, file);
    assert.ok(existsSync(path), `${file} deve existir`);
    assert.ok(hasExport(path, exp), `${file} deve exportar ${exp}`);
  });
}

test("tui-components/theme.jsx exporta objeto theme", async () => {
  const { theme } = await import("../../bin/cli/tui-components/theme.jsx");
  assert.ok(theme && typeof theme === "object");
  assert.ok(typeof theme.primary === "string");
  assert.ok(typeof theme.success === "string");
  assert.ok(typeof theme.error === "string");
});

test("tui/Dashboard.jsx existe e exporta startInteractiveTui", () => {
  const path = join(TUI, "Dashboard.jsx");
  assert.ok(existsSync(path), "Dashboard.jsx deve existir");
  assert.ok(hasExport(path, "startInteractiveTui"), "deve exportar startInteractiveTui");
});

test("tui/InterfaceMenu.jsx existe e exporta showInterfaceMenu", () => {
  const path = join(TUI, "InterfaceMenu.jsx");
  assert.ok(existsSync(path), "InterfaceMenu.jsx deve existir");
  assert.ok(hasExport(path, "showInterfaceMenu"), "deve exportar showInterfaceMenu");
});

test("tui/tabs/ tem as 7 tabs esperadas", () => {
  const tabs = ["Overview", "Combos", "Providers", "Keys", "Logs", "Health", "Cost"];
  for (const tab of tabs) {
    const path = join(TUI, "tabs", `${tab}.jsx`);
    assert.ok(existsSync(path), `tabs/${tab}.jsx deve existir`);
  }
});

test("commands/dashboard.mjs registra --tui flag", async () => {
  const { registerDashboard } = await import("../../bin/cli/commands/dashboard.mjs");
  const { Command } = await import("commander");
  const prog = new Command().exitOverride();
  registerDashboard(prog);
  const dashCmd = prog.commands.find((c) => c.name() === "dashboard");
  assert.ok(dashCmd, "dashboard command deve existir");
  const tuiOpt = dashCmd?.options.find((o) => o.long === "--tui");
  assert.ok(tuiOpt, "--tui option deve estar registrada");
});
