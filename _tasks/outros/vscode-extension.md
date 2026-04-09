# OmniRoute VS Code Extension

> Intelligent AI orchestration for VS Code

## Features

- **OmniRoute Status** — Sidebar panel showing gateway connection, version, circuit breakers
- **Quota Widget** — Real-time quota usage per provider with % bars
- **Mode Pack Selector** — Quick-pick to switch between Ship Fast / Cost Saver / Quality First / Offline Friendly
- **Budget Guard** — Session cost tracking with status bar indicator and threshold alerts
- **Health Monitor** — Circuit breaker notifications (OPEN/HALF_OPEN/CLOSED transitions)
- **Smart Dispatch** — Pre-dispatch evaluation with task type detection and risk scoring
- **Human Checkpoint** — Confidence-based handoff when fallback/cost/short-response flags appear
- **MCP Client** — Consume all 16 OmniRoute MCP tools from the editor
- **A2A Client** — Discover agents, send tasks, stream SSE responses

## Setup

1. Install the extension (VSIX or Marketplace)
2. OmniRoute auto-detects on `http://localhost:20128`
3. Configure endpoint: `Settings → omniroute.endpoint`

## Settings

| Setting                  | Default                  | Description                |
| :----------------------- | :----------------------- | :------------------------- |
| `omniroute.endpoint`     | `http://localhost:20128` | OmniRoute server URL       |
| `omniroute.modePack`     | `ship-fast`              | Active mode pack           |
| `omniroute.budgetMax`    | `5.0`                    | Session budget limit (USD) |
| `omniroute.budgetAction` | `alert`                  | Action on budget exceeded  |

## Architecture

| File                                     | Purpose                      |
| :--------------------------------------- | :--------------------------- |
| `services/omniroute/apiClient.ts`        | HTTP SDK with retry + cache  |
| `services/omniroute/mcpClient.ts`        | MCP tool wrappers            |
| `services/omniroute/budgetGuard.ts`      | Budget tracking + status bar |
| `services/omniroute/healthMonitor.ts`    | Circuit breaker polling      |
| `services/omniroute/modePackSelector.ts` | Mode pack quick-pick         |
| `services/a2a/a2aClient.ts`              | A2A protocol client          |
| `services/dispatch/policyEngine.ts`      | Smart Dispatch risk eval     |
| `services/dispatch/humanCheckpoint.ts`   | Confidence checkpoint        |
| `services/OmniRouteStatusProvider.ts`    | Sidebar status panel         |
| `services/QuotaWidgetProvider.ts`        | Sidebar quota widget         |
| `services/ComboManager.ts`               | Role → combo mapping         |
