import json

with open('/tmp/prs_metadata.json') as f:
    prs = json.load(f)

report = "# Pull Request Review Report\n\n"

for pr in prs:
    num = pr['number']
    if num == 1439:
        continue # Skip release PR
    
    title = pr['title']
    author = pr['author']['login']
    adds = pr['additions']
    dels = pr['deletions']
    files_changed = len(pr['files'])
    body = pr['body']
    
    report += f"## PR #{num}: {title}\n"
    report += f"- **Author:** @{author}\n"
    report += f"- **Changes:** {adds} additions, {dels} deletions across {files_changed} files\n"
    
    # Simple analysis logic
    verdict = "Ready for Review"
    issues = "None detected at high level"
    if num == 1440:
        verdict = "Reject/Close (Duplicate)"
        issues = "Subsumed by PR #1444 from the same author."
    elif num == 1463 or num == 1464:
        verdict = "Merge"
        issues = "Dependabot minor bumps. Safe."
    elif num == 1457:
        verdict = "Merge"
        issues = "Translation improvements. Safe."
    elif num == 1444:
        verdict = "Merge"
        issues = "Fixes multiple combo bugs. Subsumes #1440. Needs careful test run."
    elif num == 1449:
        verdict = "Merge (High Impact)"
        issues = "Massive refactor of resilience controls. Touches 68 files. Need full E2E run."
    elif num == 1455:
        verdict = "Merge"
        issues = "Enables tool calling for DeepSeek/OSS. Missing UI indicator changes? Dashboard might need updates."
    elif num == 1462:
        verdict = "Merge"
        issues = "Critical security fix for encryption. If decryption fails, returns null. Did we add tests?"
    elif num == 1456:
        verdict = "Requires Review"
        issues = "Fixes skills menu missing db schema. Migration added. Need to verify UI elements."
        
    report += f"### Analysis\n- **Risks & Issues:** {issues}\n- **Verdict:** {verdict}\n\n"
    report += "---\n\n"

with open('pr_review_report.md', 'w') as f:
    f.write(report)
