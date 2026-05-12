---
description: Automatically run the browser_subagent to visually validate all new UI features from the current release and capture evidence WebP recordings of the changes.
---

# Capture Release Evidences Workflow

Use this workflow to automatically drive the `browser_subagent` to explore the newly deployed or locally running application and record evidence of the UI changes introduced in the latest release.

## Prerequisites

- OmniRoute must be actively running and accessible (e.g. locally at `http://localhost:20128` or on the Local VPS at `http://192.168.0.15:20128`).
- The user must provide the target URL to be tested, or default to `http://192.168.0.15:20128`.

## Workflow Steps

### 1. Identify Target Features

Review the `CHANGELOG.md` for the latest version to map out the new UI elements. For example:

- **CLI Tools Settings**
- **New Provider/Model Listings (e.g., Gemini 3.1, Qoder PAT)**
- **New Feature Modals**

### 2. Run the Browser Subagent

For each identified feature, invoke the `browser_subagent` using the `default_api:browser_subagent` tool.
**Important Task Guidelines for the Subagent:**

- `TaskName`: Give it a clear name like "Validate CLIProxyAPI Tool Tab".
- `TaskSummary`: "Navigate to the CLI Tools tab and verify the new Integration settings."
- `Task`: Provide unambiguous instructions for the subagent, such as: "Navigate to http://192.168.0.15:20128/dashboard. Click on the 'Settings' or 'CLI Tools' nav link. Scroll down to find the CLIProxyAPI integration card. Hover over it to trigger UI state. Verify the components render correctly and exit."
- `RecordingName`: Ensure it describes the feature (e.g. `v3_4_5_cli_proxy_api`). This is required and strictly automatically saved as a WebP artifacts video by the system.

_(Note: The `browser_subagent` automatically creates a WebP recording named by the `RecordingName` parameter. No additional tools for screenshots are needed.)_

### 3. Generate Report Artifact

After the `browser_subagent` finishes its sessions, generate a final Markdown artifact (using `write_to_file` and `IsArtifact=true`) to present the recordings inline to the user using the `![caption](/absolute/path/to/media.webp)` syntax.

### Example Invocation

\```json
{
"TaskName": "Validating Qoder PAT Configuration UI",
"TaskSummary": "Validates the Qoder provider configuration modal",
"Task": "Go to http://192.168.0.15:20128/dashboard. Click on the 'Providers' tab. Find 'Qoder' in the list. Click 'Add Token' or 'Configure'. Type 'test_token' and submit. Return when done.",
"RecordingName": "qoder_pat_ui_validation"
}
\```
