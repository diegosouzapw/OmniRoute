#!/usr/bin/env python3
# scripts/generate_system_instructions.py
# Auto-generates versioned system prompt bundle from modular parts.
# Usage: python3 scripts/generate_system_instructions.py [--bump minor|patch|major]

import os
import sys
import hashlib
import argparse
from pathlib import Path
from datetime import datetime

SYSTEM_DIR = Path("system")
PARTS_DIR  = SYSTEM_DIR / "parts"
OUT_DIR    = SYSTEM_DIR / "versions"
VERSION_FILE = SYSTEM_DIR / "VERSION"
CURRENT_FILE = SYSTEM_DIR / "CURRENT_SYSTEM_PROMPT.md"
CHANGELOG    = SYSTEM_DIR / "CHANGELOG.md"

PART_ORDER = [
    "00_role.md",
    "01_context.md",
    "02_video_pipeline.md",
    "03_routing.md",
    "04_memory.md",
    "05_constraints.md",
    "06_output_format.md",
    "07_agents_registry.md",
    "08_token_saver.md",
    "09_nvidia_alibaba.md",
]

def read_version() -> tuple[int, int, int]:
    if VERSION_FILE.exists():
        v = VERSION_FILE.read_text().strip().lstrip("v")
        parts = v.split(".")
        return int(parts[0]), int(parts[1]), int(parts[2])
    return 1, 0, 0

def bump_version(current: tuple, bump: str) -> tuple:
    ma, mi, pa = current
    if bump == "major": return (ma+1, 0, 0)
    if bump == "minor": return (ma, mi+1, 0)
    return (ma, mi, pa+1)

def assemble_prompt() -> str:
    parts = []
    for part_name in PART_ORDER:
        part_path = PARTS_DIR / part_name
        if part_path.exists():
            content = part_path.read_text().strip()
            parts.append(f"<!-- PART: {part_name} -->\n{content}")
        else:
            print(f"⚠️  Missing part: {part_name} — skipping")
    return "\n\n---\n\n".join(parts)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--bump", choices=["major", "minor", "patch"],
                        default="patch", help="Version bump type")
    parser.add_argument("--dry-run", action="store_true",
                        help="Print output without writing files")
    args = parser.parse_args()

    for d in [PARTS_DIR, OUT_DIR]:
        d.mkdir(parents=True, exist_ok=True)

    prompt = assemble_prompt()
    if not prompt.strip():
        print("❌ No parts found in system/parts/. Create .md files there first.")
        sys.exit(1)

    content_hash = hashlib.md5(prompt.encode()).hexdigest()[:8]

    current_ver  = read_version()
    new_ver      = bump_version(current_ver, args.bump)
    version_str  = f"{new_ver[0]}.{new_ver[1]}.{new_ver[2]}"
    timestamp    = datetime.now().strftime("%Y-%m-%d %H:%M")

    header = f"""---
version: {version_str}
generated: {timestamp}
hash: {content_hash}
bump: {args.bump}
---

"""
    final = header + prompt

    if args.dry_run:
        print(final)
        print(f"\n[dry-run] Would write version {version_str} (hash: {content_hash})")
        return

    CURRENT_FILE.write_text(final)

    versioned_path = OUT_DIR / f"system_prompt_v{version_str}_{content_hash}.md"
    versioned_path.write_text(final)

    VERSION_FILE.write_text(version_str + "\n")

    changelog_entry = (
        f"\n## v{version_str} — {timestamp}\n"
        f"- Bump: {args.bump}\n"
        f"- Hash: {content_hash}\n"
        f"- Parts: {', '.join([p for p in PART_ORDER if (PARTS_DIR / p).exists()])}\n"
    )
    with open(CHANGELOG, "a") as f:
        f.write(changelog_entry)

    print(f"✅ System prompt v{version_str} generated → {CURRENT_FILE}")
    print(f"📦 Archived → {versioned_path}")
    print(f"📝 Changelog updated → {CHANGELOG}")

if __name__ == "__main__":
    main()
