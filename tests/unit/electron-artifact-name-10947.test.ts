// #10947 — Windows in-app auto-update 404s because the installer name in
// `latest.yml` never matches the asset GitHub actually stores.
//
// GitHub rewrites spaces in an uploaded asset name to `.`, while
// electron-builder writes that same artifact name into `latest.yml` with `-`.
// Any target whose name contains a space therefore ships a manifest pointing at
// a file that does not exist. Measured on the published v3.8.49 release:
//
//   latest.yml       url: OmniRoute-Setup-3.8.49.exe
//   uploaded asset        OmniRoute.Setup.3.8.49.exe   (identical size, 340441395)
//
//   latest-linux.yml url: OmniRoute-3.8.49.AppImage  -> asset matches verbatim
//   latest-mac.yml   url: OmniRoute-3.8.49.dmg       -> asset matches verbatim
//
// Only Windows breaks, because NSIS carries the one default artifact name that
// contains spaces (`${productName} Setup ${version}.${ext}`); the AppImage, dmg
// and deb defaults are already hyphen/underscore separated.
//
// The name is pinned to the DOT form rather than a hyphen one so the asset that
// gets published keeps the exact name it has today — the dashboard's manual
// "Download EXE" link and the docs both hardcode `OmniRoute.Setup.<v>.exe`, and
// a hyphen rename would break the very workaround the issue reports as working.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const electronManifest = JSON.parse(
  fs.readFileSync(path.join(repoRoot, "electron", "package.json"), "utf8")
) as { build: Record<string, { artifactName?: string; productName?: string } | undefined> };
const buildConfig = electronManifest.build;

/** Expand an electron-builder artifact-name template the way the packager does. */
function expandArtifactName(template: string, version: string, ext: string): string {
  return template
    .replace(/\$\{productName\}/g, String(buildConfig.productName ?? ""))
    .replace(/\$\{version\}/g, version)
    .replace(/\$\{ext\}/g, ext);
}

test("#10947 the NSIS installer name is set explicitly and carries no space", () => {
  const artifactName = buildConfig.nsis?.artifactName;
  assert.ok(
    artifactName,
    "nsis.artifactName must be set: the electron-builder default is " +
      "`${productName} Setup ${version}.${ext}`, whose spaces GitHub rewrites to " +
      "`.` on upload while latest.yml keeps `-` — the updater then 404s (#10947)"
  );
  assert.ok(
    !/\s/.test(artifactName),
    `nsis.artifactName must not contain whitespace, got ${JSON.stringify(artifactName)}`
  );
});

test("#10947 the NSIS name still contains 'Setup'", () => {
  // The release workflow picks the portable exe by skipping the installer with
  // `case "$file" in *Setup*) continue ;;`, so renaming it away from "Setup"
  // would silently publish the installer as OmniRoute.exe.
  assert.match(String(buildConfig.nsis?.artifactName), /Setup/);
});

test("#10947 the built installer name is the one the dashboard links to", () => {
  // Two independent sources of truth for the same filename; they must agree, or
  // the manual download link 404s the way the updater does today.
  const homePage = fs.readFileSync(
    path.join(repoRoot, "src", "app", "(dashboard)", "dashboard", "HomePageClient.tsx"),
    "utf8"
  );
  const linked = homePage.match(/releases\/download\/v\$\{cleanLatest\}\/(\S+?\.exe)`/)?.[1];
  assert.ok(linked, "dashboard must still build a Windows .exe download URL");

  const version = "9.9.9";
  const built = expandArtifactName(String(buildConfig.nsis?.artifactName), version, "exe");
  const linkedForVersion = linked.replace(/\$\{cleanLatest\}/g, version);
  assert.equal(built, linkedForVersion);
});

test("#10947 no configured artifact name anywhere contains whitespace", () => {
  for (const [target, config] of Object.entries(buildConfig)) {
    const artifactName = config?.artifactName;
    if (typeof artifactName !== "string") continue;
    assert.ok(
      !/\s/.test(artifactName),
      `${target}.artifactName must not contain whitespace, got ${JSON.stringify(artifactName)}`
    );
  }
});
