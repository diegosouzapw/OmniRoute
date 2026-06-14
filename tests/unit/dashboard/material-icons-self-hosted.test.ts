import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";

// Regression guard for #3695: the dashboard icons turned into their literal
// text names ("smart_toy", "visibility", ...) and the layout broke for users
// on networks where the Google Fonts CDN (fonts.googleapis.com / fonts.gstatic.com)
// is unreachable — e.g. mainland China. Root cause: the Material Symbols icon
// font (the sole source of the .material-symbols-outlined @font-face) was loaded
// only from that CDN in src/app/layout.tsx. The fix self-hosts the font via the
// `material-symbols` npm package imported in globals.css. These assertions fail
// on the pre-fix tree and stay green afterwards, preventing re-introduction of a
// runtime CDN dependency for icons.

const cwd = process.cwd();
const layoutPath = resolve(join(cwd, "src/app/layout.tsx"));
const globalsPath = resolve(join(cwd, "src/app/globals.css"));

test("layout.tsx does not load the Material Symbols icon font from the Google Fonts CDN", () => {
  const layout = readFileSync(layoutPath, "utf8");
  assert.ok(
    !/fonts\.googleapis\.com[^"'\s]*Material\+Symbols/i.test(layout),
    "layout.tsx must not load Material Symbols from fonts.googleapis.com (blocked in some regions)"
  );
  assert.ok(
    !/fonts\.gstatic\.com/.test(layout),
    "layout.tsx must not preconnect to the Google Fonts CDN for the icon font"
  );
});

test("globals.css imports the self-hosted Material Symbols font", () => {
  const globals = readFileSync(globalsPath, "utf8");
  assert.match(
    globals,
    /@import\s+["']material-symbols\/outlined\.css["']/,
    "globals.css must @import the self-hosted material-symbols/outlined.css"
  );
});

test("the self-hosted material-symbols package is declared and resolvable", () => {
  const pkg = JSON.parse(readFileSync(resolve(join(cwd, "package.json")), "utf8")) as {
    dependencies?: Record<string, string>;
  };
  assert.ok(
    pkg.dependencies?.["material-symbols"],
    "package.json must declare the material-symbols dependency"
  );
  // The bundled CSS that supplies the @font-face + woff2 must exist on disk so the
  // build can inline it (only enforced when node_modules is installed).
  const cssPath = resolve(join(cwd, "node_modules/material-symbols/outlined.css"));
  if (existsSync(resolve(join(cwd, "node_modules/material-symbols")))) {
    assert.ok(
      existsSync(cssPath),
      "material-symbols/outlined.css must exist in the installed package"
    );
  }
});
