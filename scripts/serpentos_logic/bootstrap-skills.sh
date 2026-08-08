#!/bin/bash
# [MANAGED BY: architect-agent]
# Bootstrap script to link global skills, plugins, and prompts to IDEs and Agents

SOURCE_DIR="/Users/work/serpentos/.agent"

echo "Bootstrapping skills across the ecosystem..."

# 1. Claude Code
echo "Setting up for Claude Code..."
mkdir -p ~/.claude/skills
ln -sf "$SOURCE_DIR/skills/"* ~/.claude/skills/ 2>/dev/null || true

# 2. OpenCode
echo "Setting up for OpenCode..."
mkdir -p ~/.opencode/skills
ln -sf "$SOURCE_DIR/skills/"* ~/.opencode/skills/ 2>/dev/null || true
# Import to Opencode global config if necessary
# doppler run -- opencode plugin install <path> 

# 3. Antigravity (CLI & IDE)
echo "Setting up for Antigravity (CLI and IDE)..."
mkdir -p ~/.gemini/skills
mkdir -p ~/.gemini/plugins
mkdir -p ~/.gemini/prompts
ln -sf "$SOURCE_DIR/skills/"* ~/.gemini/skills/ 2>/dev/null || true
mkdir -p ~/.gemini/antigravity-cli/skills
ln -sf "$SOURCE_DIR/skills/"* ~/.gemini/antigravity-cli/skills/ 2>/dev/null || true
ln -sf "$SOURCE_DIR/plugins/"* ~/.gemini/plugins/ 2>/dev/null || true
ln -sf "$SOURCE_DIR/prompts/"* ~/.gemini/prompts/ 2>/dev/null || true

# 4. Goose
echo "Setting up for Goose..."
mkdir -p ~/.config/goose/skills
mkdir -p ~/.local/share/goose/skills
ln -sf "$SOURCE_DIR/skills/"* ~/.config/goose/skills/ 2>/dev/null || true
ln -sf "$SOURCE_DIR/skills/"* ~/.local/share/goose/skills/ 2>/dev/null || true

# 5. Cursor / Windsurf
echo "Setting up for Cursor and Windsurf IDEs..."
for rules_file in .cursorrules .windsurfrules; do
    if [ -f "/Users/work/serpentos/$rules_file" ]; then
        if ! grep -q "SKILLS_DIR" "/Users/work/serpentos/$rules_file"; then
            echo -e "\n# SKILLS_DIR\nAll global skills and plugins are located in /Users/work/serpentos/.agent/skills. Always check this folder before executing tasks." >> "/Users/work/serpentos/$rules_file"
        fi
    fi
done

echo "✅ Bootstrap complete! All agents now share the same skills."
