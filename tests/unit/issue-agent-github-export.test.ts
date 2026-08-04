import test from "node:test";
import assert from "node:assert/strict";

import { normalizeGitHubIssueExport } from "../../src/lib/issueAgent/githubExport.ts";

test("normalizeGitHubIssueExport reads GitHub REST issue plus comments shape", () => {
  const normalized = normalizeGitHubIssueExport({
    issue: {
      title: "Fix route guard bypass",
      body: "failing when Host is spoofed",
      html_url: "https://github.com/KooshaPari/OmniRoute/issues/6059",
    },
    comments: [
      { user: { login: "renovate[bot]", type: "Bot" }, body: "automated" },
      { user: { login: "maintainer", type: "User" }, body: "please patch" },
    ],
  });

  assert.equal(normalized.issueUrl, "https://github.com/KooshaPari/OmniRoute/issues/6059");
  assert.deepEqual(normalized.recordedContext, {
    title: "Fix route guard bypass",
    body: "failing when Host is spoofed",
    comments: [
      { author: "renovate[bot]", body: "automated", isBot: true },
      { author: "maintainer", body: "please patch", isBot: false },
    ],
  });
});

test("normalizeGitHubIssueExport reads flat issue export shape", () => {
  const normalized = normalizeGitHubIssueExport({
    title: "Question about native router",
    body: "how should cooldowns work?",
    url: "https://github.com/KooshaPari/OmniRoute/pull/6085",
    comments: [{ author: "human", body: "review please", isBot: false }],
  });

  assert.equal(normalized.issueUrl, "https://github.com/KooshaPari/OmniRoute/pull/6085");
  assert.equal(normalized.recordedContext.title, "Question about native router");
  assert.equal(normalized.recordedContext.comments?.[0]?.author, "human");
});

test("normalizeGitHubIssueExport rejects exports without a GitHub URL", () => {
  assert.throws(
    () => normalizeGitHubIssueExport({ title: "missing url" }),
    /Recorded GitHub export must include html_url or url/
  );
});
