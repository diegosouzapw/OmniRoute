// Regression guard for #13535: the Windows CLI system tray icon must contain a dark
// outline/stroke so it stays visible against the light-theme taskbar/hidden-icons
// background. Windows' NotifyIcon paints bitmap pixel colors literally — unlike macOS
// there is no "template image" auto-tinting — so a pure-white glyph with no outline is
// effectively invisible there. See bin/cli/tray/tray.ts::getIconPath() (prefers icon.ico
// on win32, falling back to icon.png) and electron/main.js (darwin-only setTemplateImage).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const repoRoot = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const ICON_PNG_PATH = join(repoRoot, "bin", "cli", "tray", "icon.png");
const ICON_ICO_PATH = join(repoRoot, "bin", "cli", "tray", "icon.ico");
const ELECTRON_TRAY_ICON_PATH = join(repoRoot, "electron", "assets", "tray-icon.png");

// Windows 11 Fluent "hidden icons" overflow flyout / light-theme taskbar background.
const LIGHT_BG = { r: 243, g: 243, b: 243 };
// A representative dark-theme taskbar background.
const DARK_BG = { r: 32, g: 32, b: 32 };

function relativeLuminance({ r, g, b }: { r: number; g: number; b: number }): number {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const [rl, gl, bl] = [lin(r), lin(g), lin(b)];
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

function contrastRatio(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number }
): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [lighter, darker] = la >= lb ? [la, lb] : [lb, la];
  return (lighter + 0.05) / (darker + 0.05);
}

async function assertHasVisibleContrastAgainstBothThemes(iconPath: string, label: string) {
  const raw = readFileSync(iconPath);
  const { data, info } = await sharp(raw).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.equal(info.channels, 4, `expected RGBA after ensureAlpha() for ${label}`);

  let opaqueCount = 0;
  let nonWhiteOpaqueCount = 0;
  let bestContrastOnLight = 0;
  let bestContrastOnDark = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 128) continue;
    opaqueCount++;
    if (!(r === 255 && g === 255 && b === 255)) nonWhiteOpaqueCount++;
    const ratioLight = contrastRatio({ r, g, b }, LIGHT_BG);
    if (ratioLight > bestContrastOnLight) bestContrastOnLight = ratioLight;
    const ratioDark = contrastRatio({ r, g, b }, DARK_BG);
    if (ratioDark > bestContrastOnDark) bestContrastOnDark = ratioDark;
  }

  assert.ok(opaqueCount > 0, `${label} has no opaque pixels at all — nothing would render`);
  assert.ok(
    nonWhiteOpaqueCount > 0,
    `${label}'s glyph is pure-white-only (0 non-white opaque pixels out of ${opaqueCount}) — ` +
      `no outline/stroke exists to provide contrast on a light background (bug #13535)`
  );
  assert.ok(
    bestContrastOnLight >= 3,
    `${label}'s best pixel contrast against the Windows light tray background (#F3F3F3) is only ` +
      `${bestContrastOnLight.toFixed(3)}:1, below the WCAG 3:1 UI-component minimum (bug #13535)`
  );
  assert.ok(
    bestContrastOnDark >= 3,
    `${label}'s best pixel contrast against a dark tray background (#202020) is only ` +
      `${bestContrastOnDark.toFixed(3)}:1, below the WCAG 3:1 UI-component minimum (bug #13535)`
  );
}

test("icon.ico now ships next to icon.png so the win32 tray path uses the native .ico asset", () => {
  assert.ok(existsSync(ICON_PNG_PATH), `expected ${ICON_PNG_PATH} to exist`);
  assert.equal(
    existsSync(ICON_ICO_PATH),
    true,
    "icon.ico is missing from bin/cli/tray/ — tray.ts::getIconPath() prefers it on win32 " +
      "but silently falls back to icon.png when absent (bug #13535)"
  );
});

test("bin/cli/tray/icon.png has a dark outline visible on both light and dark Windows tray backgrounds", async () => {
  await assertHasVisibleContrastAgainstBothThemes(ICON_PNG_PATH, "bin/cli/tray/icon.png");
});

test("electron/assets/tray-icon.png has a dark outline visible on both light and dark tray backgrounds (Windows/Linux Electron tray, no template-image auto-tint)", async () => {
  await assertHasVisibleContrastAgainstBothThemes(
    ELECTRON_TRAY_ICON_PATH,
    "electron/assets/tray-icon.png"
  );
});
