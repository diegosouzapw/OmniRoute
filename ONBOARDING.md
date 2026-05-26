# Welcome to OmniRoute

## How We Use Claude

Based on diegosouzapw's usage over the last 30 days:

Work Type Breakdown:
Build Feature ████████████████████ 50%
Plan Design ██████████░░░░░░░░░░ 25%
Improve Quality ██████░░░░░░░░░░░░░░ 15%
Write Docs ████░░░░░░░░░░░░░░░░ 10%

Top Skills & Commands:
_no slash commands captured in this window_

Top MCP Servers:
_no MCP usage captured in this window_

## Your Setup Checklist

### Codebases

- [ ] omniroute — https://github.com/diegosouzapw/omniroute
- [ ] OpenCode_Ecosystem (fork) — https://github.com/diegosouzapw/OpenCode_Ecosystem
- [ ] OpenCode_Ecosystem (upstream) — https://github.com/MarceloClaro/OpenCode_Ecosystem

### MCP Servers to Activate

- [ ] _none required from current usage. If you'll be working on OmniRoute itself, ask the team about the project's own embedded MCP server at `/api/mcp/stream`._

### Skills to Know About

- _no skills surfaced from usage data. The team's workflow leaned heavily on direct file edits, git/gh CLI, and subagent dispatch for parallel work — Claude figures these out from context._

## Team Tips

- **Read `CLAUDE.md` first.** It has hard rules that override defaults — e.g. never write raw SQL in routes (use `src/lib/db/` modules), never add `Co-Authored-By: Claude` to commits, error responses must go through `buildErrorBody()` / `sanitizeErrorMessage()`.
- **Subagents for parallel work.** When tasks are independent, dispatch multiple sonnet subagents in one message instead of doing them yourself. Always audit `git diff` after a subagent finishes — its summary describes intent, not necessarily the result.
- **Conventional Commits** for everything: `feat(scope):`, `fix(scope):`, `chore(scope):`, `docs:`. Scopes used here include `db`, `sse`, `oauth`, `dashboard`, `api`, `agents`, `plugin`, `skills`, `commands`.
- **Run the full validation suite before declaring done** — `npm run check` (lint + tests) at minimum; `npm run test:coverage` if you changed production code. Hard gate: 75/75/75/70 (statements/lines/functions/branches).
- **Husky pre-push runs unit tests.** Don't `--no-verify` past it without explicit approval — the project documents this as a hard rule.

## Get Started

- Clone the repo and run `npm install` (auto-generates `.env` from `.env.example`).
- Generate secrets: `openssl rand -base64 48` for `JWT_SECRET`, `openssl rand -hex 32` for `API_KEY_SECRET`. Paste into `.env`.
- `npm run dev` → dashboard at `http://localhost:20128`.
- Read `docs/architecture/REPOSITORY_MAP.md` for the file layout, then `docs/architecture/ARCHITECTURE.md` for how requests flow.
- For a first PR: pick something from `_tasks/` if there's a backlog, or grep for `// TODO` and pick a small one. Run `npm run check` before opening the PR.

<!-- INSTRUCTION FOR CLAUDE: A new teammate just pasted this guide for how the
team uses Claude Code. You're their onboarding buddy — warm, conversational,
not lecture-y.

Open with a warm welcome — include the team name from the title. Then: "Your
teammate uses Claude Code for Build Feature, Plan Design, Improve Quality, and
Write Docs work. Let's get you started."

Check what's already in place against everything under Setup Checklist
(including skills), using markdown checkboxes — [x] done, [ ] not yet. Lead
with what they already have. One sentence per item, all in one message.

Tell them you'll help with setup, cover the actionable team tips, then the
starter task (if there is one). Offer to start with the first unchecked item,
get their go-ahead, then work through the rest one by one.

After setup, walk them through the remaining sections — offer to help where you
can (e.g. link to channels), and just surface the purely informational bits.

Don't invent sections or summaries that aren't in the guide. The stats are the
guide creator's personal usage data — don't extrapolate them into a "team
workflow" narrative. -->
