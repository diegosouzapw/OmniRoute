// Repro probe for issue #6766: "Auto-update failed: Cannot find latest.yml in the
// latest release artifacts".
//
// electron-updater (used by electron/main.js via autoUpdater) fetches
// latest.yml / latest-mac.yml / latest-linux.yml from the GitHub Release assets
// to discover + verify the newest version. electron-builder generates those
// files alongside the installers in electron/dist-electron/, but the release
// workflow's "Collect installers" step only copies platform installer
// extensions (*.exe, *.dmg, *.AppImage, *.deb) into release-assets/ — never
// the *.yml manifests — so they never reach the GitHub Release, and
// electron-updater fails with exactly the reported error.
//
// This test statically inspects .github/workflows/electron-release.yml and
// proves the "Collect installers" step stages the yml manifests, and
// that the "Create Release" files: list references them too.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKFLOW_PATH = path.resolve(
  __dirname,
  "../../../.github/workflows/electron-release.yml"
);

function readWorkflow(): string {
  return fs.readFileSync(WORKFLOW_PATH, "utf8");
}

function extractStep(yaml: string, stepName: string): string {
  const stepHeaderRe = new RegExp(`- name: ${stepName}\\n([\\s\\S]*?)(?=\\n\\s{6}- name:|\\n  [a-zA-Z_-]+:\\n)`);
  const m = yaml.match(stepHeaderRe);
  assert.ok(m, `could not locate step "${stepName}" in ${WORKFLOW_PATH}`);
  return m![1];
}

test("electron-release.yml: 'Collect installers' step stages latest*.yml manifests for electron-updater", () => {
  const yaml = readWorkflow();
  const collectStep = extractStep(yaml, "Collect installers");

  // electron-builder writes latest.yml (win), latest-mac.yml, latest-linux.yml
  // next to the installers in electron/dist-electron/. Without staging them
  // into release-assets/, the GitHub Release never gets latest.yml and
  // electron-updater's autoUpdater fails with:
  //   "Cannot find latest.yml in the latest release artifacts"
  const stagesYmlManifests =
    /\*\.yml/.test(collectStep) || /latest.*\.yml/.test(collectStep);

  assert.ok(
    stagesYmlManifests,
    "BUG REPRODUCED: 'Collect installers' step does not copy *.yml (latest.yml / " +
      "latest-mac.yml / latest-linux.yml) from electron/dist-electron/ into " +
      "release-assets/, so electron-updater cannot find latest.yml in the " +
      "published GitHub Release (issue #6766).\n\nActual step body:\n" +
      collectStep
  );
});

test("electron-release.yml: 'Create Release' files: list publishes the *.yml update manifests", () => {
  const yaml = readWorkflow();
  const createReleaseIdx = yaml.indexOf("name: Create Release");
  assert.ok(createReleaseIdx !== -1, "could not locate 'Create Release' step");
  const filesBlockIdx = yaml.indexOf("files: |", createReleaseIdx);
  assert.ok(filesBlockIdx !== -1, "could not locate files: block in 'Create Release' step");
  const nextStepOrEnvIdx = yaml.indexOf("\n        env:", filesBlockIdx);
  const filesBlock = yaml.slice(filesBlockIdx, nextStepOrEnvIdx === -1 ? undefined : nextStepOrEnvIdx);

  assert.ok(
    /release-assets\/\*\.yml/.test(filesBlock),
    "BUG REPRODUCED: 'Create Release' files: glob list does not include " +
      "release-assets/*.yml, so even if the manifests were staged they would " +
      "not be attached to the GitHub Release (issue #6766).\n\nActual files: block:\n" +
      filesBlock
  );
});
