/**
 * #8688 — GitLab Duo OAuth setup must be visible *before* the authorize error step.
 *
 * Previously Add Connection auto-started OAuth and the only copy of the registration
 * recipe lived in the red error body. The setup step + shared message keep that
 * recipe actionable up front; authorize still returns the same string as fallback.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  GITLAB_DUO_OAUTH_APPLICATIONS_URL,
  GITLAB_DUO_OAUTH_DEFAULT_REDIRECT_URI,
  GITLAB_DUO_OAUTH_SCOPES,
  GITLAB_DUO_OAUTH_SETUP_MESSAGE,
} from "../../src/shared/constants/gitlabDuoSetupMessage";
import { OAUTH_PROVIDERS } from "../../src/shared/constants/providers/oauth";

const here = dirname(fileURLToPath(import.meta.url));
const read = (rel: string) => readFileSync(resolve(here, rel), "utf8");

test("#8688 setup message embeds registration URL, redirect, scopes, and env vars", () => {
  assert.match(GITLAB_DUO_OAUTH_SETUP_MESSAGE, /GitLab Duo OAuth is not configured/);
  assert.equal(GITLAB_DUO_OAUTH_APPLICATIONS_URL, "https://gitlab.com/-/profile/applications");
  assert.ok(GITLAB_DUO_OAUTH_SETUP_MESSAGE.includes(GITLAB_DUO_OAUTH_APPLICATIONS_URL));
  assert.ok(GITLAB_DUO_OAUTH_SETUP_MESSAGE.includes(GITLAB_DUO_OAUTH_DEFAULT_REDIRECT_URI));
  assert.ok(GITLAB_DUO_OAUTH_SETUP_MESSAGE.includes(`"${GITLAB_DUO_OAUTH_SCOPES}"`));
  assert.match(GITLAB_DUO_OAUTH_SETUP_MESSAGE, /GITLAB_DUO_OAUTH_CLIENT_ID/);
  assert.match(GITLAB_DUO_OAUTH_SETUP_MESSAGE, /GITLAB_DUO_OAUTH_CLIENT_SECRET/);
});

test("#8688 catalog authHint shares the authorize / modal setup message", () => {
  assert.equal(
    OAUTH_PROVIDERS["gitlab-duo"].authHint,
    GITLAB_DUO_OAUTH_SETUP_MESSAGE,
    "authHint must stay byte-identical to GITLAB_DUO_OAUTH_SETUP_MESSAGE"
  );
});

test("#8688 authorize route returns the shared setup message on missing client_id", () => {
  const route = read("../../src/app/api/oauth/[provider]/[action]/route.ts");
  assert.match(route, /GITLAB_DUO_OAUTH_SETUP_MESSAGE/);
  assert.match(route, /provider === "gitlab-duo" && !authData\.authUrl/);
  // No inline duplicate of the long recipe — single source of truth.
  assert.doesNotMatch(route, /Register an OAuth application at " \+\s*"https:\/\/gitlab\.com/);
});

test("#8688 OAuthModal skips auto-start and renders GitlabDuoSetupStep (#8688)", () => {
  const modal = read("../../src/shared/components/OAuthModal.tsx");
  assert.match(modal, /GitlabDuoSetupStep/);
  assert.match(modal, /startsInGitlabDuoSetup/);
  assert.match(modal, /setStep\("gitlab-duo-setup"\)/);
  assert.match(modal, /step === "gitlab-duo-setup"/);

  // Auto-start must be skipped when the setup step is active.
  const openEffect = modal.match(
    /\/\/ Reset state and start OAuth when modal opens[\s\S]*?}, \[isOpen, provider, startOAuthFlow\]\);/
  );
  assert.ok(openEffect, "expected the modal-open useEffect");
  assert.match(openEffect![0], /startsInGitlabDuoSetup/);
  assert.match(openEffect![0], /setStep\("gitlab-duo-setup"\)/);
  assert.match(openEffect![0], /return;/);
  assert.match(
    openEffect![0],
    /if \(!startsInPasteMode\) startOAuthFlow\(\)/,
    "other providers still auto-start"
  );

  const setup = read("../../src/shared/components/oauthModal/GitlabDuoSetupStep.tsx");
  assert.match(setup, /GITLAB_DUO_OAUTH_SETUP_MESSAGE/);
  assert.match(setup, /LinkifiedText/);
  assert.match(setup, /Continue/);
});

test("#8688 error Try Again returns gitlab-duo to the setup step", () => {
  const modal = read("../../src/shared/components/OAuthModal.tsx");
  assert.match(modal, /returnToGitlabDuoSetup=\{provider === "gitlab-duo"\}/);
  assert.match(modal, /setStep\("gitlab-duo-setup"\)/);

  const errorStep = read("../../src/shared/components/oauthModal/OAuthErrorStep.tsx");
  assert.match(errorStep, /returnToGitlabDuoSetup/);
  assert.match(errorStep, /onReturnToGitlabDuoSetup/);
  assert.match(
    errorStep,
    /if \(returnToGitlabDuoSetup\)[\s\S]{0,80}?onReturnToGitlabDuoSetup\(\)/
  );
});
