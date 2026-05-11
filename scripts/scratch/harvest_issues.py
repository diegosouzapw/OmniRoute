import json
import os
import subprocess
import re

issues = [1845, 1833, 1826, 1814, 1788, 1786, 1765, 1764, 1737, 1736, 1735, 1731, 1718, 1716, 1679, 1594, 1591, 1590, 1589, 1588, 1587, 1586, 1584, 1529]

os.makedirs('_ideia', exist_ok=True)

def slugify(value):
    value = re.sub(r'\[Feature\]', '', value, flags=re.IGNORECASE)
    value = re.sub(r'[^\w\s-]', '', value).strip().lower()
    return re.sub(r'[-\s]+', '-', value)

for num in issues:
    print(f"Processing #{num}...")
    try:
        res = subprocess.run(
            ['gh', 'issue', 'view', str(num), '--repo', 'diegosouzapw/OmniRoute', '--json', 'number,title,labels,body,comments,createdAt,author,assignees'],
            capture_output=True, text=True, check=True
        )
        data = json.loads(res.stdout)
        
        slug = slugify(data['title'])
        filename = f"_ideia/{data['number']}-{slug}.md"
        
        author = data['author']['login']
        created_at = data['createdAt']
        body = data['body']
        comments = data['comments']
        
        participants = set([author])
        comments_str = ""
        if comments:
            for c in comments:
                c_author = c['author']['login']
                participants.add(c_author)
                comments_str += f"**@{c_author}** ({c['createdAt']}):\n{c['body']}\n---\n"
        else:
            comments_str = "*No comments.*"
            
        participants_list = "\n".join([f"- @{p}" for p in participants])
        
        content = f"""# Feature: {data['title']}

> GitHub Issue: #{data['number']} — opened by @{author} on {created_at}
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

{body}

## 💬 Community Discussion

{comments_str}

### Participants

{participants_list}

### Key Points

- Needs detailed analysis

## 🎯 Refined Feature Description

Feature needs manual refinement and interpretation to fill logical gaps and outline high-level technical scope.

### What it solves

- TBD

### How it should work (high level)

1. TBD
2. TBD

### Affected areas

- TBD

## 📎 Attachments & References

- Check issue body for references

## 🔗 Related Ideas

- None yet
"""
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
            
    except Exception as e:
        print(f"Error processing {num}: {e}")

print("Done.")
