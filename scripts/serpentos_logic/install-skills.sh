#!/bin/bash
# =============================================================================
# SerpentOS Global Skills Installer
# =============================================================================
# Usage: ./install-skills.sh
# Installs skill-packager and mcp-integrator to both AGY and Claude Code
# =============================================================================

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "=== SerpentOS Global Skills Installer ==="

# --- AGY (Antigravity) ---
echo "Installing AGY skills..."
mkdir -p ~/.gemini/config/skills
mkdir -p ~/.gemini/antigravity/skills
mkdir -p ~/.gemini/antigravity/workflows

for skill in skill-packager mcp-integrator davinci-resolve-automation veo-gemini-video-pipeline veo-showreel-assembler; do
    if [[ -d "${REPO_ROOT}/.agents/skills/${skill}" ]]; then
        mkdir -p ~/.gemini/config/skills/${skill}
        mkdir -p ~/.gemini/antigravity/skills/${skill}
        # Resolve symlink to actual file if it's a symlink
        cp -L "${REPO_ROOT}/.agents/skills/${skill}/SKILL.md" ~/.gemini/config/skills/${skill}/
        cp -L "${REPO_ROOT}/.agents/skills/${skill}/SKILL.md" ~/.gemini/antigravity/skills/${skill}/
        echo "  ✓ ${skill} → ~/.gemini/config/skills/${skill}"
        echo "  ✓ ${skill} → ~/.gemini/antigravity/skills/${skill}"
    fi
done

# Register slash commands
if [[ -f "${REPO_ROOT}/.agents/skills/skill-packager/SKILL.md" ]]; then
    cat > ~/.gemini/antigravity/workflows/skill-packager.md << 'EOF'
---
description: Package current solution as reusable skill
---
1. Load skill: skill-packager
2. Analyze completed task
3. Generate SKILL.md
4. Write to global config
EOF
    echo "  ✓ /skill-packager workflow registered"

    cat > ~/.gemini/antigravity/workflows/global-skill.md << 'EOF'
---
description: Save current solution as global reusable skill
---
1. Load skill: skill-packager
2. Analyze completed task
3. Generate SKILL.md with global scope
4. Write to ~/.gemini/config/skills/
5. Update GEMINI.md registry
EOF
    echo "  ✓ /global-skill workflow registered"
fi

# Update GEMINI.md
if [[ -f ~/.gemini/GEMINI.md ]]; then
    if ! grep -q "skill-packager" ~/.gemini/GEMINI.md 2>/dev/null; then
        echo "" >> ~/.gemini/GEMINI.md
        echo "## Global Skills Registry" >> ~/.gemini/GEMINI.md
        echo "" >> ~/.gemini/GEMINI.md
        echo "- \`skill-packager\` — Auto-package solutions into reusable skills" >> ~/.gemini/GEMINI.md
        echo "- \`mcp-integrator\` — MCP server packaging and registration" >> ~/.gemini/GEMINI.md
        echo "- \`davinci-resolve-automation\` — Scripting and timeline control" >> ~/.gemini/GEMINI.md
        echo "- \`veo-gemini-video-pipeline\` — End-to-end video generator" >> ~/.gemini/GEMINI.md
        echo "  ✓ GEMINI.md updated"
    fi
else
    echo "  ⚠ ~/.gemini/GEMINI.md not found, create it manually"
fi

# --- Claude Code ---
echo "Installing Claude Code skills..."
mkdir -p ~/.claude/skills

for skill in skill-packager mcp-integrator davinci-resolve-automation veo-gemini-video-pipeline veo-showreel-assembler; do
    if [[ -d "${REPO_ROOT}/.claude/skills/${skill}" ]]; then
        mkdir -p ~/.claude/skills/${skill}
        cp -L "${REPO_ROOT}/.claude/skills/${skill}/SKILL.md" ~/.claude/skills/${skill}/
        echo "  ✓ ${skill} → ~/.claude/skills/${skill}"
    fi
done

# Update Claude README
if [[ -f ~/.claude/skills/README.md ]]; then
    if ! grep -q "skill-packager" ~/.claude/skills/README.md 2>/dev/null; then
        echo "" >> ~/.claude/skills/README.md
        echo "* [Skill Packager](skill-packager/SKILL.md) — Auto-package solutions into reusable skills" >> ~/.claude/skills/README.md
        echo "* [MCP Integrator](mcp-integrator/SKILL.md) — MCP server packaging and registration" >> ~/.claude/skills/README.md
        echo "  ✓ Claude README.md updated"
    fi
else
    echo "  ⚠ ~/.claude/skills/README.md not found, create it manually"
fi

echo ""
echo "=== Installation Complete ==="
echo "Restart your IDE / CLI for skills to load."
echo ""
echo "New commands available:"
echo "  AGY:    /skill-packager, /global-skill"
echo "  Claude: 'package this as skill', 'make this reusable'"
