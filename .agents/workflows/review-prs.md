---
description: Analyze open Pull Requests from the project's GitHub repository, generate a critical report, and optionally implement approved changes
---

# /review-prs — PR Review & Analysis Workflow

## Overview

This workflow fetches all open PRs from the project's GitHub repository, performs a critical analysis of each one, generates a detailed report, and waits for user approval before proceeding with implementation.

## Steps

### 1. Identify the GitHub Repository

- Read `package.json` to get the repository URL, or use the git remote origin URL
  // turbo
- Run: `git -C <project_root> remote get-url origin` to extract the owner/repo

### 2. Fetch Open Pull Requests

- Navigate to `https://github.com/<owner>/<repo>/pulls` and scrape all open PRs
- For each open PR, collect:
  - PR number, title, author, branch, number of commits, date
  - PR description/body
  - Files changed (diff)
  - Existing review comments (from bots or humans)

### 3. Analyze Each PR — For each open PR, perform the following analysis:

#### 3a. Feature Assessment

- **Does it make sense?** Evaluate if the feature fills a real gap or solves a valid problem
- **Alignment** — Check if it aligns with the project's architecture and roadmap
- **Complexity** — Assess if the scope is reasonable or if it should be split

#### 3b. Code Quality Review

- Check for code duplication
- Evaluate error handling patterns (consistent with existing codebase?)
- Check naming conventions and code style
- Verify TypeScript types (any `any` usage, missing types?)

#### 3c. Security Review

- Check for missing authentication/authorization on new endpoints
- Check for injection vulnerabilities (URL params, SQL, XSS)
- Verify input validation on all user-controlled data
- Check for hardcoded secrets or credentials

#### 3d. Architecture Review

- Does the change follow existing patterns?
- Are there any breaking changes to public APIs?
- Is the database schema affected? Migration needed?
- Impact on performance (N+1 queries, missing indexes?)

#### 3e. Test Coverage

- Does the PR include tests?
- Are edge cases covered?
- Would existing tests break?

### 4. Generate Report — Create a markdown report for each PR including:

- **PR Summary** — What it does, files affected, commit count
- **Improvements/Benefits** — Numbered list with impact level (HIGH/MEDIUM/LOW)
- **Risks & Issues** — Categorized as CRITICAL / IMPORTANT / MINOR
- **Scoring Table** — Rate across: Feature Relevance, Code Quality, Security, Robustness, Tests
- **Verdict** — Ready to merge? With mandatory vs optional fixes
- **Next Steps** — What will happen if approved

### 5. Present to User

- Show the report via `notify_user` with `BlockedOnUser: true`
- Wait for user decision:
  - **Approved** → Proceed to step 6
  - **Approved with changes** → Implement the fixes and corrections before merging
  - **Rejected** → Close the PR or leave a review comment

### 6. Implementation (if approved)

- Checkout the PR branch or apply changes locally
- Implement any required fixes identified in the analysis
- Run the project's test suite to verify nothing breaks
  // turbo
- Run: `npm test` or equivalent test command
- Build the project to verify compilation
  // turbo
- Run: `npm run build` or equivalent build command
- If all checks pass, prepare the merge

### 7. Post-Merge (if applicable)

- Update CHANGELOG.md with the new feature
- Consider version bump if warranted
- Follow the `/generate-release` workflow if a release is needed
