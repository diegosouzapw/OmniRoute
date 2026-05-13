---
description: Read all open GitHub Discussions, summarize them, respond to pending ones, and create issues from actionable feature requests
---

# /review-discussions — GitHub Discussions Review & Response Workflow

## Overview

This workflow reads all open GitHub Discussions, generates a categorized summary, identifies which ones need a response, drafts and posts replies, and optionally creates issues from actionable feature requests. It follows the same flow used for Issues but adapted for the Discussions forum.

// turbo-all

## Steps

### 1. Identify the GitHub Repository

- Run: `git -C <project_root> remote get-url origin` to extract the owner/repo
- Parse the owner and repo name from the URL

### 2. Fetch All Open Discussions

- Use `read_url_content` to fetch `https://github.com/<owner>/<repo>/discussions`
- Parse the discussion list to get all discussion titles, IDs, authors, categories, and dates
- For each discussion, fetch the individual page to read the full content and all comments/replies

### 3. Summarize All Discussions

For each discussion, extract:

- **Title** and **#Number**
- **Author** (GitHub username)
- **Category** (Announcements, General, Ideas, Q&A, Show and tell)
- **Date** created
- **Summary** of the original post (1-2 sentences)
- **Comments count** and key participants
- **Your previous response** (if any)
- **Pending action** — whether a response or follow-up is needed

### 4. Present Summary Report to User

Present the full summary to the user organized by category, using a table:

| #   | Category | Title | Author | Date   | Status            |
| --- | -------- | ----- | ------ | ------ | ----------------- |
| #N  | Ideas    | Title | @user  | Mar 23 | ⚠️ Needs response |
| #N  | Q&A      | Title | @user  | Mar 9  | ✅ Answered       |
| #N  | General  | Title | @user  | Mar 19 | ⚠️ Needs response |

Highlight:

- **⚠️ Needs response** — No reply from maintainer, or a follow-up comment was left unanswered
- **✅ Answered** — Maintainer already responded
- **🐛 Bug reported** — A bug was mentioned that needs tracking
- **💡 Actionable** — Contains a concrete feature request that could become an issue

### 5. Draft & Post Responses

For each discussion that needs a response, draft a reply following these guidelines:

#### Response Style

- **Friendly and professional** — Start with "Hey @username!"
- **Acknowledge the contribution** — Thank the user for their input
- **Be specific** — Reference existing features, settings, or dashboard pages if the feature already exists
- **Provide workarounds** — If the request isn't implemented yet, suggest current alternatives
- **Commit to action** — If the request is valid, state that you'll open an issue or add it to the roadmap
- **Keep it concise** — 3-5 paragraphs max

#### Posting via Browser

- Use `browser_subagent` to navigate to each discussion and post the comment
- **IMPORTANT**: When typing text in GitHub comment boxes via the browser, use only plain ASCII characters:
  - Use regular hyphens `-` instead of em-dashes
  - Use `->` instead of arrow symbols
  - Do NOT use emoji Unicode characters (the browser keyboard may fail on them)
  - Use `**bold**` and `\`code\`` markdown formatting
- Click the green "Comment" button (or "Reply" for threaded replies) after typing
- Verify the comment was posted by checking the page shows the new comment

### 6. Create Issues from Actionable Feature Requests

For discussions that contain concrete, actionable feature requests:

1. Ask the user which ones should become issues
2. For each approved request, create a GitHub issue via `browser_subagent`:
   - Navigate to `https://github.com/<owner>/<repo>/issues/new`
   - **Title**: `<Feature Name> - <Short description>`
   - **Body** should include:
     - `## Feature Request` header
     - `**Source:** Discussion #N by @author`
     - `## Problem` — What limitation the user hit
     - `## Proposed Solution` — How it could work
     - `### Implementation Ideas` — Technical approach
     - `### Current Workarounds` — What users can do today
     - `## Additional Context` — Links to related issues/discussions
   - Add `enhancement` label
   - Click "Submit new issue" / "Create"
3. After creation, go back to the original discussion and post a comment linking to the new issue:
   - "I've opened Issue #N to track this feature request. Follow along there for updates!"

### 7. Final Report

Present a final summary to the user:

| Discussion | Action Taken                       |
| ---------- | ---------------------------------- |
| #N — Title | Responded with workarounds         |
| #N — Title | Responded + created Issue #N       |
| #N — Title | Already answered, no action needed |
| #N — Title | Responded to follow-up comment     |

## Notes

- This workflow is **interactive** — always present the summary and wait for user approval before posting responses or creating issues
- If the user says "pode responder" (or similar approval), proceed with posting all drafted responses
- For discussions in non-English languages, respond in the same language as the original post
- Always reference specific dashboard paths, config options, or code files when explaining existing features
- When a discussion reveals a bug, note it separately from feature requests
