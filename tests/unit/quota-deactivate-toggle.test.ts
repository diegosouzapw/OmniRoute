/**
 * Quota overview gains a per-account deactivate/activate toggle, so an operator
 * can park an account that is still being routed to despite low quota. The
 * toggle reuses PUT /api/providers/[id] with { isActive } and dims the card when
 * the account is inactive. Validated by asserting the wiring in the component
 * sources (same lightweight approach as quota-token-expiry-display.test.ts).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const base = "src/app/(dashboard)/dashboard/usage/components/ProviderLimits";
const read = (rel: string) => fs.readFileSync(path.join(repoRoot, base, rel), "utf8");

const header = read("parts/QuotaCardHeader.tsx");
const card = read("QuotaCard.tsx");
const grid = read("QuotaCardGrid.tsx");
const index = read("index.tsx");

test("QuotaCardHeader renders a toggle that flips the current active state", () => {
  assert.match(header, /onToggleActive:\s*\(nextActive: boolean\)\s*=>\s*void/);
  assert.match(header, /const isActive = connection\.isActive \?\? true/);
  assert.match(header, /onToggleActive\(!isActive\)/, "click must flip the current state");
  assert.match(header, /toggle_on/, "active state icon");
  assert.match(header, /toggle_off/, "inactive state icon");
  assert.match(header, /disabled=\{togglingActive\}/, "disabled while the PUT is in flight");
  assert.doesNotMatch(header, /onOpenCutoff/, "cutoff control lives in the expanded footer");
  assert.doesNotMatch(header, /onRefresh/, "refresh control lives in the expanded footer");
  assert.doesNotMatch(header, />\s*tune\s*</, "top action rail should not render tune");
  assert.doesNotMatch(header, />\s*refresh\s*</, "top action rail should not render refresh");
});

test("QuotaCard dims the card and threads the toggle props through", () => {
  assert.match(card, /const isActive = connection\.isActive \?\? true/);
  assert.match(card, /opacity-60/, "inactive accounts are visually dimmed");
  assert.match(card, /onToggleActive=\{onToggleActive\}/);
  assert.match(card, /togglingActive=\{togglingActive\}/);
});

test("QuotaCardGrid forwards the per-connection toggle handler and busy id", () => {
  assert.match(grid, /onToggleActive:\s*\(id: string, nextActive: boolean\)\s*=>\s*void/);
  assert.match(
    grid,
    /onToggleActive=\{\(nextActive\)\s*=>\s*onToggleActive\(conn\.id, nextActive\)\}/
  );
  assert.match(grid, /togglingActive=\{togglingActiveId === conn\.id\}/);
});

test("index handleToggleActive PUTs isActive, updates state and notifies", () => {
  assert.match(index, /const handleToggleActive = useCallback\(/);
  assert.match(
    index,
    /fetch\(`\/api\/providers\/\$\{connectionId\}`,\s*\{[\s\S]*method:\s*"PUT"[\s\S]*isActive: nextActive/,
    "must PUT { isActive } to the per-connection route"
  );
  assert.match(
    index,
    /c\.id === connectionId \? \{ \.\.\.c, isActive: nextActive \} : c/,
    "must optimistically update local connection state"
  );
  assert.match(
    index,
    /onToggleActive=\{handleToggleActive\}/,
    "must wire the handler into the grid"
  );
  assert.match(index, /togglingActiveId=\{togglingActiveId\}/);
});

test("toggle i18n keys exist in en and pt-BR", () => {
  for (const locale of ["en", "pt-BR"]) {
    const msgs = JSON.parse(
      fs.readFileSync(path.join(repoRoot, `src/i18n/messages/${locale}.json`), "utf8")
    );
    for (const key of [
      "deactivateAccount",
      "activateAccount",
      "accountActivated",
      "accountDeactivated",
      "toggleActiveFailed",
    ]) {
      assert.ok(msgs.usage?.[key], `${locale}: usage.${key} must exist`);
    }
  }
});
