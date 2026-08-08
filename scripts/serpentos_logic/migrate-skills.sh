#!/bin/bash

# Define target directories
TARGET_SKILLS="/Users/work/serpentos/.agent/skills"
TARGET_PLUGINS="/Users/work/serpentos/.agent/plugins"
TARGET_PROMPTS="/Users/work/serpentos/.agent/prompts"

mkdir -p "$TARGET_SKILLS" "$TARGET_PLUGINS" "$TARGET_PROMPTS"

echo "Finding and copying skills..."
# Find directories named *skill* and copy .md files inside them to TARGET_SKILLS
find /Users/work/ -maxdepth 4 -type d -iname "*skill*" -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/serpentos/*" 2>/dev/null | while read dir; do
    find "$dir" -maxdepth 2 -type f -name "*.md" 2>/dev/null | while read file; do
        cp -n "$file" "$TARGET_SKILLS/" 2>/dev/null || true
    done
done

echo "Finding and copying plugins..."
find /Users/work/ -maxdepth 4 -type d -iname "*plugin*" -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/serpentos/*" 2>/dev/null | while read dir; do
    find "$dir" -maxdepth 2 -type f \( -name "*.md" -o -name "*.json" \) 2>/dev/null | while read file; do
        cp -n "$file" "$TARGET_PLUGINS/" 2>/dev/null || true
    done
done

echo "Finding and copying prompts..."
find /Users/work/ -maxdepth 4 -type d -iname "*prompt*" -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/serpentos/*" 2>/dev/null | while read dir; do
    find "$dir" -maxdepth 2 -type f \( -name "*.md" -o -name "*.txt" \) 2>/dev/null | while read file; do
        cp -n "$file" "$TARGET_PROMPTS/" 2>/dev/null || true
    done
done

echo "Migration complete!"
