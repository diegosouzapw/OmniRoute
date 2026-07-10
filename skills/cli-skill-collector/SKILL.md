---
name: cli-skill-collector
description: "Agent workflow: detect installed CLI coding tools (Claude Code, Codex, Cursor, Copilot, Cline, Hermes, OpenCode, etc.), search GitHub for matching agent skills, and install them to the detected tools. Replaces the standalone Skill Collector Python app."
---

# /cli-skill-collector — Agent Skill Collector

Discover and install agent skills for your coding CLI tools — all through OmniRoute's built-in APIs.

This skill teaches you how to:

1. **Detect** which coding CLIs are installed on this machine
2. **Search** GitHub for relevant agent skills (SKILL.md repos)
3. **Install** discovered skills to the detected coding tools

No separate Skill Collector app needed — OmniRoute's own CLI detection + GitHub search handles everything.

---

## Step 1 — Detect installed coding tools

Query OmniRoute's CLI tool detection to find which coding agents are installed:

```bash
curl -H "Authorization: Bearer $OMNIROUTE_API_KEY" http://localhost:20128/api/skills/collect/detect
```

This returns:

- Every CLI tool in OmniRoute's catalog (`CLI_TOOL_IDS`: claude, codex, cursor, copilot, opencode, cline, kilocode, hermes, hermes-agent, openclaw, droid, continue, qwen, windsurf, devin, antigravity, etc.)
- Whether each is **installed** and **runnable**
- GitHub skills **matched** to your installed tools (scored by relevance)

Example response:

```json
{
  "tools": {
    "codex": { "installed": true, "runnable": true, "command": "codex" },
    "claude": { "installed": true, "runnable": true, "command": "claude" },
    "cursor": { "installed": false, "runnable": false }
  },
  "installedToolIds": ["codex", "claude"],
  "matchedSkills": [
    { "toolId": "codex", "repo": "user/skill-codex-xxx", "score": 0.85, "stars": 120 },
    { "toolId": "claude", "repo": "user/claude-agent-rules", "score": 0.92, "stars": 340 }
  ],
  "totalSkills": 85
}
```

---

## Step 2 — Review matched skills

For each installed tool, the API returns relevant GitHub repos that contain SKILL.md or agent configuration files. Use the `score` field to prioritize:

| Score | Recommendation                                  |
| ----- | ----------------------------------------------- |
| 0.80+ | Excellent — well-maintained, high stars, active |
| 0.60+ | Good — relevant with decent quality             |
| 0.40+ | Fair — may need review                          |
| <0.40 | Low quality — skip                              |

You can also browse manually:

```bash
curl -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  "http://localhost:20128/api/github-skills?minStars=3&maxResults=50"
```

---

## Step 3 — Install skills to detected tools

Install a chosen skill to one or more detected tools:

```bash
curl -X POST http://localhost:20128/api/skills/collect/install \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "repoName": "user/skill-codex-xxx",
    "targets": ["codex", "claude"],
    "description": "Agent skill for coding workflows"
  }'
```

This plans the installation path for each target tool:

- **claude** → `~/.claude/skills/{category}/`
- **codex** → `~/.codex/skills/{category}/`
- **hermes** → `~/AppData/Local/hermes/skills/{category}/`
- **opencode** → `~/.opencode/skills/{category}/`
- **gemini** → `~/.gemini/skills/{category}/`

The actual file sync (cloning from GitHub and copying SKILL.md) is done by the agent using standard `curl` + `cp` commands.

---

## Step 4 — Verify installation

After installing, verify the skill is in place:

```bash
# For Codex
ls -la ~/.codex/skills/imported-github/*/SKILL.md

# For Claude Code
ls -la ~/.claude/skills/imported-github/*/SKILL.md

# For Hermes (Windows)
ls -la ~/AppData/Local/hermes/skills/imported-github/*/SKILL.md
```

Also re-check detection:

```bash
curl -H "Authorization: Bearer $OMNIROUTE_API_KEY" http://localhost:20128/api/skills/collect/detect
```

---

## Quick start (full workflow)

```bash
AUTH_HEADER="Authorization: Bearer $OMNIROUTE_API_KEY"

# 1. Detect
DETECT=$(curl -s -H "$AUTH_HEADER" http://localhost:20128/api/skills/collect/detect)

# 2. Pick top matched skill for first installed tool
TOOL=$(echo "$DETECT" | python3 -c "import sys,json;d=json.load(sys.stdin);print(d['installedToolIds'][0] if d['installedToolIds'] else '')")
SKILL=$(echo "$DETECT" | python3 -c "import sys,json;d=json.load(sys.stdin);ms=d.get('matchedSkills',[]);print(ms[0]['repo'] if ms else '')")

if [ -n "$TOOL" ] && [ -n "$SKILL" ]; then
  # 3. Install
  curl -s -X POST http://localhost:20128/api/skills/collect/install \
    -H "$AUTH_HEADER" \
    -H "Content-Type: application/json" \
    -d "{\"repoName\": \"$SKILL\", \"targets\": [\"$TOOL\"]}"
  echo "Installed $SKILL to $TOOL"
fi
```

---

## Notes

- OmniRoute must be running locally on port 20128 (default) — see `docs/frameworks/SKILLS.md` for custom-port setups.
- The `/api/skills/collect/*` and `/api/github-skills` endpoints require **management-scoped authentication** the same way every other `/api/skills/*` route does: a dashboard session, the loopback CLI token, or an API key with the `manage` scope (`requireManagementAuth()`). Auth is only bypassed when the server has no login/API-key requirement configured at all.
- This replaces the standalone Skill Collector Python app — all logic is now inside OmniRoute.
