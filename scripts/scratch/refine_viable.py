import os

viable_data = {
    1718: {
        "title": "expose upstream error details in client-facing error responses",
        "solves": "Debugging upstream errors is difficult because they are hidden behind generic '[400] Error from provider' wrappers.",
        "how": "1. Modify `buildErrorBody` to accept `upstream_details`.\n2. In `BaseExecutor` or specific handlers, parse the raw upstream response on failure.\n3. Propagate the parsed body to the client response inside `upstream_details`.",
        "areas": "open-sse/executors/base.ts, open-sse/utils/errors.ts, src/app/api/v1/chat/completions/route.ts",
        "req_summary": "Expose the upstream error body (e.g. context_length_exceeded) directly in the error response under an `upstream_details` key, without breaking OpenAI compatibility.",
        "req_approach": "Modify the central error generation functions (like `buildErrorBody`) to optionally accept an `upstreamDetails` object. Update the request executors to pass the JSON parsed error from the upstream response into this new parameter when a request fails.",
        "req_files": "| File | Changes |\n|---|---|\n| `open-sse/utils/errors.ts` | Update `buildErrorBody` to include `upstream_details`. |\n| `open-sse/executors/base.ts` | Extract response body on failure and pass to error builder. |",
        "req_effort": "Low. A few files changed. No breaking changes."
    },
    1731: {
        "title": "(combo): provider-level exhaustion tracking to skip same-provider targets",
        "solves": "Combo routing wastes significant time retrying multiple targets from the same provider when the entire provider is rate-limited or quota-exhausted.",
        "how": "1. Track 429 quota exhaustion errors at the provider level.\n2. In `combo.ts`, before attempting a target, check if its provider is currently marked as exhausted.\n3. If exhausted, skip the target and move to the next provider.",
        "areas": "open-sse/services/combo.ts, open-sse/services/accountFallback.ts",
        "req_summary": "Implement provider-level 429 exhaustion tracking in the combo router so it skips remaining targets of a provider if a 429 quota exhaustion occurs.",
        "req_approach": "Add a temporary exclusion set in `handleComboChat` that tracks providers that have returned a hard 429. Before evaluating the next target in the combo, check if its provider is in the exclusion set and skip it if true.",
        "req_files": "| File | Changes |\n|---|---|\n| `open-sse/services/combo.ts` | Add logic to track provider failures and skip matching targets. |\n| `open-sse/services/accountFallback.ts` | Properly bubble up the 429 status. |",
        "req_effort": "Medium. Needs careful state tracking across the combo loop. No breaking changes."
    },
    1764: {
        "title": "Make installation script detect termux",
        "solves": "OmniRoute fails to start or install properly on Termux because `wreq-js` attempts to load a native `libgcc` arm64 module which is incompatible.",
        "how": "1. Update the `postinstall` script to check `process.env.PREFIX` for termux.\n2. If termux is detected, gracefully skip or patch the wreq-js installation/loading.",
        "areas": "scripts/postinstall.mjs, open-sse/executors/wreq.ts",
        "req_summary": "Detect termux environments during installation or runtime and gracefully handle the `wreq-js` native module failure, allowing the rest of OmniRoute to function.",
        "req_approach": "Modify `scripts/postinstall.mjs` or the wreq-js loader logic. If `process.env.PREFIX && process.env.PREFIX.includes('termux')` is true, avoid hard crashing on wreq-js load failures.",
        "req_files": "| File | Changes |\n|---|---|\n| `scripts/postinstall.mjs` | Add termux detection and warning. |\n| `open-sse/utils/env.ts` (or similar) | Graceful downgrade. |",
        "req_effort": "Low. Very localized fix."
    }
}

for root, _, files in os.walk("_ideia/viable"):
    for f in files:
        if not f.endswith(".md") or "requirements" in f: continue
        num = int(f.split('-')[0])
        if num in viable_data:
            path = os.path.join(root, f)
            with open(path, 'r') as file:
                content = file.read()
            
            d = viable_data[num]
            
            # replace TBDs
            content = content.replace("### What it solves\n\n- TBD", f"### What it solves\n\n- {d['solves']}")
            content = content.replace("### How it should work (high level)\n\n1. TBD\n2. TBD", f"### How it should work (high level)\n\n{d['how']}")
            content = content.replace("### Affected areas\n\n- TBD", f"### Affected areas\n\n- {d['areas']}")
            content = content.replace("Feature needs manual refinement and interpretation to fill logical gaps and outline high-level technical scope.", "Refined and scoped for implementation.")
            
            with open(path, 'w') as file:
                file.write(content)
            
            req_content = f"""# Requirements: {d['title']}

> Feature Idea: [#{num}](./{f})
> Research Date: 2026-05-01
> Verdict: ✅ VIABLE

## 🔍 Research Summary

{d['req_summary']}

## 📚 Reference Implementations

| #   | Repository       | Stars | Last Updated | Approach | Relevance    |
| --- | ---------------- | ----- | ------------ | -------- | ------------ |
| 1   | OmniRoute Source | -     | 2026-05-01   | Internal | High         |

## 📐 Proposed Solution Architecture

### Approach

{d['req_approach']}

### Modified Files

{d['req_files']}

## ⚙️ Implementation Effort

- **Estimated complexity**: {d['req_effort']}
- **Breaking changes**: No
"""
            req_path = os.path.join(root, f.replace(".md", ".requirements.md"))
            with open(req_path, 'w') as req_file:
                req_file.write(req_content)
                
            print(f"Refined {num} and created requirements.")
