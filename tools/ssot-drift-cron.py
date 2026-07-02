#!/usr/bin/env python3
"""Weekly SSOT drift scan: compare AGENTS.md vs docs/adr/ for staleness."""
import json, sys
from pathlib import Path
root = Path(__file__).resolve().parent.parent
issues = []
# Check each ADR in docs/adr/ is referenced in AGENTS.md
adr_dir = root / "docs/adr"
agents = (root / "AGENTS.md").read_text()
for adr_file in sorted(adr_dir.rglob("ADR-*.md")):
    adr_num = adr_file.stem.split("-")[1]
    if adr_num not in agents:
        issues.append({"adr": adr_file.name, "issue": "not referenced in AGENTS.md"})
print(json.dumps(issues, indent=2))
sys.exit(len(issues))
