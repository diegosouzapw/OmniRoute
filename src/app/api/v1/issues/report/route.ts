import { NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const reportSchema = z.object({
  title: z.string().min(1).max(300),
  provider: z.string().max(80).optional(),
  accountId: z.string().max(120).optional(),
  requestId: z.string().max(200).optional(),
  errorCode: z.string().max(100).optional(),
  details: z.record(z.string(), z.unknown()).optional(),
  labels: z.array(z.string().max(50)).optional(),
});

/**
 * POST /api/v1/issues/report
 *
 * Optionally report a quota-exceeded or key-issuance failure event to GitHub.
 *
 * Requires GITHUB_ISSUES_REPO (format: owner/repo) and GITHUB_ISSUES_TOKEN
 * environment variables to be set. If not configured, returns 202 (accepted but
 * logged only).
 */
export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: { message: "Authentication required" } }, { status: 401 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(reportSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const {
    title,
    provider,
    accountId,
    requestId,
    errorCode,
    details,
    labels = [],
  } = validation.data;

  const repo = process.env.GITHUB_ISSUES_REPO;
  const token = process.env.GITHUB_ISSUES_TOKEN;

  // ── Structured body for the GitHub issue ──
  const issueBody = [
    `## ${errorCode ?? "Key Issuance Event"}`,
    "",
    "| Field | Value |",
    "|-------|-------|",
    provider ? `| Provider | \`${provider}\` |` : null,
    accountId ? `| Account ID | \`${accountId}\` |` : null,
    requestId ? `| Request ID | \`${requestId}\` |` : null,
    errorCode ? `| Error Code | \`${errorCode}\` |` : null,
    `| Reported At | ${new Date().toISOString()} |`,
    "",
    details ? "### Details\n```json\n" + JSON.stringify(details, null, 2) + "\n```" : null,
    "",
    "_Auto-reported by OmniRoute Registered Key Issuer_",
  ]
    .filter(Boolean)
    .join("\n");

  // ── Log locally regardless ──
  console.log(
    `[issues/report] title="${title}" errorCode=${errorCode ?? "—"} provider=${provider ?? "—"} accountId=${accountId ?? "—"}`
  );

  if (!repo || !token) {
    // No GitHub config — log only
    return NextResponse.json(
      {
        logged: true,
        githubIssueCreated: false,
        reason: !repo ? "GITHUB_ISSUES_REPO not configured" : "GITHUB_ISSUES_TOKEN not configured",
      },
      { status: 202 }
    );
  }

  // ── Create GitHub issue ──
  try {
    const [owner, repoName] = repo.split("/");
    const ghRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}/issues`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `[Key Issuer] ${title}`,
        body: issueBody,
        labels: ["key-issuer", "automated", ...labels],
      }),
    });

    if (!ghRes.ok) {
      const errText = await ghRes.text();
      console.error(`[issues/report] GitHub API error ${ghRes.status}: ${errText}`);
      return NextResponse.json(
        { logged: true, githubIssueCreated: false, githubError: ghRes.status },
        { status: 207 }
      );
    }

    const ghData = await ghRes.json();
    return NextResponse.json({
      logged: true,
      githubIssueCreated: true,
      githubIssueUrl: ghData.html_url,
      githubIssueNumber: ghData.number,
    });
  } catch (err) {
    console.error("[issues/report] GitHub fetch failed:", err);
    return NextResponse.json(
      { logged: true, githubIssueCreated: false, error: "GitHub request failed" },
      { status: 207 }
    );
  }
}
